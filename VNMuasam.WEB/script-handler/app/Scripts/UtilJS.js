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