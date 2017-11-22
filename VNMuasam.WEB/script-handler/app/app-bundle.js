var UtilJS = {};

UtilJS.DateTime = {};
UtilJS.DateTime.ToString = function (strDate, strFormat) {
    if (!strDate) {
        return 'underfine';
    }
    var value = new Date
                (
                     parseInt(strDate.replace(/(^.*\()|([+-].*$)/g, ''))
                );
    //day
    var intDay = value.getDate();
    var strDay = intDay.toString();
    if (intDay <= 9) {
        strDay = "0" + strDay;
    }
    //month
    var intMonth = value.getMonth() + 1;
    var strMonth = intMonth.toString();
    if (intMonth <= 9) {
        strMonth = "0" + strMonth;
    }
    //return value
    if (strFormat == "dd/mm/yyyy") {
        return strDay + "/" +
                  strMonth + "/" +
                  value.getFullYear();
    }
    return strDay + "-" +
              strMonth + "-" +
              value.getFullYear();
}

UtilJS.String = {};
UtilJS.String.IsNullOrEmpty = function (str) {
    if (!str || str == null) {
        return true;
    }
    return false;
};

UtilJS.String.RemoveUnicode = function (str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
UtilJS.String.IsContain = function (strRoot, strRequest, IsSearchWithFormat) {
    if (UtilJS.String.IsNullOrEmpty(strRoot)) {
        return false;
    }
    if (UtilJS.String.IsNullOrEmpty(strRequest)) {
        return true;
    }
    strRoot = strRoot.normalize();
    strRequest = strRequest.normalize();
    strRoot = strRoot.toLowerCase();
    strRequest = strRequest.toLowerCase();

    if (IsSearchWithFormat) {
        strRoot = UtilJS.String.RemoveUnicode(strRoot);
        strRequest = UtilJS.String.RemoveUnicode(strRequest);
    }

    if (strRoot.indexOf(strRequest) < 0) {
        return false;
    }
    return true;
};
UtilJS.String.IsContainUnsigned = function (strRoot) {
    if (UtilJS.String.IsNullOrEmpty(strRoot)) {
        return false;
    }
    strRoot = strRoot.normalize();
    strRoot = strRoot.toLowerCase();
    strRoot = UtilJS.String.RemoveUnicode(strRoot);

    if (/^[a-zA-Z0-9- ]*$/.test(strRoot) == false) {
        return true;
    }
    return false;
};
UtilJS.Tree = {};
UtilJS.Tree.CheckParentIDNotExists = function (Lst) {
    Lst.forEach(function (itemID) {
        var ishasparent = false;
        if (itemID.parent != "#") {
            Lst.forEach(function (itemLstAll) {
                if (itemID.parent == itemLstAll.id) {
                    ishasparent = true;
                }
            });
            if (!ishasparent) {
                debugger;
            }
        }
    });
};

UtilJS.isNumber = function (evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;
    return true;
}

UtilJS.SumDecimal = function (Number) {
    return Math.round(Number * 1e12) / 1e12;
}

UtilJS.Array = {};
UtilJS.Array.Sort = function (Array, ColName, TypeData) {
    return _.sortBy(Array, function (item) {
        try {
            let str = item[ColName].normalize();
            str = str.toLowerCase();
            return UtilJS.String.RemoveUnicode(str);
        } catch (e) {
            debugger;
            throw e;
        }
    });
};
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
var formatMoney = function ($filter, $timeout) {
    return {
        require: '?ngModel',
        restrict: "A",
        scope: {
            myModel: "=",
            precision: "=",
            formatMoneyNoInput: "="
        },
        link: function (scope, elem, attrs, ctrl) {
            if (scope.precision == null || scope.precision == undefined)
                scope.precision = 0;
            elem.maskMoney({
                allowNegative: true, thousands: ',', decimal: '.', affixesStay: false, allowZero: true, precision: scope.precision
            });
            elem.keydown(function (event) {
                var c = String.fromCharCode(event.which);
                if (_.contains(scope.formatMoneyNoInput, c)) {
                    event.preventDefault();
                    return;
                }
                $timeout(function () {
                    scope.myModel = parseFloat(elem.val().replace(new RegExp(",", 'g'), ""));
                    elem.trigger("change");
                });
            });
            scope.$watch('myModel', function () {
                if ($.isNumeric(scope.myModel) && scope.myModel.toString().indexOf('.') > 0) {
                    elem.val(scope.myModel.toFixed(scope.precision)).trigger('mask.maskMoney');
                }
                else {
                    elem.val(scope.myModel).trigger('mask.maskMoney');
                }
            });
        }
    }
};
formatMoney.$inject = ['$filter', '$timeout'];
var getWidth = function ($timeout, $interval) {
    return {
        restrict: 'A',

        scope: {
            getWidth: "=",
        },

        link: function (scope, element, attrs) {
            $(function () {
                scope.getWidth = element[0].offsetWidth;

                $interval(function () {
                    scope.getWidth = element[0].offsetWidth;
                }, 500); 
            });
        }
    };
};

getWidth.$inject = ["$timeout", "$interval"];
var lazyLoad = function ($timeout, $window) {
    return {
        restrict: 'A',
        scope: {
            fncallback: "&lazyLoad"
        },

        link: function (scope, element, attrs) {
            scope.IsLoaded = false;
            scope.raw = element[0];  
            angular.element($window).bind("scroll", function (e) {
                var IsVisible = $(scope.raw).is(':visible');
                if (!scope.IsLoaded && IsVisible) {
                    var PositionYofElement = $(scope.raw).position().top;
                    if (this.pageYOffset + this.innerHeight >= PositionYofElement) {
                        scope.fncallback();
                        scope.IsLoaded = true; 
                        scope.$apply();
                    }

                }
            });
        }
    };
};

lazyLoad.$inject = ["$timeout", "$window"];
 
var noInput = function () {
    return {
        restrict: 'A',

        scope: {
            noInput: "="
        }, 

        link: function (scope, element, attrs) {  
            element.bind("keydown keypress", function (event) { 
                var c = String.fromCharCode(event.which);
                if (_.contains(scope.noInput, c)) { 
                    event.preventDefault();
                } 
            });

            //scope.KeyCode = [];
            //scope.noInput.forEach(function (item) {
            //    scope.KeyCode.push(item.charCodeAt(0));
            //});

            //element.bind("keydown keypress", function (event) {
            //    if (_.contains(scope.KeyCode, event.which)) {
            //        event.preventDefault();
            //    }
            //});
        }
    }; 
};
noInput.$inject = [];
var whenEnter = function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.whenEnter);
                });

                event.preventDefault();
            }
        });
    };
};
whenEnter.$inject = [];
var compile = function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
          function (scope) {
              // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
          },
          function (value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
          }
      );
    };
};
compile.$inject = ["$compile"];
var gridSort = function ($timeout) {
    return {
        restrict: "E",

        scope: {
            sort: "=",
            columnName: "=",
            fnCallBack: "&"
        },

        templateUrl: "/script-handler/app/directives/GridSort/GridSort.html",  

        link: function (scope, element, attrs) {

        }
    };
};

