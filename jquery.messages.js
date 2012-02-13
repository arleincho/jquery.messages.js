

;(function($){
    
    $.fn.messeges = function(options) {
        var defaults = {
            type: 'error',
            position: 'lt',
            text: '',
            remove: false,
            x: 0,
            y: 0,
            addx: 0,
            addx: 0,
            delay: 5000
        };
        
        var functions = {
            _location: function(opts, input){
                _height = $(input).height();
                _width = $(input).width();
                x = $(input).offset().left;
                y = $(input).offset().top;
                _style = 'msj_' + opts.type;
                _close = $('<div class="close" rel="msj">x</div>');
                style_options = {};
                if(opts.type == 'success'){
                    x = 15;
                    style_options.bottom = 25;
                    style_options.left = 15;
                    if($('#content-msj-info').length == 0){
                        $('<div></div>').attr('id', 'content-msj-info').prependTo('body');
                    }
                    contenedor = '#content-msj-info';
                    
                    $(contenedor).
                        prepend(
                            $('<div error="' + ($(input).attr('id') || $(input).attr('name')) + '"></div>').
                            html(opts.text).
                            prepend(_close).
                            addClass(_style).
                            css(style_options).
                            slideDown('slow').
                            delay(opts.delay).
                            slideUp('slow')
                        );
                }else{
                    x += (opts.addx)?opts.addx:0;
                    y += (opts.addy)?opts.addy:0;
                    switch(opts.position){
                        case 'lt':
                            y -= (_height - 20);
                            x += 10;
                        break;
                        case 'lb':
                            y += (_height - 10);
                            x += 10;
                        break;
                        case 'rt':
                            y -= (_height -20);
                            x += (_width - 15);
                        break;
                        case 'rb':
                            y += (_height -10);
                            x += (_width - 15);
                        break;
                    }
                    style_options.top = y;
                    style_options.left = x;
                    contenedor = 'body';
                    if(opts.type == 'error'){
                        $('<div error="' + ($(input).attr('id') || $(input).attr('name')) + '"></div>').
                            html(opts.text).
                            prepend(_close).
                            addClass(_style).
                            css(style_options).
                            prependTo(contenedor);
                    }else{
                        $('<div error="' + ($(input).attr('id') || $(input).attr('name')) + '"></div>').
                            html(opts.text).
                            prepend(_close).
                            addClass(_style).
                            css(style_options).
                            slideDown('slow').
                            delay(opts.delay).
                            slideUp('slow').
                            prependTo(contenedor);
                    }
                }
                $('.close').live('click', function(){
                    if($(this).attr('rel') == 'msj'){
                        $(this).parent("div").slideUp('slow').remove()
                    }
                });
                
            },
            remove: function(input){
                $('div').each(function(){
                    if($(this).attr('error') == ($(input).attr('id') || $(input).attr('name'))){
                        $(this).remove();
                    }
                });
            }
        };
        settings = {};
        settings = $.extend({},
            defaults,
            ($.metadata? $(this).metadata():($.meta?$(this).data():null)) || {},
            options || {}
        );
        
        return this.each(function(){
            if(settings.remove === true){
                functions.remove(this);
            }else{
                functions._location(settings, this);
            }
        });
        return this;
    };
})(jQuery);