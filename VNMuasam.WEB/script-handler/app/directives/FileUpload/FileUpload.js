var fileUpload = function ($q, $timeout, CommonFactory, $localstorage) {
    return {
        restrict: 'A',
        transclude: true,

        scope: {
            root: "=",
            isMultipleFile: "=",
            isLoading: "="
        },
        template: '<ng-transclude></ng-transclude>',

        link: function (scope, element, attrs) { 
            function objFile() {
                this.IsDeleted = false,
                this.Base64 = '',
                this.Src = '',
                this.DataType = '',
                this.Http = new XMLHttpRequest(),
                this.FileInput = {},
                this.Percent = 0,
                this.FileName = ''
            };
            scope.root.LstFile = [];
            scope.btnOpenDialog = element[0].querySelector('.btnOpenDialog');
            scope.input = element[0].querySelector('.files');

            if (!scope.root.ActionUpload) {
                scope.root.ActionUpload = "/Directives/UploadFile/";
            }
            if (!scope.root.PathUpload) {
                scope.root.PathUpload = "/";
            }

            if (scope.btnOpenDialog) {
                scope.btnOpenDialog.addEventListener('click', function (e) {
                    $timeout(function () {
                        angular.element(scope.input).trigger('click');
                    });
                });
            }

            scope.input.addEventListener('change', function (e) {
                $timeout(function () {
                    var files = e.target.files;
                    if (files.length == 0) {
                        return;
                    }
                    if (!scope.root.IsMultipleFile) {
                        scope.root.LstFile = [];
                        if (files.length > 1) {
                            jAlert.Warning("Vui lòng up 1 file", 'Thông báo');
                            return;
                        }
                        if (files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            && files[0].type != "application/vnd.ms-excel") {
                            jAlert.Warning("Lỗi cập nhật sản phẩm từ Excel", 'Thông báo');
                            return;
                        }
                    }

                    for (var i = 0; i < files.length; i++) {
                        var objFileNew = new objFile();
                        objFileNew.FileInput = files[i];

                        objFileNew.FileName = files[i].name.normalize();
                        //objFileNew.FileName = UtilJS.String.RemoveUnicode(objFileNew.FileName);

                        if (scope.root.IsListenProgress) {
                            objFileNew.AlertNotFoundTimeout = false;
                            ListenProgress(objFileNew);
                            ListenStateChange(objFileNew);
                        }
                        scope.root.LstFile.push(objFileNew);

                        if (!scope.root.IsMultipleFile) {
                            scope.strAccesToken = $localstorage.getObject("UserPricinpal").AccessToken;
                            if (!scope.strAccesToken) {
                                jAlert.Error("Mã xác thực chưa được cấp, bạn vui lòng đăng nhập lại", 'Thông báo');
                                scope.root.API.ResetItem(objFileNew);
                                return;
                            }

                            scope.isLoading = true;
                            objFileNew.Http.open("POST", scope.root.ActionUpload, true);

                            objFileNew.Http.setRequestHeader("Content-Type", "multipart/form-data");

                            objFileNew.Http.setRequestHeader("FileName", objFileNew.FileInput.name);
                            objFileNew.Http.setRequestHeader("FileSize", objFileNew.FileInput.size);
                            objFileNew.Http.setRequestHeader("FileType", objFileNew.FileInput.type);
                            objFileNew.Http.setRequestHeader("SaveTo", scope.root.SaveTo);
                            objFileNew.Http.setRequestHeader("Authorization", 'Bearer ' + scope.strAccesToken);

                            objFileNew.Http.send(objFileNew.FileInput);
                        }
                    }
                }).then(function () {
                    angular.element(scope.input).val(null);
                });
            });

            scope.root.API = {}; 
            scope.root.API.ClearLstItem = function () {
                scope.root.LstFile = [];
            };

            scope.root.API.ResetItem = function (objFileNew) { 
                objFileNew.Percent = 0;
                objFileNew.FileName = '';
                objFileNew.FilePathSaved = '';
            };

            var ListenProgress = function (objFileNew) {
                objFileNew.Http.upload.addEventListener('progress', function (event) {
                    $timeout(function () {
                        fileLoaded = event.loaded; //Đã load được bao nhiêu
                        fileTotal = event.total; //Tổng cộng dung lượng cần load
                        fileProgress = parseInt((fileLoaded / fileTotal) * 100) || 0;
                        objFileNew.Percent = fileProgress;
                    }, 50);
                }, false);
            };
            var ListenStateChange = function (objFileNew) {
                objFileNew.Http.onreadystatechange = function (event) {
                    if (objFileNew.Http.readyState == 4 && objFileNew.Http.status == 200) {
                        $timeout(function () {
                            var response = JSON.parse(objFileNew.Http.responseText); 
                            if (response.Code != 200) {
                                objFileNew.Percent = 0;
                                objFileNew.FileName = '';
                                jAlert.Error("Upload file thất bại", 'Thông báo');
                                scope.isLoading = false;
                                return;
                            }
                            if (response.Code == 200 && response.Success) {
                                scope.isLoading = false;
                                objFileNew.Percent = 100; 
                                objFileNew.FilePathSaved = response.Data.PathFile;
                                //jAlert.Success("Upload file thành công.", 'Thông báo');
                            }

                            //objFileNew.Http.removeEventListener('progress', false);
                        }, 200);
                    }
                    else if (objFileNew.Http.readyState == 4 && objFileNew.Http.status != 200) { 
                        $timeout.cancel(objFileNew.AlertNotFoundTimeout);
                        objFileNew.AlertNotFoundTimeout = $timeout(function () {
                            if (objFileNew.Http.status == 404) { 
                                jAlert.Error("File bạn up không hợp lệ", 'Thông báo');
                            }
                            else if (objFileNew.Http.status == 0 || objFileNew.Http.status == 401) { 
                                jAlert.Warning("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại.");
                            }  
                            else { 
                                jAlert.Error("Lỗi status " + objFileNew.Http.status, 'Thông báo');
                                console.log(objFileNew.Http);
                            }
                            objFileNew.Percent = 0;
                            objFileNew.FileName = '';
                            scope.isLoading = false;
                            return;
                        }, 200);
                    } 
                    scope.$apply();
                }
            }; 
        } //link
    }; //return
};

fileUpload.$inject = ["$q", "$timeout", "CommonFactory", "$localstorage"];