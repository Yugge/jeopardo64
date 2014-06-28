angular.module('app', ['ngAnimate'])

.controller('mainController', function($scope, $timeout){
    $scope.counter = 0;
    $scope.columns = [];

    $scope.headers = ['Radical Rebrand','Remix Galore','Forgotten baddies','Storytime','Memes from Games','People in games']
    $scope.questions = [['This is the european name for starfox (SNES)','This is the european name for the contra franchise','this is the japanese name of our super mario bros 2','d',['e']],[],[],[],[],[]];
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
    $scope.showAnswer = function(column,row){
        $scope.board = false;
        $scope.question = true;
        $scope.currentAnswer = $scope.questions[column][row];
        console.log($scope.currentAnswer, column, row);
    };
2
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