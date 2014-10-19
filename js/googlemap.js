(function($){
$(document).ready(function(){
	if( $('#googlemap').hasClass('parametermap') ){
		zoom_init = true;
		if( $('#googlemap').length ) googlemapInit();
	}
});

this.zoom_init = true;

function googlemapInit() {
	var myLatlng = new google.maps.LatLng(-34.028249, 151.157507);
	
	var mapOptions = {
		center: myLatlng,
		zoom: 1,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("googlemap"),mapOptions);
	
	var locations = [];
	$('.googlemap-parameter').each(function(){
		postData = $(this).val();
		postData = postData.split(',');
		locations.push(postData);
	});

    var marker, i;

	var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {  
		latlng = new google.maps.LatLng(locations[i][1], locations[i][2]);
		marker = new google.maps.Marker({
			position: latlng,
			map: map
		});
		bounds.extend(latlng);
    }
	map.fitBounds(bounds);
		
	zoomChangeBoundsListener = google.maps.event.addListener(map, 'bounds_changed', function(event) {
		if (zoom_init == true) {
			currZoom = this.getZoom();
			if(currZoom>11)newZoom = 11;
			this.setZoom(newZoom);
			zoom_init = false;
		};
	});
}
})(jQuery);