'use strict';

angular.module('ctoWebApp')
  .directive('chart', function () {
    return {
	  restrict: 'E',
	  replace: true,
	  template: '<div id="chartDiv" style="height: 500px"></div>',
	  scope: {
		config: '=',
	  	show: '=',
	  	height: '='
	  },
	  link: function (scope, element, attrs) {
		  	var chart;
		  	var process = function () {
				scope.config.chart.renderTo = "chartDiv";
				$(element).css('height', scope.height);
		  		chart = new Highcharts.Chart(scope.config);
			};
			scope.$watch("show", function (newval) {
				if(newval) process();
			});
	  }
	};
  });
