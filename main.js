var Settings = function () {
    this.payoutTime = 30;
    this.bettingTime = 40;
    this.totalBalance = -1;
    this.gamesCount = -1;
    this.currentLottoId = -1;
    this.workingNode = "0xd890ce6b80b3a48d8c455b8e9fd98eb6be1034d6";
    this.rpc = "http://127.0.0.1:8102";
    this.currentLottoId = 1;
    this.topTen = [];

};
var Lotto = function () {
    this.LottoId;
    this.balance;
    this.betDelay;
    this.payDelay;
    this.bettersCount;
    this.betPrice;
};


var mainModule = angular.module('mainModule', ['ngRoute']);

mainModule.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'template.html',
        controller: 'mainC'
    });

});


mainModule.controller("mainC", ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    console.log("mainC is called");
    $scope.settings = new Settings();
    $scope.lottoList = [];


    $scope.connectMyNode = function () {
        web3.setProvider(new web3.providers.HttpProvider($scope.settings.rpc));
    };

    $scope.uploadContract = function () {


        $scope.newInstance = $scope.abiTest.new(
            {
                from: web3.eth.accounts[0],
                data: '60606040525b60036000600050819055505b60c980601e6000396000f30060606040526000357c01000000000000000000000000000000000000000000000000000000009004806318b0c3fd14604b5780638ada066e14606a578063d09de08a146089576049565b005b60546004506094565b6040518082815260200191505060405180910390f35b607360045060b8565b6040518082815260200191505060405180910390f35b609260045060a1565b005b6000600a9050609e565b90565b60006000818150548092919060010191905055505b565b6000600060005054905060c6565b9056',
                gas: 1000000
            }, function (e, contract) {
                if (!e) {
                    if (!contract.address) {
                        console.log('Contract transaction sent! TransactionHash: ' + contract.transactionHash + ' waiting to be mined...');
                    } else {
                        console.log('Contract mined! Address: ' + contract.address);
                        console.log(contract);
                    }
                }
            }
        );
    }

    $scope.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    $scope.initContract = function () {
        $scope.abiTest = web3.eth.contract([{
            "constant": false,
            "inputs": [],
            "name": "plus",
            "outputs": [{"name": "", "type": "uint256"}],
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "getCounter",
            "outputs": [{"name": "", "type": "uint256"}],
            "type": "function"
        }, {"constant": false, "inputs": [], "name": "increment", "outputs": [], "type": "function"}, {
            "inputs": [],
            "type": "constructor"
        }]);
    };
    $scope.newLotto = function () {
        $scope.instance.plus.call({
            from: web3.eth.coinbase,
            gas: 2000000
        }, function (err, data) {
            console.log(err);
            console.log(data.toString());
            console.log(data);

        });
        $scope.instance.increment.call(function (err, data) {
            console.log(err);
            console.log(data.toString());
            console.log(data);

        });
        var ctn = $scope.instance.getCounter.call(function (err, data) {
            console.log(err);
            console.log(data.toString());
            console.log(data);

        });
        console.log(ctn);
    };
    $scope.logListener = function (arg1, agr2) {
        console.log(arg1);
        console.log(arg2)
    }
    $scope.getDataListener = function (arg1, agr2) {
        console.log(arg1);
        console.log(arg2)
    }
    $scope.topTenListener = function (err, res) {
        $scope.settings.topTen = res;
        console.log(err);
        console.log(res);

    }
    $scope.gameUpdate = function (arg1, agr2) {
        console.log(arg1);
        console.log(arg2)
    }

    $scope.bet = function () {
        /*  $scope.lottoCtx.buyAndSubmitSecret.call($scope.settings.currentLottoId, $scope.randomIntFromInterval(5, 100500), {
         from: web3.eth.coinbase,
         gas: 20000000
         }, function (err, data) {
         console.log(err);
         console.log(data);
         });*/
    }
    $scope.instantiate = function () {
        $scope.instance = $scope.abiTest.at($scope.settings.workingNode);

    }


}]);



