(function () {
    'use strict';
    WeeklyChart.$inject = ['PlyFirebase'];
    function WeeklyChart(PlyFirebase) {
        function createWeeklyChart(weeklyChart) {
            // convert songs into objects
            if (weeklyChart === void 0) { weeklyChart = {
                dateCreated: Date.now(),
                weekNumber: 1,
                year: 2016,
                songs: [],
            }; }
            return new Promise(function (resolve, reject) {
                PlyFirebase.insert('weeklyCharts', weeklyChart)
                    .then(function (result) { return resolve(result); })
                    .catch(function (error) { return reject(error); });
            });
        }
        return {
            createWeeklyChart: createWeeklyChart,
        };
    }
    angular.module('playalong.services')
        .factory('WeeklyChart', WeeklyChart);
})();
//# sourceMappingURL=weeklyChart.service.js.map