angular.module('app', ['ngAnimate'])

.controller('mainController', function($scope, $timeout){
    $scope.counter = 1;
    $scope.columns = [];
    $scope.answers = {};
    $scope.players = {};

    $scope.currentBoard = {};
    $scope.round = 1;
    $scope.displayMode = "board";
    $scope.transitionText = "Current Score";
    $timeout(function(){
        $.getJSON('answers.json', function(data) {
            $scope.answers = data.answers;
            $scope.currentBoard = $scope.answers.firstBoard;
        });
        $.getJSON('players.json', function(data) {
            $scope.players = data.players;
        });
        console.log('init',$scope.columns);
        $scope.displayMode = "board";
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
        $scope.displayMode = 'answer';
        $scope.currentAnswer = $scope.currentBoard[column][row]["answer"];
        $scope.currentBoard[column][row].played = true;
        console.log($scope.currentBoard[column][row]);
    };
    $scope.showAnswerSpecial = function(answer){
        $scope.displayMode = 'answer';
        $scope.currentAnswer = answer;
    };

    $scope.getVisibility = function(colName, row){
        if (typeof $scope.currentBoard[colName] === undefined){
            return false
        }
        return $scope.currentBoard[colName][row].played;
    };

    $scope.timeForBoardChange = function(){
        var retValue = true;
        Object.keys($scope.currentBoard).forEach(function(catName){
            console.log(catName);
            $scope.currentBoard[catName].forEach(function(answer){
                console.log("\t",answer);
                if (answer.played == false){
                    retValue = false;
                }
            });
        });
        return retValue
    };

    $scope.transitionToBoard = function(){
        if ($scope.round != 3) {
            $scope.displayMode = 'board';
            return
        }
        $scope.showAnswerSpecial($scope.answers.finalAnswer.category);
    };

    $scope.showBoard = function(){
        $scope.displayMode = 'board';
        if ($scope.timeForBoardChange()){
            if ($scope.round == 1) {
                $scope.transitionText = 'Get ready for Round 2!';
                $scope.displayMode = 'score';
                $scope.round += 1;
                $scope.columns = JSON.parse(JSON.stringify($scope.columns));
                console.log('round', $scope.round);
                $scope.currentBoard = $scope.answers.secondBoard;
            } else if ($scope.round == 3) {
                $scope.showAnswerSpecial($scope.answers.finalAnswer.answer);
            } else {
                $scope.round += 1;
                $scope.transitionText = 'Final Answer!';
                $scope.displayMode = 'score';
            }
        }
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