gridSort.$inject = ["$timeout"];
var paginationStyle1 = function ($timeout) {
    return {
        restrict: "E",

        scope: {
            pager: "=",//{ TotalItems: 0, PageSize: 10, CurrentPage: 1 }
            totalItems: "=",
            fnCallBack: "&"
        },
        templateUrl: "/script-handler/app/directives/pagination-style/pagination-style.html",

        link: function (scope, element, attrs) {
            scope.pager.TotalItems = 0;
            scope.pager.TotalPages = 0;

            function setPage() {
                if (!scope.pager.CurrentPage || scope.pager.CurrentPage < 1 || scope.pager.CurrentPage > scope.pager.TotalPages) {
                    scope.pager.Pages = [];
                    return;
                }

                if (!scope.pager.TotalPages) {
                    scope.pager.Pages = [];
                    return;
                }

                // get pager object from service
                GetPager(scope.pager.TotalItems, scope.pager.CurrentPage, scope.pager.PageSize);
            }

            function GetPager(TotalItems, CurrentPage, PageSize) {
                // default to first page
                CurrentPage = CurrentPage || 1;
                // default page size is 10
                PageSize = PageSize || 10;

                var StartPage, EndPage;
                StartPage = scope.pager.StartPage || 1;
                EndPage = scope.pager.EndPage || 10;
                //số page trên 1 trang
                var NumberPageSize = 10;
                var Lst = [];
                var NumberPager = Math.floor(scope.pager.TotalPages / NumberPageSize);
                var decimalPager = scope.pager.TotalPages % NumberPageSize;

                for (var i = 1; i <= NumberPager; i++) {
                    var Start = (i - 1) * PageSize;
                    var End = Start + NumberPageSize;
                    Lst.push({ Start: Start + 1, End: End });
                }
                if (decimalPager > 0) {
                    Lst.push({ Start: NumberPager * NumberPageSize + 1, End: NumberPager * NumberPageSize + decimalPager });
                }
                var IsHasCurrentPage = false;
                for (var i = 0; i < Lst.length; i++) {
                    if (CurrentPage >= Lst[i].Start && CurrentPage <= Lst[i].End) {
                        StartPage = Lst[i].Start;
                        EndPage = Lst[i].End;
                        if (EndPage > 10 && EndPage - StartPage < 9) {
                            StartPage = EndPage - 9;
                        }
                        IsHasCurrentPage = true;
                        break;
                    }
                }
                if (!IsHasCurrentPage) {
                    CurrentPage = Lst[0].Start;
                    StartPage = Lst[0].Start;
                    EndPage = Lst[0].End;
                }

                // calculate start and end item indexes
                var StartIndex = (CurrentPage - 1) * PageSize;
                var EndIndex = Math.min(StartIndex + PageSize - 1, TotalItems - 1);

                // create an array of pages to ng-repeat in the pager control
                var Pages = [];
                for (var i = StartPage; i <= EndPage; i++) {
                    Pages.push(i);
                }
                if (CurrentPage <= 0)
                    CurrentPage = 1;
                // return object with all pager properties required by the view
                scope.pager.PageSize = PageSize;
                scope.pager.StartPage = StartPage;
                scope.pager.EndPage = EndPage;
                scope.pager.StartIndex = StartIndex;
                scope.pager.EndIndex = EndIndex;
                scope.pager.Pages = Pages;
            }

            scope.$watch('totalItems', function (value) {
                scope.pager.TotalItems = scope.totalItems;
                scope.InitPager();
            });
            scope.$watch('pager.CurrentPage', function (value) {
                scope.InitPager();
            });
            scope.InitPager = function () {
                $timeout(function () {
                    scope.pager.TotalPages = Math.ceil(scope.pager.TotalItems / scope.pager.PageSize);

                    //Case: cập nhật mà bị mất row, thì fai~ pagecurrent--
                    if (scope.pager.CurrentPage > scope.pager.TotalPages) {
                        scope.pager.CurrentPage = scope.pager.TotalPages;
                        if (scope.pager.TotalPages == 0) {
                            scope.pager.CurrentPage = 1;//gán = 1 để khi set page, nếu totalpages có data thì currentpage bắt đầu là 1
                        }
                    }

                    setPage();
                });
            };

            scope.Exec = function (intPageClicked) {
                if (intPageClicked > scope.pager.TotalPages) {
                    return;
                }

                scope.fnCallBack({ PageClicked: intPageClicked });
                //setPage();
            }
            scope.ExecFirst = function (intPageClicked) {
                if (intPageClicked > scope.pager.TotalPages) {
                    intPageClicked = scope.pager.TotalPages;
                }
                if (intPageClicked <= 0) {
                    intPageClicked = 1;
                }
                scope.pager.StartPage = scope.pager.StartPage - 10;
                scope.pager.EndPage = scope.pager.EndPage - 10;
                if (scope.pager.StartPage <= 0) {
                    scope.pager.StartPage = 1;
                    scope.pager.EndPage = 10;
                }
                scope.fnCallBack({ PageClicked: intPageClicked });
                //setPage();
            }
            scope.ExecLast = function (intPageClicked) {
                if (intPageClicked > scope.pager.TotalPages) {
                    intPageClicked = scope.pager.TotalPages;
                }
                scope.pager.StartPage = scope.pager.EndPage + 1;
                scope.pager.EndPage = scope.pager.StartPage + 9;
                if (scope.pager.EndPage > scope.pager.TotalPages) {
                    scope.pager.EndPage = scope.pager.TotalPages;
                    scope.pager.StartPage = scope.pager.EndPage - 9;
                }
                scope.fnCallBack({ PageClicked: intPageClicked });
                //setPage();
            }
        }
    };
};

