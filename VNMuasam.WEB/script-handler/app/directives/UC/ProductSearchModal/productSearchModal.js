var productSearchModal = function ($http, $timeout, $filter, $rootScope, CommonFactory) {
    return {
        restrict: 'E',

        scope: {
            myroot: "="
        },

        templateUrl: "/script-handler/app/directives/UC/ProductSearchModal/OSProductSearchModal.html",

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
            scope.myroot.Core.IsInitData = true;

            scope.myroot.Core.TotalColumn = 5;
            scope.myroot.Core.IsShowQuanity = false;

            if (!scope.myroot.Core.ActionURL) {
                scope.myroot.Core.ActionURL = "/Directives/UCProductsSearch";
            }
            if (scope.myroot.Core.ActionURL == "/Directives/UCIvenCenterStocksSearch") {
                scope.myroot.Core.TotalColumn = 6;
                scope.myroot.Core.IsShowQuanity = true;
            }

            if (!scope.myroot.Core.PopupType) {
                scope.myroot.Core.PopupType = "Single";
            }
            if (scope.myroot.Core.PopupType == "Single") {
                scope.myroot.Core.TotalColumn = scope.myroot.Core.TotalColumn--;
            }

            scope.myroot.Lst = [];
            scope.myroot.txtSearch = { Text: '' };
            scope.myroot.btnSearch = {};
            scope.myroot.btnAdd = {};


            scope.myroot.ddlUserProductCategory = { IDSelectedTimeOut: false, IsSelectedAll: false };
            scope.myroot.ddlUserProductCategory.core = {
                themes: {
                    icons: false
                }
            };

            if (scope.myroot.Core.IsInitData && scope.myroot.Core.LstUserProductCategoryTree) {
                scope.myroot.ddlUserProductCategory.TreeData = scope.myroot.Core.LstUserProductCategoryTree;
                scope.myroot.Core.IsInitData = false;
            }

            scope.myroot.Pager = { TotalItems: 0, PageSize: 10, CurrentPage: 1 };
            scope.myroot.CustomFilter = function (item) {
                return true;
            };
            scope.myroot.btnSearch.OnClick = function (intPage) {
                if (scope.myroot.ddlUserProductCategory.NodeResult.IDSelected.length == 0) {
                    jAlert.Warning("Vui lòng chọn ngành hàng", "Thông báo");
                    return;
                }
                intPage = !intPage ? 1 : intPage;

                $rootScope.MasterPage.IsLoading = true;
                dataSend = {
                    intPage: intPage,
                    strKeyWord: scope.myroot.txtSearch.Text,
                    LstCategoryID: scope.myroot.ddlUserProductCategory.NodeResult.IDSelected
                };
                if (scope.myroot.Core.ActionURL == "/Directives/UCIvenCenterStocksSearch") {
                    dataSend.Stocktype = scope.myroot.Core.Stocktype;
                }

                CommonFactory.PostDataAjax(scope.myroot.Core.ActionURL, dataSend,
                    function (beforeSend) { },
                    function (response) {
                        $timeout(function () {
                            $rootScope.MasterPage.IsLoading = false;
                            if (response.objCodeStep.Status == 'Error') {
                                jAlert.Error(response.objCodeStep.Message, 'Thông báo');
                                return;
                            }
                            if (response.objCodeStep.Status == 'Success') {
                                scope.myroot.Lst = response.LstProduct;
                                scope.myroot.Pager.TotalItems = response.TotalItems;
                                scope.myroot.Pager.CurrentPage = intPage;
                            }
                        }, 100);
                    },
                    function (error) {
                        $rootScope.MasterPage.IsLoading = false;
                        return;
                    }
                );
            };

            scope.myroot.ChoosedProduct = function (item) {
                scope.myroot.CallBack.ChoosedItem(item);
            };

            scope.myroot.btnAdd.OnClick = function () {
                var LstSelected = $filter("filter")(scope.myroot.Lst, { IsChecked_: true }) || [];
                scope.myroot.CallBack.ChoosedItems(LstSelected);
            };

            scope.myroot.API.ShowModal = function () {
                if (scope.myroot.Core.IsInitData && scope.myroot.Core.LstUserProductCategoryTree) {
                    scope.myroot.ddlUserProductCategory.TreeData = scope.myroot.Core.LstUserProductCategoryTree;
                    scope.myroot.Core.IsInitData = false;
                }
                $(element[0].querySelector('.PnSupplierSearchModal')).modal('show');
            };
            scope.myroot.API.Search = function () {
                scope.myroot.Lst = [];
                scope.myroot.btnSearch.OnClick(1);
            };
            scope.myroot.API.HideModal = function () {
                $(element[0].querySelector('.PnSupplierSearchModal')).modal('hide');
            };
            scope.myroot.API.ResetModal = function () {
                scope.myroot.txtSearch.Text = '';
                scope.myroot.Lst = [];
                scope.myroot.ddlUserProductCategory.element.jstree('deselect_all');
            };
        }
    };
};

productSearchModal.$inject = ["$http", "$timeout", "$filter", "$rootScope", "CommonFactory"];