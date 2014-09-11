(function($){
	$(document).ready(function(){
									   
		the1Globals.resizeTimeout = setTimeout( function(){}, 1 );
		$loadingGif = $('<div id="loading-icon-wrapper"><div class="loading-icon"></div></div>');
		
		//init_search();

		fluid_video();
		nicescrollInit();
		portfolioInit();
		skillsInit();
		mainNav();
		tooltipsInit();
		
		$(window).on( 'load resize', function(){
			clearTimeout(the1Globals.resizeTimeout);
			the1Globals.resizeTimeout = setTimeout(
				function(){
					$('.portfolio-wrapper').find('.portfolio').masonry('reload');
					
					var $nav = $('#nav');
					var $currentItem = $nav.find('.current-menu-item');
					var posTop = $currentItem.offset().top - $nav.offset().top;
					var posLeft = $currentItem.offset().left - $nav.offset().left;
					
					$navHighlight = $nav.find('.nav-highlight');
					if ( Modernizr.csstransitions ) {
						$navHighlight.css('left', posLeft+'px').css('top', posTop+'px');
						$navHighlight.show();
					} else {
						$navHighlight.stop().animate({ left: posLeft, top: posTop }, 200, function(){ $navHighlight.show(); });
					}

				}, 
				200
			)
		});
		
		contactForm();
		introSlider()

		
});
	


// PARALAX EFFECT
		function introSlider(){
			if ( $('#intro-slider').length < 1 ) { return false; }
			
			var $slider = $('#intro-slider');
			var $slides = $slider.find('.intro-slide');
			var $dots = $slider.find('.intro-slider-dot');
			var $progressBar = $('#slider-progress');
			
			var isSliderAutoplay = true;
			var sliderTimeout;
			
			var sliderDuration = 7000;
			var slidesTotal = $slides.length;
			var currentSlide = 0;
			
			/* Slides Switch On Click */
			$dots.on( 'click', function(){
				var $this = $(this);
				if ( $this.hasClass('active') ) { return false; }
				var id = $this.attr('id').replace('dot-','');
				isSliderAutoplay = false;
				$progressBar.animate({opacity:0}, 100, function(){ $progressBar.hide(); });
				sliderSwitch(id);
			});

			/* Slider Autoplay */
			if ( slidesTotal > 1 ) {
				$progressBar.animate( { width: '100%' }, sliderDuration, function(){
					sliderAutoplay();
					$progressBar.css( 'width', 0 );
				});
			}
			
			function sliderAutoplay(){
				if ( isSliderAutoplay ){
					currentSlide++;
					if ( currentSlide > slidesTotal-1 ) {
						currentSlide = 0;
					}
					sliderSwitch(currentSlide);
					$progressBar.animate( { width: '100%' }, sliderDuration, function(){
						sliderAutoplay();
						$progressBar.css( 'width', 0 );
					});
				}
			}

			function sliderSwitch(id){
				var $slCurrent = $slides.filter('.active');
				var $slNext = $slides.eq(id);
				
				$dots.removeClass('active');
				$dots.eq(id).addClass('active');
				
				$slCurrent.css('z-index', 2);
				$slNext.css('z-index', 3).fadeIn( 300, function(){
					$slNext.addClass('active');
					$slCurrent.css('z-index', 1).removeClass('active').hide();
				});
			}
			
			/* Paralax Effect */
			
			$(window).on( 'scroll', function(){
				var topOffset = $(this).scrollTop();
				$slides.css('background-position' ,'50% -'+(topOffset/12)+'px');
			});
		}


// CONTACT FORM
		function contactForm(){
			$('#contact-template-wrapper').on('submit', '#contact-template', function() {
				var $this = $(this);
				$this.find('#contact-submit-wrapper').html( $loadingGif );
				
				var data = $this.serialize();
				$.post(the1Globals.ajaxUrl, data, function(response) {
					$('#contact-template-wrapper').html(response);
				});
				//overlayer('<div id="saving">saving...</div>');
				return false;
			});
		}



// MAIN VARs
		
		the1Globals.preloadImages = '';
		the1Globals.resizeTimeout = '';
		the1Globals.scrollTimeout = '';
		the1Globals.scrollTimeoutDuration = '';
		the1Globals.$sections = '';

// TOOLTIPS INITIALIZE
		function tooltipsInit(){
			$( '.social-profiles' ).find('a').tooltip({
				tooltipClass: 'social-icons-tooltip',
				position: { my: "center bottom", at: "center top-15" },
				show: {
					duration: 200
				},
				hide: {
					duration: 200
				}
			});
			
			if ( !isAppleDevice() ){
				$( '.intro-title' ).tooltip({
					tooltipClass: 'intro-title-tooltip',
					content: '<div class="tooltip-profile-image">'+$('.profile-image:eq(0)').html()+'</div>',
					position: { my: "left+40 top-20", at: "right top" },
					track: true,
					show: {
						effect: "fade",
						duration: 300
					},
					hide: {
						effect: "none",
					}
				});
			}
		}


// DETECT IOS
		function isAppleDevice(){
			if ( navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod' ){
				return true;
			} else {
				return false;
			}
		}

// NICESCROLL
		function nicescrollInit(){
			if ( isAppleDevice() ){
				return false;
			};
			if ( $('body').hasClass('niceScroll') ){
				$('body, #ajax-post').niceScroll({
					cursorwidth: '14px',
					cursorcolor: '#444',
					cursorborder: 'none',
					cursorborderradius: '10px'
				});
			}
		}


// PRELOAD IMAGES
		function preload_images(){
			the1Globals.preloadImages = [
				the1Globals.templateUrl+'/images/sample_image.png',
			];
			$(the1Globals.preloadImages).each(function(){
				var image = $('<img />').attr('src', this);
			});
		}


// MAIN NAVIGATION SETUP
		function mainNav(){
			the1Globals.$sections = $('section.page-wrapper');
			$nav = $('#nav');
			$navItems = $nav.children('ul').children('li');
			$navHighlight = $nav.find('.nav-highlight');
			
			$nav.find('li.menu-item').append('<div class="curr-ind"></div>');
			
			/* highlight : on hover */
			$navItems.on( 'mouseenter', function(){
				var $this = $(this);
				var posTop = $this.offset().top - $nav.offset().top;
				var posLeft = $this.offset().left - $nav.offset().left;
				
				$this.addClass('active');
				navHighlight( $nav, posLeft, posTop );
			}).on( 'mouseleave', function(){
				var $this = $(this);
				var posTop = $nav.find('.current-menu-item').offset().top - $nav.offset().top;
				var posLeft = $nav.find('.current-menu-item').offset().left - $nav.offset().left;
				
				$this.removeClass('active');
				navHighlight( $nav, posLeft, posTop );
			});
			
			
			/* highlight : on scroll */
			the1Globals.scrollTimeout = setTimeout(function(){},1);
			if ( $('#nav').hasClass('animated') ){
				$(window).scroll(function(){
					var $this	= $(this);
					var pos		= $this.scrollTop();
					var $divs 	= the1Globals.$sections;
					var activeSection	= 0;
					
					for ( i = 0; i < $divs.length; i++ ){
						var $next = $divs.eq(i+1);
						var $this = $divs.eq(i);
						if( $next.length ){
							var posTop = $next.offset().top - 200;
						} else {
							var posTop = 100000000;
						}
						
						if ( pos < 1 ){
							activeSection = 'intro';
							break;
						} else if ( pos < posTop ){
							activeSection = $this.attr('id');
							break;
						}
						if( i === $divs.length-2 ){ activeSection = 'contact' }
						//console.log( i+', '+$divs.length);
					}
					
					clearTimeout(the1Globals.scrollTimeout);
					the1Globals.scrollTimeout = null;
					the1Globals.scrollTimeout = setTimeout(function(){
						//window.location.hash = '!'+$this.attr('id');
						var $nav = $('#nav');
						var $navActive = $nav.find('li.active')
						if( $navActive.length ){
							var $currentItem = $navActive;
						} else {
							var $currentItem = $nav.find('a.item-'+activeSection).parent();
						}
						
						var posTop = $currentItem.offset().top - $nav.offset().top;
						var posLeft = $currentItem.offset().left - $nav.offset().left;
	
						$nav.find('.current-menu-item').removeClass('current-menu-item');
						$nav.find('a.item-'+activeSection).parent().addClass('current-menu-item');
						
						navHighlight( $nav, posLeft, posTop );
					}, the1Globals.scrollTimeoutDuration);
				});
			}
			
			/* animate navigation highlight */
			function navHighlight( $nav, posLeft, posTop ){
				$navHighlight = $nav.find('.nav-highlight');
				if ( Modernizr.csstransitions ) {
					$navHighlight.css('left', posLeft+'px').css('top', posTop+'px');
				} else {
					$navHighlight.stop().animate({ left: posLeft, top: posTop }, 200 );
				}
			}
			
			$('#nav').find('a').on( 'mousedown', function(){ $('.nav-highlight').css('background','#ccc');} )
				.on( 'mouseup', function(){ $('.nav-highlight').css('background','#fff');} );
				
			/* Animate scrolling on anchors */
			//if ( !isAppleDevice() ){
				$('body').find('a').on( 'click', function(){
					var $this = $(this);
					
					var href = $this.attr('href');
					if ( href.charAt( 0 ) == '#' ) {
						var $nav = $('#nav');
						
						$nav.children('ul').children('li').removeClass('current-menu-item');
						$nav.find( '.item-'+href.substr(1) ).parent().addClass('current-menu-item');
						
						var posTop = $nav.find('.current-menu-item').offset().top - $nav.offset().top;
						var posLeft = $nav.find('.current-menu-item').offset().left - $nav.offset().left;
						navHighlight( $nav, posLeft, posTop );
						the1Globals.scrollTimeoutDuration = 400;
						if ( href === "#" ){
							$('html, body').animate( { scrollTop: 0 }, 800, function(){ the1Globals.scrollTimeoutDuration = 10; } );
							return false;
						} else {
							var divpos = $( "section" + href ).position().top;
							$('html, body').stop().animate({ scrollTop: Math.floor(divpos) - $('#navheight').height() - $('#headerheight').height() }, 800, function(){ the1Globals.scrollTimeoutDuration = 10; } );
							return false;
						}
					}		
				});
			//}

		}


// SKILLS INIT ANIMATION
		function skillsInit(){
			setTimeout( 
				function(){
					$('.skill-wrapper').find('.not-loaded').removeClass('not-loaded');
				}, 500
			);
		}


// SEARCH FIELD
		function init_search(){
			srchField = $('.search-wrapper .field');
			srchWidth = srchField.width();
			srchField.focus(function(){
				if(!$(this).hasClass('active')){
					$(this).addClass('active');
					$(this).stop().animate({width:190, backgroundPosition: -50}, 300);
				}
			});
			srchField.blur(function(){
				if($(this).val()==''){
					$(this).removeClass('active').stop().animate({width:srchWidth, backgroundPosition: 0}, 500);
				}
			});
		}
		
		
// NAVIGATION DROPDOWN TOGGLE
		function nav_dd(){
			ddBtn = $(this);
			ddNav = $('#nav');
			if( ddBtn.hasClass('active') ){
				ddBtn.removeClass('active');
				ddNav.slideUp();
			} else {
				ddBtn.addClass('active');
				ddNav.slideDown();
			}
		}


// PORTFOLIO: INITIALIZE
		function portfolioInit(){
			
			var $portfolio = $('.portfolio-wrapper');
			
			/* Masonry: init */
			$portfolio.find('.portfolio').masonry({
				isAnimated: !Modernizr.csstransitions,
				itemSelector: '.portfolio-item.active'
			});
			
			/* Masonry: filter */
			$portfolio.find('.portfolio-filter').find('a').on ('click', function(){
				var $this = $(this);
				var $container = $this.closest('.portfolio-wrapper').find('.portfolio');
				
				var tag = $this.data('cat'); 
				
				if ( tag === 'all' ) {
					var $elementsToShow = $container.find('.portfolio-item');
					$elementsToShow.addClass( 'active' ).fadeIn(400, function(){ /* resetNiceScroll(); */ });
				} else {
					$container.find('.portfolio-item').each(function(){
						var $this = $(this);
						if ( $this.hasClass( tag ) ) {
							$this.addClass('active')
						} else {
							$this.removeClass('active');
						}
					});
					
					var $elementsToShow = $container.find('.portfolio-item.active');
					var $elementsToHide = $container.find('.portfolio-item').not('.active');
					$elementsToShow.fadeIn(400, function(){ /* resetNiceScroll(); */ });
					$elementsToHide.fadeOut(400);
				}
				$container.masonry('reload');
				return false;
			});
			
			/* Load More */
			$portfolio.find('#load-more').on( 'click', 'a', function(){
				var $this = $(this);
				var $portfolio = $this.closest('.portfolio-wrapper').find('.portfolio');
				var $tempResults = $('<div id="temp-results">'); 	//create a container for newly loaded items
				
				var $linkContainer = $this.parent();
				$linkContainer.html($loadingGif); 			//temporary replace a LoadMore link with the loading gif
				
				var link = $this.attr('href');
				var ajaxed = $this.data('ajaxed');
				link = addUrlParam( link, 'ajaxed', ajaxed );
				
				console.log('fisniq');
				$tempResults.load( link, function(){
					var $tempItems = $tempResults.find('.item').css('opacity', 0);	//store all new '.item' elements on $tempItems variable
					var $tempLink = $tempResults.find('#load-more').find('a'); 		//store link for next set of items on $tempLink variable
					
					$tempItems.appendTo($portfolio); 	//merge new items with the current ones
					setTimeout(function(){
						$portfolio.masonry('reload');		//reorder posts
						$tempItems.delay(500).animate({opacity: 1}, 300, function(){ /* resetNiceScroll(); */ }); //merge new items with the current ones
						$linkContainer.html($tempLink);		//overwrite loading gif with the new link
						
					}, 500);
				});
				return false;
			});

			/* Open Portfolio Item */
			$('body').on( 'click', '.ajaxed > a', function(){
				if ( $(window).width() <= 480 ) { return false; }
				
				var $this = $(this);
				var $postContainer = $('#ajax-post');
				
				if( $('#ajax-post-inner').length ){
					var $ajaxPostInner = $('#ajax-post-inner');
					$ajaxPostInner.fadeOut( 300, function(){
						$ajaxPostInner.remove();
						$postContainer.html($loadingGif); 			//temporary display a loading gif
					});
					
				} else {
					$postContainer.html($loadingGif).fadeIn(); 		//temporary display a loading gif
					if ( isAppleDevice() ){
						var TOP = $(window).scrollTop();
						$postContainer.data('windowPosition', TOP );
						$postContainer.css('position', 'static' );
						$('section.page-wrapper, #nav').hide();
					}
					
				}
				var $postInnerContainer = $('<div id="ajax-post-inner" class="s-wrapper">'); 	//create a container for newly loaded items
				$postInnerContainer.hide();
				
				var link = $this.attr('href');
				var $raw = $('<div id="raw">');
				
				$raw.load( link, function(){
					$postInnerContainer.html( $raw.find('#post-core').html() );
					$postContainer.html( $postInnerContainer );
					$postInnerContainer.fadeIn();
				});
				return false;
			});
			
			/* Close Portfolio Item */
			$('body').on( 'click', '#ajax-post #ajax-close', function(){
				var $ajaxPost = $('#ajax-post');
				var $ajaxPostInner = $('#ajax-post-inner');
				$ajaxPost.fadeOut( 250, function(){
					$ajaxPostInner.remove();
					if( isAppleDevice() ){
						var TOP = $ajaxPost.data().windowPosition;
						$('section.page-wrapper, #nav').show();
						$(window).scrollTop(TOP);
					}
				});
				return false;
			});

		}


// FLUID VIDEO FIX
		function fluid_video(){
			$('iframe, object, embed', '.postformat-video .media')
				.removeAttr('width')
				.removeAttr('height');
		}


// URL QUERY STRING PARAMETERS
		function getUrlParams(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		}
		function addUrlParam(url, param, value) {
			var val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))'),
				qstring = /\?.+$/;
			if (val.test(url)){
				return url.replace(val, '$1' + param + '=' + value);
			} else if (qstring.test(url)){
				return url + '&' + param + '=' + value;
			} else {
				return url + '?' + param + '=' + value;
			}
		}


// SCROLL TO TOP
		function to_top() {
			$('#to-top').click(function(){
				$('html, body').animate({scrollTop:0}, 'slow');
				return false;
			});
		}


// SC TOOLTIP
		function tooltip_init(){
			$('.tt').tooltip({
				position: {
					my: "center bottom-15",
					at: "center top",
					using: function( position, feedback ) {
						$( this ).css( position );
						$( "<div>" )
							.addClass( "tt-arrow" )
							.addClass( feedback.vertical )
							.addClass( feedback.horizontal )
							.appendTo( this );
					}
				}
			});
		}

})(jQuery);