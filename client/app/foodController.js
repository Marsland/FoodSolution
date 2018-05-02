(function () {
    'use strict';

    angular
        .module('foodie')
        .controller('foodController', foodController);

    // Insert requried services to inject (** sidebarService for this example)
    foodController.$inject = ['$location', '$window', '$rootScope', '$scope', 'foodService'];

    function foodController(location, window, rootScope, $scope, foodService) {
        var vm = this;

        vm.hello = "Pizza Topping Top 20";

        vm.menuItems = [];
        vm.searchResults = [];
   
        load();

        //Load the menu items from the menu collection
        function load() {
            var promiseGet = foodService.get();
            promiseGet.then(function (pl) {
                ////Display initial list of items in menu collection
                for (var a = 0; a <= pl.data.length - 1; a++) {

                    vm.searchResults.push(pl.data[a].toppings);
                 }
                var results = occurrence(vm.searchResults);

                  for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        vm.menuItems.push({ 'items': key, 'length': results[key].length});
                     }
                }

                vm.menuItems.sort(compareLengths);
 
            },
                function (errorPl) {
                }
            );
        }
        
        // sort by length of arrays top to bottom
        function compareLengths(a, b) {
            if (a.length < b.length)
                return 1;
            if (a.length > b.length)
                return -1;
            return 0; // a == b
        }

        var occurrence = function (array) {
            "use strict";
            var result = {};
            if (array instanceof Array) { // Check if input is array.
                array.forEach(function (v, i) {
                    if (!result[v]) { // Initial object property creation.
                        result[v] = [i]; // Create an array for that property.
                    } else { // Same occurrences found.
                        result[v].push(i); // Fill the array.
                    }
                });
            }
            return result;
        };

    }
})();