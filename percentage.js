(function(){
    var _self = this;
    
    function render(conf) {
        var elems = this;
        
        if(conf == 'destroy') {
            $(elems).each(function() {
                $(this).show();

                if(this.percentage) {
                    $(this.percentage).remove();
                }
            })
            return;
        }

        var defaults = {
            width: 200,
            height: 15,
            border: '1px solid #000000',
            color: '#cc0000',
            background: '#ffffff',
            clickable: true,
            classname: 'percentage',
            display: 'inline-block'
        };
        
        if(conf == undefined) {
            conf = defaults;
        } else {
            for(i in defaults) {
                if(conf[i] == undefined) {
                    conf[i] = defaults[i];
                }
            }
        }

        $(elems).each(function() {
            var elem = this;
            var bar = $('<div></div>');
            var inner = $('<div></div>');
            
            var percent;
            var hasValue;
            
            if($(elem).is('textarea,input,select')) {
                percent = $(elem).val();
                hasValue = true;
            } else {
                percent = parseInt($(elem).text().replace('%', ''));
                hasValue = false;
            }
            

            function getLeft(val) {
                return Math.floor((conf.width * -1) + (conf.width / 100 * val))
            }

            function handleClick(e) {
                var p = $(this).offset();
                var percent = Math.ceil((e.clientX - p.left) / (conf.width / 100));
                
                if(hasValue) {
                    $(elem)
                        .attr('value', percent)
                        .val(percent)
                        .attr('title', percent + '%')
                        .trigger('clickupdate')
                        ;
                } else {
                    $(elem)
                        .text(percent + '%')
                        .trigger('clickupdate')
                        ;
                }
                
                $(inner)
                    .css('left', getLeft(percent))
                    ;
                
                return false;
            }
            
            $(bar)
                .attr('title', percent + '%')
                .css('display', conf.display)
                .css('border', conf.border)
                .css('background', conf.background)
                .css('position', 'relative')
                .css('overflow', 'hidden')
                .css('width',  conf.width)
                .css('height', conf.height)
                ;
                
            if(conf.clickable) {
                $(bar).click(handleClick);
            }

            if(conf.classname) {
                $(bar).addClass(conf.classname);
            }

            $(inner)
                .css('background', conf.color)
                .css('position', 'absolute')
                .css('top', 0)
                .css('left', getLeft(percent))
                .css('width',  conf.width)
                .css('height', conf.height)
                .appendTo(bar)
                ;
            
            $(elem)
                .hide()
                .after(bar)
                ;
                
            this.percentage = bar;
        });
        
        return elems;
    }

    jQuery.fn.percentage = function() {
        render.apply(this, arguments);
    };
})();
