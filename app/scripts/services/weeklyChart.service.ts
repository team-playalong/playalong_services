(function() {
  'use strict';

  interface Song {
    artist: string;
    title: string;
    rank: number;
    chordKey: string;
  }

  interface WeeklyChart {
    dateCreated: number;
    weekNumber: number;
    year: number;
    songs: Array<Song>;
  }

  WeeklyChart.$inject = ['PlyFirebase'];
  function WeeklyChart(PlyFirebase) {

    function createWeeklyChart(weeklyChart: WeeklyChart = {
      dateCreated: Date.now(),
      weekNumber: 1,
      year: 2016,
      songs: [],
    }) {
      // convert songs into objects


      return new Promise((resolve, reject) => {
        PlyFirebase.insert('weeklyCharts', weeklyChart)
        .then(result => resolve(result))
        .catch(error => reject(error));
      });

    }

    return {
      createWeeklyChart,
    };
  }
  angular.module('playalong.services')
    .factory('WeeklyChart', WeeklyChart);
})();