paginationStyle1.$inject = ["$timeout"];
var inputFormat = function ($filter) {
    return {
        require: '?ngModel',
        restrict: "A",  
        link: function (scope, elem, attrs, ctrl) {
            scope.defaultValue = attrs["defaultValue"] ? attrs["defaultValue"] : false;
            if (!ctrl) return;

            elem.bind("keypress", function (event) {
                var allowdecimal = (this.getAttribute("allow-decimal") == 'true') ? true : false;
                var keyCode = event.which || event.keyCode;
                if (((keyCode > 47) && (keyCode < 58)) || (keyCode == 8) || (keyCode == 9) || (keyCode == 190) || (keyCode == 39) || (keyCode == 37) || (keyCode == 43) || (allowdecimal && keyCode == 46))
                    return true;
                else
                    event.preventDefault();
            });

            ctrl.$formatters.unshift(function (a) { 
                return $filter(attrs.inputFormat)(ctrl.$modelValue ? ctrl.$modelValue : 0);
            });

            ctrl.$parsers.unshift(function (viewValue) {
                if (scope.defaultValue && !parseInt(viewValue)) { 
                    viewValue = scope.defaultValue;
                }
                var plainNumber = viewValue.replace(/[^\d|\.|\-]/g, '');
                plainNumber = plainNumber || 0;
                if (plainNumber == '') return;
                var dots = plainNumber.match(/\./g);
                var dotAF = plainNumber.match(/\.$/g);
                dots = (dots != null && dots.length == 1 && dotAF != null) ? '.' : '';
                var temp = $filter(attrs.inputFormat)(plainNumber);

                elem.val(temp + dots).trigger('change');

                return parseFloat(plainNumber);
            });
        }
    }
};
inputFormat.$inject = ['$filter'];
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

