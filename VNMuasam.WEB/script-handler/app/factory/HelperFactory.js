var HelperFactory = function ($rootScope, $timeout, CommonFactory) {
    var service = {};

    service.User = {};
    service.User.GetAccessToken = function () {
        if (!service.User.AccessToken) {
            $rootScope.MasterPage.IsLoading = true;
            CommonFactory.PostDataAjaxAsync('/Home/GetAccesToken', null,
                function (beforeSend) { },
                function (response) {
                    $rootScope.MasterPage.IsLoading = false;
                    if (response.objCodeStep.Status == 'Error') {
                        console.log(response);
                        throw response.objCodeStep.Message;
                    }
                    if (response.objCodeStep.Status == 'Success') {
                        service.User.AccessToken = response.strAccesToken;
                    }
                },
                function (error) {
                    $rootScope.MasterPage.IsLoading = false;
                    console.log(error);
                    throw "error";
                }
            );
        }
        return service.User.AccessToken;
    };
    return service;
};

HelperFactory.$inject = ["$rootScope", "$timeout", "CommonFactory"];