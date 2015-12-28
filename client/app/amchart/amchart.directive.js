'use strict';

angular.module('ctoWebApp')
  .directive('amchart', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            options: '=ngModel'
        },
        templateUrl: 'app/amchart/amchart.html',
        link: function (scope, element, attrs) {
            var guid = function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();
            };
            var id = guid();
            element.attr('id', id);
            var chart;
            if (scope.options) {
                var renderChart = function (amChartOptions) {
                    var option = amChartOptions || scope.options;
                    chart = new AmCharts.AmSerialChart();
                    chart.dataProvider = option.data;

                    var chartKeys = Object.keys(option);
                    for (var i = 0; i < chartKeys.length; i++) {
                        if (typeof option[chartKeys[i]] !== 'object' && typeof option[chartKeys[i]] !== 'function') {
                            chart[chartKeys[i]] = option[chartKeys[i]];
                        } else {
                            chart[chartKeys[i]] = angular.copy(option[chartKeys[i]]);
                        }
                    }
                    chart.write(id);
                };

                renderChart();
                scope.$watch('options', function (newValue, oldValue) {
                    if (id === element[0].id || !id) {
                        renderChart(newValue);
                    }
                }, true);
            }
        }
    };
  });
