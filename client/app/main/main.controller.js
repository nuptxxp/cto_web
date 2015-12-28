'use strict';

angular.module('ctoWebApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.query = {};

    //init all button time
    $scope.buttonTimes = [
        {'title':'天', 'time': 24, 'active': false},
        {'title':'周', 'time': 24 * 7, 'active' : true},
        {'title':'月', 'time': 24 * 30, 'active' : false},
    ];

    $scope.hourChange = function(hours){
        var enddate = new Date();
        var onehour = 1 * 60 * 60 * 1000;
        var startdate = new Date(enddate - hours * onehour);
        $scope.query.starttime = startdate.getFullYear() + '-' + ( startdate.getMonth() + 1 ) + '-' + startdate.getDate()
          + ' ' + startdate.getHours() + ':' + startdate.getMinutes();
        $scope.query.endtime = enddate.getFullYear() + '-' + ( enddate.getMonth() + 1 ) + '-' + enddate.getDate()
          + ' ' + enddate.getHours() + ':' + enddate.getMinutes();
    }

    $scope.buttonSearch = function(hours){
        $scope.hourChange(hours);
        $scope.search();
        var buttonTimes = $scope.buttonTimes;
        for(var index in buttonTimes){
            var buttonTime = buttonTimes[index];
            if( buttonTime.time === hours){
                buttonTime.active = true;
            }else{
                buttonTime.active = false;
            }
        }

    }

    // init date time input
    $scope.hourChange(24 * 7);

    //get all app count
    $scope.search = function(){
        $http.get('/api/queryApp', {
            params: {
                starttime: $scope.query.starttime + ':00',
                endtime: $scope.query.endtime + ':00',
            }
        })
        .success(function(data){
            $scope.results = data;
        })
        .error(function(status){
            $scope.results = [];
        });
    };



    $scope.search();

  });
