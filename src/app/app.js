angular.module('app', ['ngAnimate'])

.controller('mainController', function($scope, $timeout){
    $scope.counter = 1;
    $scope.columns = [];
    $scope.answers = {};

    $scope.currentBoard = {};
    $scope.board = true;
    $timeout(function(){
        $.getJSON('answers.json', function(data) {
            $scope.answers = data.answers;
            $scope.currentBoard = $scope.answers.firstBoard;
        });
        console.log('init',$scope.columns);
        $scope.addNumber();
    },250);

    $scope.addNumber = function(){
        if ($scope.counter != 6) {
            $scope.columns.push($scope.counter);
            $scope.counter++;
            $timeout($scope.addNumber, 250);
            //console.log('adding',$scope.counter, $scope.columns);
        }
    };
    $scope.showAnswer = function(column,row){
        $scope.board = false;
        $scope.question = true;
        $scope.currentAnswer = $scope.currentBoard[column][row]["answer"];
        $scope.currentBoard[column][row].played = true;
        console.log($scope.currentBoard[column][row]);


    };

    $scope.getVisibility = function(colName, row){
        if (typeof $scope.currentBoard[colName] === undefined){
            return false
        }
        return $scope.currentBoard[colName][row].played;
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