(function($){
	$(document).ready(function(){

		templateUrl = $('#TEMPLATEURL').val();
		$('#switch_show_btn').click(show_switch);
		$('#switch_hide_btn').click(hide_switch);
		switch_dd();
		$('.switch_item', '.switch_section.postbody').click(switch_postbody);
		$('.switch_item', '.switch_section.bgpattern').click(switch_pattern);
		
		//$( '#ft-wheel-demo' ).farbtastic( '#ft-value-demo' );
		
		$('#ft-wheel-demo').farbtastic( function(){	switch_accent( $.farbtastic('#ft-wheel-demo').color ); });
		$.farbtastic('#ft-wheel-demo').setColor( $("#ft-value-demo").val() );
		
		
		showHideSection( $('#chk_glasseffect'), $('#switch_glasseffect').find('.inner'), 'micro_glasseffect' );
		
		$('#switch_glasseffect').find('.inner').children('a').on('click', function(){
			var link = $(this).attr('href');
			$('html.glasseffect body').css('background-image', 'url('+link+'.jpg)');
			$('html.glasseffect .page-wrapper').css('background-image', 'url('+link+'_glass.jpg)');
			$('#glass_img').val(link);
			$.cookie('micro_glasseffect_img', link, { path: '/' });
			return false;
		});
		
		
		var currAccent = $.farbtastic('#ft-wheel-demo').color;
		var sw = setTimeout(function(){},1);
		$(window).on('resize', function(){
			var $this = $(this);
			clearTimeout(sw);
			sw = null;
			sw = setTimeout( 
				function(){
					if ( $this.width() < 1024  ){
						$('#nav').find('.curr-ind')
							.css( 'border-top-color', $.farbtastic('#ft-wheel-demo').color )
							.css( 'border-left-color', 'transparent' );
					} else {
						$('#nav').find('.curr-ind')
							.css( 'border-left-color', $.farbtastic('#ft-wheel-demo').color )
							.css( 'border-top-color', 'transparent' );
					}
				}, 300
			);
		});
		
	
	});
	
	var templateUrl;
	
	function showHideSection( trigger, content, cookie ){
		trigger.on( 'click', function(){
			var status = '';
			if ( $(this).is(':checked') ){
				status = true;
				content.slideDown(200);
				$.cookie(cookie, 'on', { path: '/' });
			} else {
				status = false;
				content.slideUp(200);
				$.cookie(cookie, 'off', { path: '/' });
			}
			
			var id = trigger.attr('id');
			if ( id === 'chk_glasseffect' ){
				if ( status ){
					$('html').addClass('glasseffect');
					var image = $('#glass_img').val();
					$('html.glasseffect body').css('background-image', 'url('+image+'.jpg)');
					$('html.glasseffect .page-wrapper').css('background-image', 'url('+image+'_glass.jpg)');
				} else {
					$('html').removeClass('glasseffect');
					$('body, .page-wrapper').css('background-image','none');
				}
			}
			
		});
	}
	
	function show_switch(){
		$('#switch_wrapper').delay(100).animate({marginRight:0}, 'fast');
		$(this).addClass('active');
	}

	function hide_switch(){
		$('#switch_wrapper').animate({marginRight:-155}, 'fast', function(){
			$('#switch_show_btn').removeClass('active');
		});
	}
	
	function switch_dd(){
		
		$('.switch_dd').on('click', function(){
			$('.switch_dd_list', this).show();
		});
		$('.switch_dd_list').on('mouseleave', function(){
			$(this).hide();
		});
		$('.switch_dd_item').on('click', function(){
			ddType = $(this).closest('.switch_dd').attr('id');
			if( ddType != 'switch_sitelayout' && ddType != 'switch_accentcolor' ){
				itemValue = $(this).attr('href').split(',');
				itemRoot = $(this).closest('.switch_dd');
				$('.switch_dd_list', itemRoot).hide();
				if($('.switch_dd_selected', itemRoot).html()==itemValue[0]) return false;
				$('.switch_dd_selected', itemRoot).html(itemValue[0]);
				switch_dd_action(itemRoot.attr('id'), itemValue);
				return false;
			}
		});
	}
	function switch_dd_action(el, val){
		switch(el){
			case 'switch_thumbmode':
				switch_thumbmode(val[1]);
				break;
			case 'switch_sitestyle':
				switch_sitestyle(val[1]);
				break;
			case 'switch_introsection':
				switch_introsection(val[1]);
				break;
		}
	}
	
	function switch_accent(color){
	  /*accent-color*/
		$('.site-logo').find('span').css( "color",$.farbtastic('#ft-wheel-demo').color );
		if ( $(window).width() < 1024  ){
			$('#nav').find('.curr-ind')
				.css( 'border-top-color', $.farbtastic('#ft-wheel-demo').color )
				.css( 'border-left-color', 'transparent' );
		} else {
			$('#nav').find('.curr-ind')
				.css( 'border-left-color', $.farbtastic('#ft-wheel-demo').color )
				.css( 'border-top-color', 'transparent' );
		}
		$('#nav, .title-after, .portfolio-item .item-data').css( "background-color",$.farbtastic('#ft-wheel-demo').color );
		$('.item-cat').not('.custom-colored').css( "background-color",$.farbtastic('#ft-wheel-demo').color );
		$("#ft-value-demo").val($.farbtastic('#ft-wheel-demo').color).css('background-color', $.farbtastic('#ft-wheel-demo').color );
				
		$.cookie('micro_accent', color, { path: '/' });
	}

	function switch_introsection(type){
	  /*accent-color*/
		$.cookie('micro_introsection', type, { path: '/' });
		window.location.reload();
		return false;
	}

	function switch_sitestyle(style){
	  /*accent-color*/
	  	if ( style === 'light' ) {
			$('html').removeClass('sitestyle-dark');
		} else {
			$('html').removeClass('sitestyle-light');
		}
		$('html').addClass('sitestyle-'+style);
		$.cookie('micro_sitestyle', style, { path: '/' });
		//window.location.reload();
		return false;
	}
	function switch_thumbmode(mode){
	  /*accent-color*/
	  	$itemContent = $('.item-content-permalink');
	  	if ( mode === 'false' ){
			$itemContent.removeClass('minified');
		} else {
			$itemContent.addClass('minified');
		}
		$('#masonry-container').masonry('reload');
		$.cookie('nano_thumbmode', mode, { path: '/' });
	}

	function switch_postbody(){
		tag = $(this).attr('id');
		tag = tag.split('-');
		newpost = tag[1];
		
	  /*accent-color*/
	  	postcolors = ['yellow', 'white', 'black'];
		postcolor = $('#post-color-css').attr('href');
		$.each(postcolors, function(key,value){
			if(value!=newpost) postcolor = postcolor.replace(value+'.css',newpost+'.css');
		});
		$('#post-color-css').attr('href', postcolor);
		$.cookie('millilight_postbody', newpost, { path: '/' });
	}

	function switch_pattern(){
		patt = $(this).attr('id');
		patt = patt.substr(3);
		$('body').css('background-image','url('+patt+')');
		$.cookie('nano_bgpattern', patt, { path: '/' });
	}

})(jQuery);