var mockData =  (function() {
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

  function getMockWeeklyChart() {
    return {
      year: 2016,
      weekNumber: 20,
      "songs": [
        {
          "artist": "Asaf Avidan",
          "title": "Gold Shadow",
          "rank": 1,
          "chordKey": 123123,
          "changeFromLast": -1
        }
      ]
    };
  }

  return {
    getMockChord: getMockChord,
    getMockUser: getMockUser,
    getMockWeeklyChart: getMockWeeklyChart,
  }
})();
