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