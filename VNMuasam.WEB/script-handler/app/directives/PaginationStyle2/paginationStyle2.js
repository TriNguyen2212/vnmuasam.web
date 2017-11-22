var paginationStyle2 = function ($timeout) {
    return {
        restrict: "E",

        scope: {
            pager: "=",
            totalItems: "=",
            fnCallBack: "&"
        },
        templateUrl: "/script-handler/app/directives/PaginationStyle2/paginationStyle2.html",

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

            // service implementation

            function GetPager(TotalItems, CurrentPage, PageSize) {
                // default to first page
                CurrentPage = CurrentPage || 1;

                // default page size is 10
                PageSize = PageSize || 10;

                var StartPage, EndPage;
                if (scope.pager.TotalPages <= 10) {
                    // less than 10 total pages so show all
                    StartPage = 1;
                    EndPage = scope.pager.TotalPages;
                } else {
                    // more than 10 total pages so calculate start and end pages
                    if (CurrentPage <= 6) {
                        StartPage = 1;
                        EndPage = 10;
                    } else if (CurrentPage + 4 >= scope.pager.TotalPages) {
                        StartPage = scope.pager.TotalPages - 9;
                        EndPage = scope.pager.TotalPages;
                    } else {
                        StartPage = CurrentPage - 5;
                        EndPage = CurrentPage + 4;
                    }
                }

                // calculate start and end item indexes
                var StartIndex = (CurrentPage - 1) * PageSize;
                var EndIndex = Math.min(StartIndex + PageSize - 1, TotalItems - 1);

                // create an array of pages to ng-repeat in the pager control
                var Pages = [];
                for (var i = StartPage; i < EndPage + 1; i++) {
                    Pages.push(i);
                }

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
        }
    };
};

paginationStyle2.$inject = ["$timeout"];