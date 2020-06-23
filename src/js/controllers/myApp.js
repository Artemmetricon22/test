var myApp = angular.module('myApp', []);
myApp.controller("listController", function ($scope,  $timeout, $http) {
    $scope.data = [];
    $scope.currentTitle = '';
    $scope.currentDescription = '';
    $scope.activeDescription = '';
    $scope.isDsbBtn = false;

    $scope.setActive = function(index){
        var data = $scope.data,
            count = data.length;
        for(var i = 0; i < count; i++){
            $scope.data[i].active = false;
        }

        $scope.data[index].active = true;
        $scope.activeDescription = $scope.data[index].itemDescription;
    };

    $scope.addItem = function(currentTitle, currentDescription){
        var strTitle = currentTitle.replace(/\s+/g, ''),
            strDesc = currentDescription.replace(/\s+/g, '');

        if(!strTitle || !strDesc){
            alert('Введите данные');
            return false;
        }

        $scope.isDsbBtn = true;
        $scope.data.push({
            itemTitle: currentTitle,
            itemDescription: currentDescription
        });

        console.log($scope.data);

        setInLocal($scope.data);

        $scope.currentTitle = '';
        $scope.currentDescription = '';

        var promiseObj = $timeout(function(){
            $scope.isDsbBtn = false;
        }, 1000);
        
    };

    // $http({method: 'GET', url: 'http://localhost:4000/massive'}).then(function success(response) {
    //     console.log(response.data);
    //     $scope.data = response.data;
    // });
});