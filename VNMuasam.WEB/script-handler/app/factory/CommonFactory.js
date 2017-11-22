var $localstorage = function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) { return $window.localStorage[key] || defaultValue; },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            try {
                var temp = $window.localStorage[key];
                if (temp) {
                    return JSON.parse(temp || "{}");
                }
            } catch (e) {
                return JSON.parse("{}");
            }
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        clearAll: function () {
            $window.localStorage.clear();
        }
    };
};

$localstorage.$inject = ["$window"];

var CommonFactory = function ($rootScope, $localstorage, $timeout, UtilFactory, $q, $http) {
    var service = {};

    service.PostDataAjax = function (url, data, beforeSend, success, errorFunction, timeout) { 
        try {
            if (!timeout) {
                timeout = 60000;
            }

            $.ajax({
                url: url,
                type: "POST",
                //timeout: timeout,
                //cache: true,
                //crossDomain: true,
                //contentType: "application/json; charset=utf-8;",//cho nay dung thi data phai stringjfly 

                //accept: "application/json", 
                //acceptEncoding: 'gzip',
                 
                dataType: "json",
                data: data,
                //processData: true,
                beforeSend: beforeSend,//được kích hoạt trươc khi một Ajax request được bắt đầu
                //async: true,
                //tryCount: 0,
                //retryLimit: 3,
                success: function (response) {
                    $timeout(function () {
                        success(response);
                    });
                },
                error: function (error, textStatus, xhr) {
                    UtilFactory.Alert.RequestError(error);
                    $timeout(function () {
                        errorFunction(error);
                    });
                },
                complete: function (complete) {
                }
            }).always(function () {
            });
        } catch (e) {
            console.log('CommonFactory.PostDataAjax() error :' + e);
        }
    };
     
    service.GetDataAjax = function (url, data, beforeSend, success, errorFunction, timeout) {        
        try {
            if (!timeout) {
                timeout = 60000;
            } 
            $.ajax({
                url: url,
                type: "GET",
                //timeout: timeout,
                //cache: true,
                //crossDomain: true,
                //contentType: "application/json; charset=utf-8",//cho nay dung thi data phai stringjfly
                dataType: "json",
                data: data,
                //processData: true,
                beforeSend: beforeSend,//được kích hoạt trươc khi một Ajax request được bắt đầu
                //async: true,
                //tryCount: 0,
                //retryLimit: 3,
                success: function (response) {                                       
                    $timeout(function () {
                        success(response);
                    });
                },
                error: function (error, textStatus, xhr) {
                    UtilFactory.Alert.RequestError(error);
                    $timeout(function () {
                        errorFunction(error);
                    });
                },
                complete: function (complete) {
                }
            }).always(function () {
            });
        } catch (e) {
            console.log('CommonFactory.PostDataAjax() error :' + e);
        }
    };

    service.PostDataAjaxAsync = function (url, data, beforeSend, success, errorFunction, timeout) {
        try {
            if (!timeout) {
                timeout = 60000;
            }

            $.ajax({
                url: url,
                type: "POST", 
                dataType: "json",
                data: data, 
                beforeSend: beforeSend, 
                async: false, 
                success: function (response) {
                    success(response);
                },
                error: function (error, textStatus, xhr) {
                    UtilFactory.Alert.RequestError(error);
                    errorFunction(error);
                },
                complete: function (complete) {
                }
            }).always(function () {
            });
        } catch (e) {
            console.log('CommonFactory.PostDataAjaxAsync() error :' + e);
        }
    };

    service.PostPromise = function (url, data, SuccessCallback, ErrorCallback) {
        var q = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: data
        }).then(function SuccessResolve(response) {
            if (SuccessCallback) { 
                SuccessCallback(response);
            }
            q.resolve(response);
        }, function ErrorReject(response) {
            if (ErrorCallback) {
                ErrorCallback(response);
            } 
            q.reject(response);

        });
        return q.promise;
    };
    return service;
};

CommonFactory.$inject = ["$rootScope", "$localstorage", "$timeout", "UtilFactory", "$q", "$http"];
