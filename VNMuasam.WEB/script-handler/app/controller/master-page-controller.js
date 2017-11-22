var MasterPageController = function ($scope, $rootScope, $timeout, $filter, CommonFactory, UtilFactory, $localstorage) {
    $rootScope.MasterPage = { IsLoading: false }; 
    $rootScope.UserPricinpal = {};
     
    if (MasterData.IsResetUserPricinpal) {
        $localstorage.remove("UserPricinpal"); 
        MasterData.objUserPrincipal.LstPermission = MasterData.LstPermission;
        MasterData.objUserPrincipal.AccessToken = MasterData.objUserPrincipal.AccesToken;
        $localstorage.setObject("UserPricinpal", MasterData.objUserPrincipal);
    }
    $rootScope.MasterPage.RemoveCache = function () {
        //$rootScope.MasterPage.IsLoading = true;
        $timeout(function () {
            var url = "/OutputCaches/Remove";
            var dataSend = {}; 
            CommonFactory.PostDataAjax(url, dataSend,
                function (beforeSend) { },
                function (response) {
                    //$rootScope.MasterPage.IsLoading = false;
                    $timeout(function () {
                        if (response.objCodeStep.Status == 'Error') {
                            jAlert.Error(response.objCodeStep.Message);
                            return;
                        }
                        if (response.objCodeStep.Status == 'Success') {
                            jAlert.Success("xóa cache thành công"); 
                            return;
                        }
                    }, 100);
                },
                function (error) {
                    //$rootScope.MasterPage.IsLoading = false;
                    return;
                }
            );
        });
    };

    $rootScope.UserPricinpal.IsInRole = function (RoleFunctionName) {
        let UserPricinpal = $localstorage.getObject("UserPricinpal");
        let LstExist = _.filter(UserPricinpal.LstPermission, function (r) {
            if (_.contains(UserPricinpal.RoleIDs, r.RoleID)
                && RoleFunctionName == r.RoleFunctionName
                ) {
                return true;
            }
            return false;
        });
        if (LstExist.length == 0) {
            return false;
        }
        return true;
    }
}
MasterPageController.$inject = ["$scope", "$rootScope", "$timeout", "$filter", "CommonFactory", "UtilFactory", "$localstorage"];