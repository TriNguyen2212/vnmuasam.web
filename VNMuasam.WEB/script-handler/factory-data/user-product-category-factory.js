var UserProductCategoryFactory = function ($rootScope, $localstorage, $timeout, UtilFactory, $q, $http, CommonFactory) {
    var service = {};

    service.GetLstUserProductCategoryTree = function () {
        return $q(function (resolve, reject) {
            $rootScope.MasterPage.IsLoading = true;
            dataSend = {};
            CommonFactory.PostDataAjax("/Directives/UserProductCategorySearch", dataSend,
                function (beforeSend) { },
                function (response) {
                    $timeout(function () {
                        $rootScope.MasterPage.IsLoading = false;
                        if (response.objCodeStep.Status == 'Error') {
                            jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                            reject();
                        }
                        if (response.objCodeStep.Status == 'Success') {
                            resolve(response.LstUserProductCategoryTree);
                        }
                    }, 100);
                },
                function (error) {
                    $rootScope.MasterPage.IsLoading = false;
                    reject();
                }
            );
        });
    };
    return service;
};

UserProductCategoryFactory.$inject = ["$rootScope", "$localstorage", "$timeout", "UtilFactory", "$q", "$http", "CommonFactory"];
