angular.module('app', ['ngAnimate'])

.controller('mainController', function($scope, $timeout){
    $scope.counter = 0;
    $scope.columns = [];
    $scope.board = true;
    $timeout(function(){
        $scope.addNumber();
        console.log('init',$scope.columns);
    },250);

    $scope.addNumber = function(){
        if ($scope.counter != 5) {
            $scope.columns.push($scope.counter);
            $scope.counter++;
            $timeout($scope.addNumber, 250);
            console.log('adding',$scope.counter);
        }
    };
    $scope.showAnswer = function(){
        $scope.board = false;
        $scope.question = true;
    };

    $scope.showBoard = function(){
        $scope.board = true;
        $scope.question = false;
    };
    $scope.inoutloop = function () {
        $scope.$apply(function () {
            $scope.board = !$scope.board;
            console.log('hi!');
            }
        );
        $timeout($scope.inoutloop,1000);
    }
});