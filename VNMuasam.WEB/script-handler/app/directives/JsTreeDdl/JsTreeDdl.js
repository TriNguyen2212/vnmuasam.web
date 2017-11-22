var jsTreeDdl = function ($http, $timeout) {
    return {
        restrict: "E",

        scope: {
            myroot: "=",
            treeData: "=",
            placeHolder: "=",
        },

        templateUrl: "/script-handler/app/directives/JsTreeDdl/jsTreeDdl.html",

        link: function (scope, element, attrs) {
            scope.attrs = attrs; 
            scope.myroot.TreeID = attrs.myroot.replace(".", "_");


            scope.myroot_IsSelectedAll_Onclick = function () {
                if (scope.myroot.IsCheckedAll) {
                    scope.myroot.element.jstree('check_all');
                }
                else {
                    scope.myroot.element.jstree('deselect_all');
                }
            };
            scope.myroot_ClearSelected_Onclick = function () {
                scope.myroot.element.jstree('deselect_all');
            };
            if (scope.myroot.CallBack) {
                if (scope.myroot.CallBack.OnHiddenBsDropdown) {
                    $(element[0].querySelector('.dropdown')).on('hidden.bs.dropdown', function () {
                        scope.myroot.CallBack.OnHiddenBsDropdown();
                    });
                }
            }
        }
    };
};

jsTreeDdl.$inject = ['$http', "$timeout"];