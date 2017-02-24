var getHotels = function(hotelProduct, hotelLoadedCallback) {

	var url = "/geography/hotels_travelType=charterPackage&hotelProduct=sunwing.json?";

	if(hotelProduct == "sunwing")
		url = "/geography/hotels_travelType=charterPackage&hotelProduct=sunwing.json?"
	if(hotelProduct == "sunprime")
		url = "/geography/hotels_travelType=charterPackage&hotelProduct=sunprime.json?"
	if(hotelProduct == "sungarden")
		url = "/geography/hotels_travelType=charterPackage&hotelProduct=sungarden.json?"


	$.getJSON( url,//?jsoncallback=?",
	{
    	format: 'jsonp'
	},
	 function( hotels ) {		
	  	$.each( hotels.links, function( key, val ) {

	  		var hotel = {"name": val["title"] };
			  $.getJSON(val["href"],
				  function(hotelInfo) {
				  	hotel.location = hotelInfo.location;
					  hotel.description = hotelInfo.description;
					  console.log(hotel);
					  hotelLoadedCallback(hotel);
				  });
			  //realHotels.push(hotel);
			  //console.log(hotel);

		  });
		//console.log(realHotels);
	});
	//return realHotels;
	var test = function(j){
		console.log(j)
	}

};