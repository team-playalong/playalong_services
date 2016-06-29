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
    function arrayToObject(arr) {
      let res = {};

      arr.forEach(curr => {
        res[curr.chordKey] = curr;
      });

      return res;
    }

    function createWeeklyChart(weeklyChart: WeeklyChart = {
      dateCreated: Date.now(),
      weekNumber: 1,
      year: 2016,
      songs: [],
    }) {
      // convert songs into objects
      weeklyChart.songs = this.arrayToObject(weeklyChart.songs);

      return new Promise((resolve, reject) => {
        PlyFirebase.insert('weeklyCharts', weeklyChart)
        .then(result => resolve(result))
        .catch(error => reject(error));
      });

    }

    return {
      createWeeklyChart,
      arrayToObject,
    };
  }
  angular.module('playalong.services')
    .factory('WeeklyChart', WeeklyChart);
})();
