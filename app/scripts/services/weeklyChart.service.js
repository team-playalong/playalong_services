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
            // convert songs into objects
            weeklyChart.songs = this.arrayToObject(weeklyChart.songs);
            return new Promise(function (resolve, reject) {
                PlyFirebase.insert('weeklyCharts', weeklyChart)
                    .then(function (result) { return resolve(result); })
                    .catch(function (error) { return reject(error); });
            });
        }
        function getLatestChart() {
            return new Promise(function (resolve, reject) {
                PlyFirebase.selecteByAggregate('weeklyCharts', 'dateCreated')
                    .then(function (result) { return resolve(result); })
                    .catch(function (error) { return reject(error); });
            });
        }
        return {
            createWeeklyChart: createWeeklyChart,
            getLatestChart: getLatestChart,
            arrayToObject: arrayToObject,
        };
    }
    angular.module('playalong.services')
        .factory('WeeklyChart', WeeklyChart);
})();
//# sourceMappingURL=weeklyChart.service.js.map