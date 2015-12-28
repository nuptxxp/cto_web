'use strict';

angular.module('ctoWebApp')
  .controller('ViewCtrl', function ($routeParams, $scope, $http) {
    var uuid = $routeParams.id;
	$scope.chartShow = false;
	$scope.categories = [];
	var getChartData = function(data) {
		var appData = data.app ? data.app : [];
		var jobData = data.job ? data.job : [];
		var result = [];
		$scope.categories = ['cto_time', 'am_time'];
		if(appData.length >= 1){
			//console.log(Date.parse(appData[0].cto_start_time));
			result.push([Date.parse(appData[0].cto_start_time), Date.parse(appData[0].cto_end_time)]);
			result.push([Date.parse(appData[0].am_start_time), Date.parse(appData[0].am_end_time)]);
		}
		if(jobData.length >= 1){
			for(var i = 0; i < jobData.length; ++i){
				$scope.categories.push('job_' + jobData[i].unit_id);
				result.push([Date.parse(jobData[i].start_time), Date.parse(jobData[i].end_time)]);
			}
		}
		if($scope.categories.length <= 10){
			$scope.chartHeight = '300px';
		}else{
			var height = $scope.categories.length * 30;
			$scope.chartHeight = height + 'px';
		}
		return result;
	};
    $http.get('/api/process/' + uuid)
    .success(function(data){
		var seriesData = getChartData(data);
		console.log(seriesData);
		console.log($scope.categories);
		$scope.chartConfig = {
			chart: {
				type: 'columnrange',
				inverted: true
			},
			title: {
				text: '<b>' + uuid + '</b>各阶段耗时图'
			},
			xAxis: {
				categories: $scope.categories
			},
			yAxis: {
				type: 'datetime',
				title: {
					text: 'DateTime'
				}
			},
			tooltip: {
				formatter: function(){
					return this.x + '<br><span style="color:' + this.series.color + '">\u25CF</span><b>' + this.series.name + ":</b> " + Highcharts.dateFormat("%b %e %H:%M:%S", this.point.low) + " - " + Highcharts.dateFormat("%b %e %H:%M:%S", this.point.high); 
				}
			},
			plotOptions: {
				columnrange: {
					pointWidth: 15,
					dataLabels: {
						enabled: true,
						align: "center",
						inside: true,
						formatter: function () {
							return (this.point.high - this.point.low) / 1000 + 's';
						}
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: 'Time',
				data: seriesData
			}]
		};
		$scope.chartShow = true;
    })
    .error(function(status){
    });
  });
