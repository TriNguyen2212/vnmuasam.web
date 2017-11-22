var jsTree = function ($http, $timeout) {
    var treeDir = {
        restrict: 'EA',
        scope: {
            myroot: "=",
            treeData: "=",
            treeContextmenu: "=",
            treeTypes: "=",
            treeDnd: "=",
            treeCore: "=",
            treeEvents: "=",
            treeSearch: "=",
        },
        link: function (s, e, a) { // scope, element, attribute 
            var UpdateSelected = function (LstSelected) {
                try {
                    s.myroot.IDSelectedReady = true;

                    s.myroot.NodeResult.NameSelected = '';
                    s.myroot.NodeResult.IDSelected = [];

                    var i, j, r = [], v = [];
                    for (i = 0, j = LstSelected.length; i < j; i++) {
                        var node = s.myroot.element.jstree(true).get_node(LstSelected[i]);
                        r.push(node.text.trim());
                        v.push(node.id);
                    }

                    s.myroot.NodeResult.NameSelected = r.join(', ').trim();
                    s.myroot.NodeResult.IDSelected = v;

                    if (s.myroot.TreeData && s.myroot.NodeResult.IDSelected.length == s.myroot.TreeData.length) {
                        s.myroot.NodeResult.NameSelected = 'Tất cả';
                        s.myroot.IsCheckedAll = true;
                    }
                    else {
                        s.myroot.IsCheckedAll = false;
                    }

                    if (s.myroot.CallBack && s.myroot.CallBack.Changed_Jstree) {
                        s.myroot.CallBack.Changed_Jstree();
                    }
                } catch (e) {
                    debugger; 
                    throw e; 
                }
            };
            s.myroot.element = e;
            s.myroot.IsSearchActived = false;
            s.myroot.IsChkAllActived = false;
            s.myroot.NodeResult = {};
            s.myroot.NodeResult.NameSelected = '';
            s.myroot.NodeResult.IDSelected = [];
            s.myroot.IsSearchFound = true; 
            s.fetchResource = function (url, cb) {
                return $http.get(url).then(function (data) {
                    if (cb) cb(data.data);
                });
            };
            s.managePlugins = function (s, e, a, config) {
                if (a.treePlugins) {
                    config.plugins = a.treePlugins.split(',');
                    config.core = config.core || {};
                    config.core.check_callback = config.core.check_callback || true;

                    if (config.plugins.indexOf('state') >= 0) {
                        config.state = config.state || {};
                        config.state.key = a.treeStateKey;
                    }

                    if (config.plugins.indexOf('search') >= 0) {
                        if (!s.myroot.IsSearchActived) {
                            var to = false;

                            s.$watch("treeSearch", function (n, o) {
                                clearTimeout(to);
                                to = setTimeout(function () {
                                    if (!s.treeSearch) {
                                        s.treeSearch = "";
                                    }
                                    s.myroot.IsSearchFound = true;
                                    $(e).jstree(true).show_all();
                                    $(e).jstree('search',s.treeSearch);
                                }, 250);
                            }, true);
                            s.myroot.IsSearchActived = true;
                        }
                    }

                    if (config.plugins.indexOf('checkbox') >= 0) {
                        config.checkbox = config.checkbox || {};
                    }

                    if (config.plugins.indexOf('contextmenu') >= 0) {
                        if (a.treeContextmenu) {
                            config.contextmenu = s.treeContextmenu;
                        }
                    }

                    if (config.plugins.indexOf('types') >= 0) {
                        if (a.treeTypes) {
                            config.types = s.treeTypes;
                            console.log(config);
                        }
                    }

                    if (config.plugins.indexOf('dnd') >= 0) {
                        if (a.treeDnd) {
                            config.dnd = s.treeDnd;
                            console.log(config);
                        }
                    }

                    if (!s.myroot.IsChkAllActived) {
                        if (config.plugins.indexOf('chkall') >= 0) {
                            s.myroot.IsChkAllActived = true;
                            $(e).jstree('check_all'); 
                        }
                    }
                }
                return config;
            }; 
            s.manageEvents = function (s, e, a) {
                var IsEvChanged = false;
                if (a.treeEvents) {
                    angular.forEach(s.treeEvents, function (fn, key) {
                        var tree_event = key;
                        if (tree_event == "changed") {
                            IsEvChanged = true;
                        }
                        if (tree_event.indexOf('.') < 0) {
                            tree_event = tree_event + '.jstree';
                        }
                        s.myroot.treeconfig.on(tree_event, fn);
                    });
                }
                if (!IsEvChanged) {
                    s.myroot.treeconfig.on("ready.jstree", function (e, data) {
                        //if (s.myroot.TreeID == "PnDistributedOrder_ddlFilterStore") {
                        //    console.log("s.myroot.TreeID", s.myroot.TreeID);
                        //    console.log("s.myroot.IsSelectedAll", s.myroot.IsSelectedAll);
                        //}
                        s.InitElementStopClick();

                        //ktra neu cay đã load ready thì mới check sư kiện checkall
                        if (s.myroot.IsSelectedAll) {
                            s.myroot.element.jstree('check_all');
                        }
                        else if (s.myroot.IsLoadNodeSelected) {
                            s.myroot.API.LoadNodeSelected(); 
                        }

                        if (s.myroot.CallBack && s.myroot.CallBack.Ready_Jstree) {
                            s.myroot.CallBack.Ready_Jstree();
                        }
                    });
                    s.myroot.treeconfig.on("changed.jstree", function (e, data) {
                        //xu ly su kien on change
                        s.JStreeOnChangedTimeOut;
                        $timeout.cancel(s.JStreeOnChangedTimeOut);
                        s.JStreeOnChangedTimeOut = $timeout(function () { 
                            UpdateSelected(data.selected);
                        });
                    });
                    s.myroot.treeconfig.on("search.jstree", function (nodes, str, res) {                         
                        if (str.nodes.length === 0) {
                            $(e).jstree(true).hide_all();
                            s.myroot.IsSearchFound = false;
                        }
                    });
                }
            };
             
            s.myroot.API = {};
            s.myroot.API.LoadNodeSelected = function () {
                s.myroot.element.jstree('open_all'); 
                for (var i = 0; i < s.myroot.LoadLstNodeSelected.length; i++) {
                    var valueCheck = s.myroot.LoadLstNodeSelected[i];
                    s.myroot.element.find('ul li').each(function (i, o) {
                        var ID = $(o).attr('id');
                        if (valueCheck == ID) {
                            var NodeID = s.myroot.element.find('#' + ID);
                            if (!s.myroot.element.jstree('is_checked', NodeID)) { 
                                NodeID.find('>a.jstree-anchor').click();
                            }
                        }
                    });
                }
            };
            // hàm này để render lại item Name nào đã chọn lên textbox
            s.myroot.API.UpdateSelected = function () {
                UpdateSelected(s.myroot.element.jstree(true).get_selected());
            };
            s.init = function (s, e, a, config) {
                s.managePlugins(s, e, a, config);
                s.myroot.treeconfig = $(e).jstree(config);
                s.manageEvents(s, e, a);
            };
            s.InitElementStopClick = function () {
                if (s.myroot.IsRegInitElementStopClick) {
                    return;
                }
                s.myroot.IsRegInitElementStopClick = true;
                $(function () {
                    s.RootElement = $(e[0]).closest('.input-group');
                    s.ngHelpTrees = $(s.RootElement).find('.ngHelpTrees');
                    s.Inputdropdown_HelpTrees = $(s.RootElement).find('.dropdown_HelpTrees');
                    s.ngHelpTreesPlugins = $(s.RootElement).find('.ngHelpTreesPlugins');

                    s.searchInput_HelpTrees = $(s.RootElement).find('.searchInput_HelpTrees');

                    $(s.Inputdropdown_HelpTrees).on('click', function (e) {
                        $timeout(function () {
                            s.searchInput_HelpTrees[0].focus();
                        });
                    });
                    $(s.ngHelpTrees).each(function (i, o) {
                        $(o).on('click', function (e) {
                            e.stopPropagation();
                        });

                        span = $(o).parents('.input-group').children().eq(1);
                        $(span).click(function (e) {
                            e.stopPropagation();
                            $(this).parent().children().eq(0).children().children().eq(0).click();
                        });
                    });
                    $(s.ngHelpTreesPlugins).each(function (i, o) {
                        $(o).on('click', function (e) {
                            e.stopPropagation();
                        });
                    });
                });
            };

            $(function () {
                var config = {};
                // users can define 'core'
                config.core = {};

                config.search = {
                    "case_insensitive": true,
                    "show_only_matches": true,
                    "show_only_matches_children": true
                };

                if (a.treeCore) {
                    config.core = $.extend(config.core, s.treeCore);
                }

                // clean Case
                a.treeDataType = a.treeDataType ? a.treeDataType.toLowerCase() : 'scope';
                a.treeSrc = a.treeSrc ? a.treeSrc.toLowerCase() : '';

                if (a.treeDataType == 'html') {
                    s.fetchResource(a.treeSrc, function (data) {
                        e.html(data);
                        s.init(s, e, a, config);
                    });
                }
                else if (a.treeDataType == 'json') {
                    s.fetchResource(a.treeSrc, function (data) {
                        config.core.data = data;
                        s.init(s, e, a, config);
                    });
                }
                else if (a.treeDataType == 'scope') {
                    $timeout(function () {
                        s.$watch("treeData", function (n, o) {
                            if (n) {
                                config.core.data = s.treeData;
                                $(e).jstree('destroy');
                                s.init(s, e, a, config);
                            }
                        }, true);

                        config.core.data = s.treeData;
                        s.init(s, e, a, config);
                    });
                }
                else if (a.treeAjax) {
                    config.core.data = {
                        'url': a.treeAjax,
                        'data': function (node) {
                            return {
                                'id': node.id != '#' ? node.id : 1
                            };
                        }
                    };
                    s.init(s, e, a, config);
                }
            });
        }
    };

    return treeDir;
};

jsTree.$inject = ['$http', "$timeout"];
