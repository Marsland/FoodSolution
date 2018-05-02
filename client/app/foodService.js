(function () {
    'use strict';

    angular
        .module('foodie')
        .service('foodService', foodService);

    foodService.$inject = ['$http'];

    function foodService($http) {
        var serviceBase = "http://files.olo.com/pizzas.json";

        this.get = function () {
            var result = $http.get(serviceBase);
            return result;
        };

    }
})();