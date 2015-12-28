'use strict';

angular.module('ctoWebApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view/:id', {
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl'
      });
  });