var UtilFactory = function ($rootScope, $timeout) {
    var service = {};
    service.InitArrayNoIndex = function (number) {
        var arr = new Array();
        for (var i = 1; i < number; i++) {
            arr.push(i);
        }
        return arr;
    };
    service.String = {};
    service.String.IsNullOrEmpty = function (str) {
        if (!str || str == null) {
            return true;
        }
        return false;
    };
    service.String.IsContain = function (strRoot, strRequest) {
        if (service.String.IsNullOrEmpty(strRoot)) {
            return false;
        }
        if (service.String.IsNullOrEmpty(strRequest)) {
            return true;
        }
        if (strRoot.indexOf(strRequest) < 0) {
            return false;
        }
        return true;
    };

    service.Alert = {};
    service.Alert.RequestError = function (e) {
        console.log(e);

        var strMessage = '';
        switch (e.status) {
            case 400:
                strMessage = 'Lỗi dữ liệu không hợp lệ';
                break;
            case 401:
                strMessage = 'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.';
                break;
            case 403:
                strMessage = 'Bạn không có quyền thực hiện thao tác này.';
                break;
            case 404:
                strMessage = 'URL action không chính xác';
                break;
            case 405:
                strMessage = 'phương thức không được chấp nhận';
                break;
            case 500:
                strMessage = 'lỗi hệ thống';
                break;
            case 502:
                strMessage = 'đường truyền kém';
                break;
            case 503:
                strMessage = 'dịch vụ không hợp lệ';
                break;
            case 504:
                strMessage = 'hết thời gian chờ';
                break;
            default:
                strMessage = 'Lỗi chưa xác định';
                break;
        }

        jAlert.Error(strMessage, 'Thông báo');
    };

    return service;
};

