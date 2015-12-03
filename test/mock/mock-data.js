var mockData = 	(function() {
	function getMockChord() {
		return {
		    "artist": "Asaf Avidan",
		    "title": "Gold Shadow",
		    "imgUrl": "http://appleseedsmusic.com/wp-content/uploads/2014/02/Asaf+Avidan.jpg"
		};
	}

	var getMockUser = function() {
		return {
			email: "atardadi@gmail.com", 
			firstName: "Dadi", 
			lastName: "Atar", 
			uid: "google:116141183216896319819", 
			userType: "superuser",
			creationDate: 123123123
		};
	};

	return {
		getMockChord: getMockChord,
		getMockUser: getMockUser
	}	
})();