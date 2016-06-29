(function () {
    'use strict';
    WeeklyChart.$inject = ['PlyFirebase'];
    function WeeklyChart(PlyFirebase) {
        function arrayToObject(arr) {
            var res = {};
            arr.forEach(function (curr) {
                res[curr.chordKey] = curr;
            });
            return res;
        }
        function createWeeklyChart(weeklyChart) {
            if (weeklyChart === void 0) { weeklyChart = {
                dateCreated: Date.now(),
                weekNumber: 1,
                year: 2016,
                songs: [],
            }; }
            // convert songs into objects
            weeklyChart.songs = this.arrayToObject(weeklyChart.songs);
            return new Promise(function (resolve, reject) {
                PlyFirebase.insert('weeklyCharts', weeklyChart)
                    .then(function (result) { return resolve(result); })
                    .catch(function (error) { return reject(error); });
            });
        }
        return {
            createWeeklyChart: createWeeklyChart,
            arrayToObject: arrayToObject,
        };
    }
    angular.module('playalong.services')
        .factory('WeeklyChart', WeeklyChart);
})();
//# sourceMappingURL=weeklyChart.service.js.map