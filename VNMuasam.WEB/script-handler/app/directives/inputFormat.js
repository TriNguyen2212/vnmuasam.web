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