// controller for Monitor View

angular.module('zmApp.controllers').controller('zmApp.MonitorCtrl', function ($scope, ZMDataModel, message,$ionicSideMenuDelegate, $ionicLoading, $ionicModal, $state, $ionicLoading) {

    $scope.monitors = [];


$scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

$scope.reloadView = function ()
{
    console.log ("*** Refreshing Modal view ***");
     $scope.rand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    $ionicLoading.show({
                template: "refreshed view",
                noBackdrop: true,
                duration: 3000
            });
}

 $scope.$on('$ionicView.loaded', function(){
    console.log("**VIEW ** Monitor Ctrl Loaded");
  });

    $scope.$on('$ionicView.enter', function(){
    console.log("**VIEW ** Monitor Ctrl Entered");
  });

      $scope.$on('$ionicView.leave', function(){
    console.log("**VIEW ** Monitor Ctrl Left");
  });

         $scope.$on('$ionicView.unloaded', function(){
    console.log("**VIEW ** Monitor Ctrl Unloaded");
  });

 $scope.openModal = function (mid) {
        console.log("Open Monitor Modal");

        $scope.monitorId = mid;
        $scope.LoginData = ZMDataModel.getLogin();
        $scope.rand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        console.log("Close Monitor Modal");
        $scope.modal.hide();

    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        console.log("Destroy Monitor Modal");
        $scope.modal.remove();
    });

// This is a modal to show the monitor footage
    $ionicModal.fromTemplateUrl('templates/monitors-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function (modal) {
            $scope.modal = modal;

        });

    console.log("***EVENTS: Waiting for Monitors to load before I proceed");

    $scope.monitors = message;
    // console.log("I GOT " + $scope.monitors);

    console.log("HERE");

    $scope.doRefresh = function () {
        console.log("***Pull to Refresh");
        $scope.monitors = [];

        var refresh = ZMDataModel.getMonitors(1);
        refresh.then(function (data) {
            $scope.monitors = data;
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

});