UtilFactory.$inject = ["$rootScope", "$timeout"];
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
var dateFormat = function ($filter) {
    return function (input, optional) {

        if (!input) {
            return "";
        }
        if (optional == undefined || optional == '') optional = "dd/MM/yyyy";
        var resultDate;

        if (input instanceof Date) {
            resultDate = input;
        } else {
            var temp = input.replace(/\//g, "").replace("(", "").replace(")", "").replace("Date", "").replace("+0700", "").replace("-0000", "");

            if (input.indexOf("Date") > -1) {
                resultDate = new Date(+temp);
            } else {
                resultDate = new Date(temp);
            }

            var utc = resultDate.getTime() + (resultDate.getTimezoneOffset() * 60000);

            // create new Date object for different city
            // using supplied offset
            var resultDate = new Date(utc + (3600000 * 7));
        }

        return $filter("date")(resultDate, optional);
    };
};
dateFormat.$inject = ["$filter"];
var trustHtml = function ($sce) {
    return function (input) {
        if (!input) {
            return "";
        }
        return $sce.trustAsHtml(input);
    };
};
trustHtml.$inject = ["$sce"];
var ifEmpty = function () {
    return function (input, defaultValue) {
        if (angular.isUndefined(input) || input === null || input === '' || input === 'Invalid date') {
            return defaultValue;
        }
        return input;
    }
};
var toFixedDecimal = function ($filter) {
    try {
        return function (value, optional) {
            if (!value)
                return 0;
            var decimal = value.toString().split('.')[1]; // 0 | 0123456
            if (decimal) {
                if (optional == undefined || optional == '') {
                    optional = decimal.length;
                }
                else {
                    decimal = decimal.toString().slice(0, optional);

                    for (var i = decimal.length; i > 0; i--) {
                        if (decimal.charAt(i - 1) != 0) {
                            break;
                        }
                        else {
                            decimal = decimal.substring(0, decimal.length - 1);
                        }
                    }
                    optional = decimal.length;
                }
                value = $filter('number')(parseFloat(value), optional);
            } else {
                value = $filter('number')(value);
            }
            return value;
        }
    } catch (e) {
        return 0;
    }
};
toFixedDecimal.$inject = ["$filter"];
var lstDependency = [];
lstDependency.push("ngRoute");
lstDependency.push("angular.filter");
//lstDependency.push("ngTagsInput");
//lstDependency.push("ngAnimate");

var MyApp = angular.module("MyApp", lstDependency);
////#region Khai báo Factories

var addFactory = function (name, factory) {
    try {
        MyApp.factory(name, factory);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}
//#region EWorking
addFactory("$localstorage", $localstorage);
addFactory("CommonFactory", CommonFactory);
addFactory("UtilFactory", UtilFactory);
addFactory("HelperFactory", HelperFactory);

//#endregion

//#endregion

//#region Khai báo Controllers

var addController = function (name, controller) {
    try {
        MyApp.controller(name, controller);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

//#region Index
addController("MasterPageController", MasterPageController);
//#endregion

//#region Khai báo Directives

var addDirective = function (name, directive) {
    try {
        MyApp.directive(name, directive);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}
addDirective("formatMoney", formatMoney);
addDirective("getWidth", getWidth);
addDirective("lazyLoad", lazyLoad);
addDirective("noInput", noInput);
addDirective("whenEnter", whenEnter);
addDirective("compile", compile);
addDirective("gridSort", gridSort);
addDirective("inputFormat", inputFormat);
addDirective("paginationStyle1", paginationStyle1);
//addDirective("exportData", exportData);

//addDirective("gridCheckBox", gridCheckBox);
//addDirective("gridCheckBoxVertical", gridCheckBoxVertical);
//addDirective("gridCheckBoxParent", gridCheckBoxParent);
//
//addDirective("gridCheckBoxProCat", gridCheckBoxProCat);
//addDirective("gridCheckBoxVerticalProCat", gridCheckBoxVerticalProCat);
//addDirective("gridCheckBoxParentProCat", gridCheckBoxParentProCat);
//addDirective("fileUpload", fileUpload);
//#endregion Khai báo Directives

//#region Khai báo Filters

var addFilter = function (name, filter) {
    try {
        MyApp.filter(name, filter);
    } catch (e) {
        console.log(JSON.stringify(e));
    }
}

addFilter("dateFormat", dateFormat);
addFilter("trustHtml", trustHtml);
addFilter("ifEmpty", ifEmpty);
addFilter("toFixedDecimal", toFixedDecimal);

//addFilter("dateTimeFormat", dateTimeFormat);
//addFilter("timeFormatStoreRent", timeFormatStoreRent);
//addFilter("trustHtml", trustHtml);
//addFilter("timeFormat", timeFormat);
//addFilter("propsFilter", propsFilter);
//addFilter("currency", currency);
//addFilter("tel", telFormat);
//addFilter("webstatus", webstatus);
//addFilter("shortenedName", shortenedName);
//addFilter("numberFormat", numberFormat);
//addFilter("numberSerialFormat", numberSerialFormat);
//addFilter("roundFloatNumber", roundFloatNumber);

//#endregion Khai báo Filters

//#region Khai báo hàm config (url nằm trong này)

//var configFunction = function ($routeProvider, $compileProvider) {
//    ////#region Khai báo URL
//    //var addURL = function (url, template, controller) {
//    //    try {
//    //        $routeProvider.when("/" + url, { templateUrl: template, controller: controller });
//    //    } catch (e) {
//    //        console.log(e);
//    //    }
//    //}

//    //var addEWorkingURL = function (url, template, controller) {
//    //    addURL(url, "/" + template, controller);
//    //}

//    ////#region Index

//    //addEWorkingURL("page1a", "Home/Page1A/", Page1AController);
//    //addEWorkingURL("page1b", "Home/Page1B/", Page1BController);

//    ////#endregion
//    //$routeProvider.otherwise({ redirectTo: "/page1a" });
//}

//configFunction.$inject = ["$routeProvider", "$compileProvider"];

//MyApp.config(configFunction);

MyAppSetConfig = {};
MyAppSetConfig.addURL = function (url, template, controller, routeProvider) {
    try {
        routeProvider.when("/" + url, { templateUrl: "/" + template, controller: controller });
    } catch (e) {
        console.log(e);
    }
}
MyAppSetConfig.Otherwise = function (DefaultURL, routeProvider) {
    routeProvider.otherwise({ redirectTo: "/" + DefaultURL });
}

//#endregion