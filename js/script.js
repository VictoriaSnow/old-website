$(function() {
	var t = $("body");
	t.css("display", "none");
	t.fadeIn(1e3);
	$("html").niceScroll({
		scrollspeed: 100,
		cursoropacitymax: "0.5",
		cursorcolor: "#333",
		cursorwidth: "8px",
		cursorborder: "none"
	});
	$(".thumb-wrapper").freeMason({
		contPadding: 0,
		thumbGutter: 10,
		speed: "0.5s",
		maxCols: 3
	});
	$(".rift").rift();
	var e = !1,
// 		n = $(".photo, .name"),
		n = $(".header"),
		o = $(window);
	$(window).scroll(function() {
		e = !0;
	});
	window.setInterval(function() {
		e && (1 - o.scrollTop() / 200 > -10 && n.css({
			opacity: 1 - o.scrollTop() / 200
		}), e = !1)
	}, 50);
	$(".quotes li").removeClass("active").eq(0).addClass("active"),
		function(t) {
			function e() {
				t.eq(n).toggleClass("active"), ++n >= t.length && (n = 0), t.eq(n).toggleClass(
						"active"),
					setTimeout(e, 3500)
			}
			var n = 0;
			return t.length ? void e() : !1
		}($(".quotes").children()), $(".colophon").magnificPopup({
			type: "inline",
			fixedContentPos: !1,
			fixedBgPos: !0,
			overflowY: "auto",
			closeBtnInside: !0,
			preloader: !1,
			midClick: !0,
			removalDelay: 300,
			mainClass: "mfp-zoom-in"
		})
}), "ontouchstart" in document.documentElement && (document.documentElement.className +=
	" no-touch");