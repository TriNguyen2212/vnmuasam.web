//TypeSearch
//: All=null, Employee=1, Supplier=2

var userSearchModal = function ($http, $timeout, $filter, $rootScope, CommonFactory, UtilFactory) {
    return {
        restrict: 'E',

        scope: {
            myroot: "="
        },

        templateUrl: "/script-handler/app/directives/UC/UserSearchModal/UserSearchModal.html",

        link: function (scope, element, attrs) {
            if (!scope.myroot) {
                scope.myroot = {
                    Core: {},
                    CallBack: {},
                    API: {}
                };
            }
            if (!scope.myroot.CallBack) {
                scope.myroot.CallBack = {};
            }
            if (!scope.myroot.Core) {
                scope.myroot.Core = {};
            }
            if (!scope.myroot.API) {
                scope.myroot.API = {};
            }
            if (!scope.myroot.Core.UserTypeSearch) {
                scope.myroot.Core.UserTypeSearch = '';
            }

            scope.PnUserSearchModal = { btnSearch: {} };
            scope.PnUserSearchModal.Lst = [];
            scope.PnUserSearchModal.txtSearch = { Text: '' };
            scope.PnUserSearchModal.Pager = { TotalItems: 0, PageSize: 10, CurrentPage: 1 };
            scope.PnUserSearchModal.CustomFilter = function (item) {
                if (scope.PnUserSearchModal.txtSearch.Text) {
                    if (!UtilJS.String.IsContain(item.Username, scope.PnUserSearchModal.txtSearch.Text)
                        && !UtilJS.String.IsContain(item.FullName, scope.PnUserSearchModal.txtSearch.Text)
                        && !UtilJS.String.IsContain(item.PositionName, scope.PnUserSearchModal.txtSearch.Text)
                        && !UtilJS.String.IsContain(item.DepartmentName, scope.PnUserSearchModal.txtSearch.Text)) {
                        return false;
                    }
                }
                if (item.Username == null) {
                    return false;
                }
                return true;
            };

            scope.PnUserSearchModal.btnSearch.OnClick = function (intPage) {
                if (scope.PnUserSearchModal.Lst.length == 0) {
                    //xu ly data all thì post len server
                    $rootScope.MasterPage.IsLoading = true;
                    var url = "/Directives/GetUser/";
                    dataSend = {};
                    dataSend.UserTypeSearch = scope.myroot.Core.UserTypeSearch;

                    CommonFactory.PostDataAjax(url, dataSend,
                        function (beforeSend) { },
                        function (response) {
                            if (response.objCodeStep.Status == 'Error') {
                                jAlert.Error(response.objCodeStep.Message);
                                $rootScope.MasterPage.IsLoading = false;
                                return;
                            }
                            if (response.objCodeStep.Status == 'Success') {
                                scope.PnUserSearchModal.Lst = response.Lst;
                                scope.PnUserSearchModal.Pager.CurrentPage = 1;
                                $rootScope.MasterPage.IsLoading = false;
                            }
                            scope.myroot.API.ShowModal();
                        },
                        function (error) {
                            $rootScope.MasterPage.IsLoading = false;
                            scope.myroot.API.HideModal();
                            return;
                        }
                    );
                }
                else {
                    intPage = !intPage ? 1 : intPage;
                    scope.PnUserSearchModal.Pager.CurrentPage = intPage;
                }
            };
            scope.PnUserSearchModal.ChooseUser = function (item) {
                scope.myroot.CallBack.ChoosedItem(item);
            };
            scope.myroot.Core.txtSearch = scope.PnUserSearchModal.txtSearch;

            scope.myroot.API.ShowModal = function () {
                $(element[0].querySelector('.PnUserSearchModal')).modal('show');
            };
            scope.myroot.API.Search = function () {
                if (scope.PnUserSearchModal.Lst.length > 0) {
                    scope.myroot.API.ShowModal();
                }
                scope.PnUserSearchModal.btnSearch.OnClick(1);
            };
            scope.myroot.API.HideModal = function () {
                $(element[0].querySelector('.PnUserSearchModal')).modal('hide');
            };
            if (scope.myroot.CallBack.OnHiddenBsModal) {
                $(element[0].querySelector('.PnUserSearchModal')).on("hidden.bs.modal", function () {
                    scope.myroot.CallBack.OnHiddenBsModal();
                    if ($('.modal:visible').length) {
                        $('body').addClass('modal-open');
                    }
                });
            }
        }
    };
};

userSearchModal.$inject = ["$http", "$timeout", "$filter", "$rootScope", "CommonFactory", "UtilFactory"];

$('.modal').on('hidden.bs.modal', function () {
    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
});