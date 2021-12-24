import moment from "moment";
import SoundPlayer from 'react-native-sound-player'

  var _onFinishedPlayingSubscription = null
  var _onFinishedLoadingSubscription = null
  var _onFinishedLoadingFileSubscription = null
  var _onFinishedLoadingURLSubscription = null

const Utils = {

    reduxFormValid: {
        normalize: {
            number: (value, previousValue, allValues) => {
                return isNaN(value) ? previousValue : value
            }
        }
    },
    objectValid: {
        languageMessage: {
            required: 'This field({0}) is required.',
            number: 'Please enter({0}) a valid number.',
            digits: "Please enter({0}) only digits.",
            equalTo: "Please enter({0}) the same value({1}) again.",
            maxlength: "Please enter({0}) no more than {1} characters.",
            minlength: "Please enter({0}) at least {1} characters.",
            rangelength: "Please enter({0}) a value between {1} and {2} characters long.",
            min: "Please enter({0}) a value greater than or equal to {1}.",
            minStrict: "Please enter({0}) a value greater than or equal to {1}.",
            max: "Please enter({0}) a value less than or equal to {1}.",
            maxStrict: "Please enter({0}) a value less than or equal to {1}.",
            range: "Please enter({0}) a value between {1} and {2}.",
            email: "Please enter({0}) a valid email address.",
            phoneVN: "Please enter({0}) a valid phone.",
            url: "Please enter({0}) a valid URL.",
            date: "Please enter({0}) a valid date.",
            dateISO: "Please enter({0}) a valid date (ISO).",
            selectNotNull: "This field({0}) is required.",
        },
        languageMessage_vi: {
            required: 'Yêu cầu bắt buộc nhập({0}).',
            number: 'Hãy nhập ({0}) một số hợp lệ.',
            digits: "Hãy nhập chữ số({0}).",
            equalTo: "Hãy nhập({0}) thêm lần nữa({1}).",
            maxlength: "Hãy nhập({0}) từ {1} kí tự trở xuống.",
            minlength: "Hãy nhập({0}) từ {1} kí tự trở lên.",
            rangelength: "Hãy nhập({0}) từ {1} đến {2} kí tự.",
            min: "Hãy nhập({0}) từ {1} trở lên.",
            minStrict: "Hãy nhập({0}) từ {1} trở lên.",
            max: "Hãy nhập({0}) từ {1} trở xuống.",
            maxStrict: "Hãy nhập({0}) từ {1} trở xuống.",
            range: "Hãy nhập({0}) từ {1} đến {2}.",
            email: "Hãy nhập ({0}) một địa chỉ email hợp lệ.",
            phoneVN: "Hãy nhập({0}) hợp lệ.",
            url: "Vui lòng nhập ({0}) một URL hợp lệ.",
            date: "Hãy nhập({0}) hợp lệ.",
            dateISO: "Hãy nhập({0}) ngày (ISO).",
            selectNotNull: "Yêu cầu bắt buộc nhập({0}).",
            lessThan: "Hãy nhập ({0}) < ({1}).",
            lessThanOrEqual: "Hãy nhập ({0}) <= ({1}).",
            greaterThan: "Hãy nhập ({0}) > ({1}).",
            greaterThanOrEqual: "Hãy nhập ({0}) >= ({1}).",
            lessDate: "Hãy nhập ({0}) trước ({1}).",
            lessDateOrEqual: "Hãy nhập ({0}) từ ({1}) về trước.",
            greaterDate: "Hãy nhập ({0}) sau ({1}).",
            greaterDateOrEqual: "Hãy nhập ({0}) từ ({1}) về sau.",
            lessDateWith: "Hãy nhập ({0}) trước ({1}).",
            lessDateOrEqualWith: "Hãy nhập ({0}) từ ({1}) về trước.",
            greaterDateWith: "Hãy nhập ({0}) sau ({1}).",
            greaterDateOrEqualWith: "Hãy nhập ({0}) từ ({1}) về sau.",
        },
        'languageMessage_redux-form': {
            required: 'Yêu cầu bắt buộc nhập.',
            number: 'Hãy nhập một số hợp lệ.',
            digits: "Hãy nhập chữ số.",
            equalTo: "Hãy nhập({0}) thêm lần nữa({1}).",
            maxlength: "Hãy nhập từ {1} kí tự trở xuống.",
            minlength: "Hãy nhập từ {1} kí tự trở lên.",
            rangelength: "Hãy nhập từ {1} đến {2} kí tự.",
            min: "Hãy nhập từ {1} trở lên.",
            minStrict: "Hãy nhập từ {1} trở lên.",
            max: "Hãy nhập từ {1} trở xuống.",
            maxStrict: "Hãy nhập từ {1} trở xuống.",
            range: "Hãy nhập từ {1} đến {2}.",
            email: "Hãy nhập một địa chỉ email hợp lệ.",
            phoneVN: "Hãy nhập hợp lệ.",
            url: "Vui lòng nhập một URL hợp lệ.",
            date: "Hãy nhập hợp lệ.",
            dateISO: "Hãy nhập ngày (ISO).",
            selectNotNull: "Yêu cầu bắt buộc nhập.",
            lessThan: "Hãy nhập ({0}) < ({1}).",
            lessThanOrEqual: "Hãy nhập ({0}) <= ({1}).",
            greaterThan: "Hãy nhập ({0}) > ({1}).",
            greaterThanOrEqual: "Hãy nhập ({0}) >= ({1}).",
            lessDate: "Hãy nhập trước {1}.",
            lessDateOrEqual: "Hãy nhập từ ({1}) về trước.",
            greaterDate: "Hãy nhập sau ({1}).",
            greaterDateOrEqual: "Hãy nhập từ ({1}) về sau.",
            lessDateWith: "Hãy nhập trước ({1}).",
            lessDateOrEqualWith: "Hãy nhập từ ({1}) về trước.",
            greaterDateWith: "Hãy nhập sau ({1}).",
            greaterDateOrEqualWith: "Hãy nhập từ ({1}) về sau.",
        },
        extendRule: [],
        lan: 'vi',
        valid: function (data, rules, options) {
            options = options == null ? {} : options;
            var language = options.lan != null ? options.lan : this.lan != null ? this.lan : '';
            var defaultMessage = this["languageMessage_" + language];
            var pushMess = function (key, value, message, value1) {
                _return.push({
                    field: key,
                    value: value,
                    message: message
                });
            }

            var _return = [];
            rules = rules || {};
            for (var key in rules) {
                var rule = rules[key];
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                var displayName = rule.displayName || key;
                var value = data[key];
                if (rule.required != null) {
                    var required;
                    if (typeof (rule.required) === 'function') {
                        try {
                            required = eval(rule.required)(value, data, rules);
                            // if (required) value = '';
                        }
                        catch (ex) {
                            required = eval(rule.required);
                        }
                    }
                    else if (typeof (rule.required) == "boolean") {
                        required = rule.required;
                    }
                    else if (typeof (rule.required) == "object" && rule.required.constructor == Object && rule.required.valid != null) {
                        if (typeof (rule.required.valid) == "function") {
                            try {
                                required = eval(rule.required.valid)(value);
                            }
                            catch (ex) {
                                required = eval(rule.required.valid);
                            }
                        }
                        else if (typeof (rule.required.valid) == "boolean") {
                            required = rule.required.valid;
                        }
                    }
                    if ((value == null || value == 'null' || value === '' || (value != null && value.constructor == Date ? value.getFullYear() < 10 : value < 0)) && required) {
                        var message = rule.required.constructor == Object && rule.required.message != null ? rule.required.message : (rule.message || defaultMessage["required"].format(displayName));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                var nullOrDefault = function (a, b) {
                    return a != null ? a : b;
                }

                var getRuleObj = function (rule) {
                    if (typeof (rule) == "object" && rule.constructor == Object && rule.valid != null) {
                        return {
                            ...rule,
                            valid: typeof (rule.valid) == "function" ? rule.valid(data, rule) : rule.valid,
                            message: function (ruleConfig) {
                                if (typeof (rule.message) == "string") {
                                    return rule.message;
                                }
                                else if (typeof (rule.message) == "function") {
                                    return rule.message(arguments);
                                }
                                return null;
                            }
                        }
                    }
                    return {
                        message: function () {
                            return null;
                        }
                    };
                }

                if (rule.number != null) {
                    var _rule = getRuleObj(rule.number);
                    if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) == (_rule.valid || rule.number)) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["number"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.digits != null) {
                    var _rule = getRuleObj(rule.digits);
                    if (!/^\d+$/.test(value) == (_rule.valid || rule.digits)) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["digits"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.equalTo != null) {
                    var _rule = getRuleObj(rule.equalTo);
                    var value1 = (_rule.valid || rule.equalTo);
                    if (value1 != value) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["equalTo"].format(displayName, (_rule.valid || rule.equalTo));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.maxlength != null) {
                    if (value == null)
                        continue
                    var _rule = getRuleObj(rule.maxlength);
                    // var length = Utils.jQuery.isArray(value) ? value.length : typeof (value) == 'string' ? value.length : 0;
                    if (value == null) continue;
                    var length = value.length;
                    if (nullOrDefault(_rule.valid, rule.maxlength) < length && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["maxlength"].format(displayName, (_rule.valid || rule.maxlength));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.minlength != null) {
                    if (value == null)
                        continue
                    var _rule = getRuleObj(rule.minlength);
                    // var length = Utils.jQuery.isArray(value) ? value.length : typeof (value) == 'string' ? value.length : 0;
                    if (value == null) continue;
                    var length = value.length;
                    if (nullOrDefault(_rule.valid, rule.minlength) > length && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["minlength"].format(displayName, (_rule.valid || rule.minlength));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.rangelength != null) {
                    var _rule = getRuleObj(rule.rangelength);
                    var rangelength1 = _rule.valid != null ? rule.valid[0] : rule.rangelength[0];
                    var rangelength2 = _rule.valid != null ? rule.valid[1] : rule.rangelength[1];
                    var length = Utils.jQuery.isArray(value) ? value.length : typeof (value) == 'string' ? value.length : 0;
                    if ((rangelength1 > length || rangelength2 < length) && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["rangelength"].format(displayName, rangelength1, rangelength2);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.min != null) {
                    value = eval(value);
                    var _rule = getRuleObj(rule.min);
                    if (nullOrDefault(_rule.valid, rule.min) > value && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["min"].format(displayName, (_rule.valid || rule.min));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.minStrict != null) {
                    value = eval(value);
                    var _rule = getRuleObj(rule.minStrict);
                    if (nullOrDefault(_rule.valid, rule.minStrict) >= value && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["minStrict"].format(displayName, (_rule.valid || rule.minStrict));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.max != null) {
                    value = eval(value);
                    var _rule = getRuleObj(rule.max);
                    if (nullOrDefault(_rule.valid, rule.max) < value && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["max"].format(displayName, (_rule.valid || rule.max));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.maxStrict != null) {
                    value = eval(value);
                    var _rule = getRuleObj(rule.maxStrict);
                    if (nullOrDefault(_rule.valid, rule.maxStrict) < value && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["maxStrict"].format(displayName, (_rule.valid || rule.maxStrict));
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.range != null) {
                    var _rule = getRuleObj(rule.range);
                    var range1 = _rule.valid != null ? rule.valid[0] : rule.range[0];
                    var range2 = _rule.valid != null ? rule.valid[1] : rule.range[1];
                    if ((range2 < value || range1 > value) && value != null) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["range"].format(displayName, range1, range2);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.email != null) {
                    if ((value || '').trim() != '') {
                        var _rule = getRuleObj(rule.email);
                        if (nullOrDefault(_rule.valid, rule.email) == !/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)) {
                            var message = _rule.message(rule, value) || rule.message || defaultMessage["email"].format(displayName);
                            pushMess(key, value, message);
                            continue;
                        }
                    }
                }

                if (rule.phoneVN != null) {
                    var _rule = getRuleObj(rule.phoneVN);
                    if (!/(03[2|3|4|5|6|7|8|9]|05[2|6|8|9]|06[7]|07[0|6|7|8|9]|08[1|2|3|4|5|6|8|9]|09[0|1|2|3|4|6|7|8|9])+([0-9]{7})\b/.test(value)) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["phoneVN"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.url != null) {
                    var _rule = getRuleObj(rule.url);
                    if (nullOrDefault(_rule.valid, rule.url) == !/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["url"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.date != null) {
                    var _rule = getRuleObj(rule.date);
                    var _value = typeof (rule.date) == 'object' ? _rule.valid : value;
                    _value = _value || '';
                    if (/Invalid|NaN/.test(new Date(_value).toString())) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["date"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.dateISO != null) {
                    var _rule = getRuleObj(rule.dateISO);
                    if (nullOrDefault(_rule.valid, rule.dateISO) == !/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value)) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["dateISO"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.selectNotNull != null) {
                    var _rule = getRuleObj(rule.selectNotNull);
                    if (nullOrDefault(_rule.valid, rule.selectNotNull) >= value) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["selectNotNull"].format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                if (rule.lessThanOrEqual != null) {
                    var num1 = parseFloat(value);
                    var num2 = parseFloat(data[rule.lessThanOrEqual]);
                    if (num1 == null || num2 == null)
                        continue;
                    else if (num1 > num2) {
                        var _rule = getRuleObj(rule.lessThanOrEqual);
                        var rule2 = rules[rule.lessThanOrEqual]
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["lessThanOrEqual"].format(displayName, rule2.displayName || rule.lessThanOrEqual);
                        pushMess(key, value, message);
                    }
                }

                if (rule.greaterThanOrEqual != null) {
                    var num1 = parseFloat(value);
                    var num2 = parseFloat(data[rule.greaterThanOrEqual]);
                    if (num1 == null || num2 == null)
                        continue;
                    else if (num1 < num2) {
                        var _rule = getRuleObj(rule.greaterThanOrEqual);
                        var rule2 = rules[rule.greaterThanOrEqual]
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["greaterThanOrEqual"].format(displayName, rule2.displayName || rule.greaterThanOrEqual);
                        pushMess(key, value, message);
                    }
                }

                if (rule.lessThan != null) {
                    var num1 = parseFloat(value);
                    var num2 = parseFloat(data[rule.lessThan]);
                    if (num1 == null || num2 == null)
                        continue;
                    else if (num1 >= num2) {
                        var _rule = getRuleObj(rule.lessThan);
                        var rule2 = rules[rule.lessThan]
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["lessThan"].format(displayName, rule2.displayName || rule.lessThan);
                        pushMess(key, value, message);
                    }
                }

                if (rule.greaterThan != null) {
                    var num1 = parseFloat(value);
                    var num2 = parseFloat(data[rule.greaterThan]);
                    if (num1 == null || num2 == null)
                        continue;
                    else if (num1 <= num2) {
                        var _rule = getRuleObj(rule.greaterThan);
                        var rule2 = rules[rule.greaterThan]
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["greaterThan"].format(displayName, rule2.displayName || rule.greaterThan);
                        pushMess(key, value, message);
                    }
                }

                if (rule.lessDate != null && value != null) {
                    /*
                        **with value is date
                        lessDate = true;
                        lessDate = new Date()
                        **with value is string
                        lessDate = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with date,
                            compareFormat: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.lessDate);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate())) {
                        continue;
                    }
                    var compare = rule.lessDate === true ? new Date() : (_rule.compareWith || rule.lessDate);
                    if (moment(compare).isSameOrBefore(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["lessDate"].format(displayName, moment(compare).format(_rule.compareFormat || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.lessDateOrEqual != null && value != null) {
                    /*
                        **with value is date
                        lessDateOrEqual = true;
                        lessDateOrEqual = new Date()
                        **with value is string
                        lessDateOrEqual = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with date,
                            compareFormat: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.lessDateOrEqual);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate())) {
                        continue;
                    }
                    var compare = rule.lessDateOrEqual === true ? new Date() : (_rule.compareWith || rule.lessDateOrEqual);
                    if (moment(compare).isBefore(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["lessDateOrEqual"].format(displayName, moment(compare).format(_rule.compareFormat || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.greaterDate != null && value != null) {
                    /*
                        **with value is date
                        greaterDate = true;
                        greaterDate = new Date()
                        **with value is string
                        greaterDate = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with date,
                            compareFormat: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.greaterDate);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate())) {
                        continue;
                    }
                    var compare = rule.greaterDate === true ? new Date() : (_rule.compareWith || rule.greaterDate);
                    if (moment(compare).isSameOrAfter(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["greaterDate"].format(displayName, moment(compare).format(_rule.compareFormat || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.greaterDateOrEqual != null && value != null) {
                    /*
                        **with value is date
                        greaterDateOrEqual = true;
                        greaterDateOrEqual = new Date()
                        **with value is string
                        greaterDateOrEqual = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with date,
                            compareFormat: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.greaterDateOrEqual);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate())) {
                        continue;
                    }
                    var compare = rule.greaterDateOrEqual === true ? new Date() : (_rule.compareWith || rule.greaterDateOrEqual);
                    if (moment(compare).isAfter(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["greaterDateOrEqual"].format(displayName, moment(compare).format(_rule.compareFormat || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.lessDateWith != null && value != null) {
                    /*
                        **with value is date
                        lessDateWith = true;
                        lessDateWith = new Date()
                        **with value is string
                        lessDateWith = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with field,
                            compareFormatConvert: - compare format display,
                            compareFormatDisplay: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.lessDateWith);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    var compare = rule.lessDateWith.constructor == String ? data[rule.lessDateWith] : _rule.compareWith != null ? data[_rule.compareWith] : null;
                    compare = moment(compare, compare != null && compare.constructor == String ? (_rule.compareFormatConvert || 'MM/DD/YYYY') : null);
                    var compareDisplayName = rule.lessDateWith.constructor == String ? rules[rule.lessDateWith].displayName : _rule.compareWith != null ? rules[_rule.compareWith].displayName : null;

                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate()) || compare.toDate() == 'Invalid Date' || !moment.isDate(compare.toDate())) {
                        continue;
                    }
                    if (moment(compare).isSameOrBefore(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["lessDateWith"].format(displayName, compareDisplayName || moment(compare).format(_rule.compareFormatDisplay || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.lessDateOrEqualWith != null && value != null) {
                    /*
                        **with value is date
                        lessDateOrEqualWith = true;
                        lessDateOrEqualWith = new Date()
                        **with value is string
                        lessDateOrEqualWith = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with field,
                            compareFormatConvert: - compare format display,
                            compareFormatDisplay: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.lessDateOrEqualWith);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    var compare = rule.lessDateOrEqualWith.constructor == String ? data[rule.lessDateOrEqualWith] : _rule.compareWith != null ? data[_rule.compareWith] : null;
                    compare = moment(compare, compare != null && compare.constructor == String ? (_rule.compareFormatConvert || 'MM/DD/YYYY') : null);
                    var compareDisplayName = rule.lessDateOrEqualWith.constructor == String ? rules[rule.lessDateOrEqualWith].displayName : _rule.compareWith != null ? rules[_rule.compareWith].displayName : null;

                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate()) || compare.toDate() == 'Invalid Date' || !moment.isDate(compare.toDate())) {
                        continue;
                    }
                    if (moment(compare).isBefore(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["lessDateOrEqualWith"].format(displayName, compareDisplayName || moment(compare).format(_rule.compareFormatDisplay || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.greaterDateWith != null && value != null) {
                    /*
                        **with value is date
                        greaterDateWith = true;
                        greaterDateWith = new Date()
                        **with value is string
                        greaterDateWith = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with field,
                            compareFormatConvert: - compare format display,
                            compareFormatDisplay: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.greaterDateWith);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    var compare = rule.greaterDateWith.constructor == String ? data[rule.greaterDateWith] : _rule.compareWith != null ? data[_rule.compareWith] : null;
                    compare = moment(compare, compare != null && compare.constructor == String ? (_rule.compareFormatConvert || 'MM/DD/YYYY') : null);
                    var compareDisplayName = rule.greaterDateWith.constructor == String ? rules[rule.greaterDateWith].displayName : _rule.compareWith != null ? rules[_rule.compareWith].displayName : null;

                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate()) || compare.toDate() == 'Invalid Date' || !moment.isDate(compare.toDate())) {
                        continue;
                    }
                    if (moment(compare).isSameOrAfter(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["greaterDateWith"].format(displayName, compareDisplayName || moment(compare).format(_rule.compareFormatDisplay || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.greaterDateOrEqualWith != null && value != null) {
                    /*
                        **with value is date
                        greaterDateOrEqualWith = true;
                        greaterDateOrEqualWith = new Date()
                        **with value is string
                        greaterDateOrEqualWith = {
                            valid: true,
                            format: 'MM/DD/YYYY' - format convert value
                            compareWith: - compare with field,
                            compareFormatConvert: - compare format display,
                            compareFormatDisplay: - compare format display,
                            compareType: 'day | month | year'
                        }
                    */
                    var _rule = getRuleObj(rule.greaterDateOrEqualWith);

                    var dateValue = moment(value, value.constructor == String ? (_rule.format || 'MM/DD/YYYY') : null);
                    var compare = rule.greaterDateOrEqualWith.constructor == String ? data[rule.greaterDateOrEqualWith] : _rule.compareWith != null ? data[_rule.compareWith] : null;
                    compare = moment(compare, compare != null && compare.constructor == String ? (_rule.compareFormatConvert || 'MM/DD/YYYY') : null);
                    var compareDisplayName = rule.greaterDateOrEqualWith.constructor == String ? rules[rule.greaterDateOrEqualWith].displayName : _rule.compareWith != null ? rules[_rule.compareWith].displayName : null;

                    if (dateValue.toDate() == 'Invalid Date' || !moment.isDate(dateValue.toDate()) || compare.toDate() == 'Invalid Date' || !moment.isDate(compare.toDate())) {
                        continue;
                    }
                    if (moment(compare).isAfter(dateValue, _rule.compareType || 'day')) {
                        var message = _rule.message(rule, value) || rule.message || defaultMessage["greaterDateOrEqualWith"].format(displayName, compareDisplayName || moment(compare).format(_rule.compareFormatDisplay || 'MM/DD/YYYY'));
                        pushMess(key, value, message);
                    }
                }

                if (rule.custom != null) {
                    var _rule = getRuleObj(rule.custom);
                    var valid = false;
                    var message = '';
                    if (typeof (_rule.valid) == 'object') {
                        valid = _rule.valid.valid;
                        message = _rule.valid.message;
                    }
                    else {
                        valid = _rule.valid;
                        message = _rule.message(rule, value);
                    }
                    if (valid == true) {
                        var message = message.format(displayName);
                        pushMess(key, value, message);
                        continue;
                    }
                }

                var ruleList = Object.keys(rule);
                for (let i = 0; i < Utils.objectValid.extendRule.length; i++) {
                    const rule = Utils.objectValid.extendRule[i];
                    if (ruleList.indexOf(rule.name) >= 0) {
                        var valid = rule.rule(value, data, rule);
                        var message = '';
                        if (typeof (valid) == 'object') {
                            message = valid.message;
                            valid = valid.valid;
                        }

                        if (valid == true) {
                            pushMess(key, value, message);
                            continue;
                        }
                    }
                }
            }
            return _return;
        },
        addRule: function (name, rule) {
            this.extendRule.push({
                name,
                rule
            })
        },
        isValidDate: function (d) {
            return !(d instanceof Date && !isNaN(d)) ? 'Hãy nhập hợp lệ.' : undefined;
        }
    },
    convertObject: function (object, UpperCase, clone) {
        clone = clone == null ? false : clone;
        UpperCase = UpperCase == null ? true : UpperCase;
        if (object == null) {
            return object
        }
        if (clone == true) {
            if (object.constructor == Object) {
                object = $.extend(true, {}, object);
            }
            else if (object.constructor == Array) {
                object = $.extend(true, [], object);
            }
        }
        var checkUpperCase = function (value) {
            value = value || "";
            return value[0] == value[0].toUpperCase();
        }
        var checkLowerCase = function (value) {
            value = value || "";
            return value[0] == value[0].toLowerCase();
        }

        var toUpperCase = function (value) {
            value = value || "";
            return value.substr(0, 1).toUpperCase() + value.substr(1);
        }

        var toLowerCase = function (value) {
            value = value || "";
            return value.substr(0, 1).toLowerCase() + value.substr(1);
        }

        var obj = object.constructor == Array ? [] : object.constructor == Object ? {} : '-1';
        if (obj == -1) {
            return object;
        }
        for (var key in object) {
            var temp = object[key];

            if (UpperCase == null) {
                key = checkUpperCase(key) ? toLowerCase(key) : toUpperCase(key);
            }
            else if (UpperCase == true) {
                key = toUpperCase(key);
            }
            else {
                key = toLowerCase(key);
            }

            if (temp != null && typeof (temp) == 'object') {
                if (temp.constructor == Object) {
                    temp = Utils.convertObject(temp, UpperCase);
                }
                else if (temp.constructor == Array) {
                    for (var i in temp) {
                        temp[i] = Utils.convertObject(temp[i], UpperCase);
                    }
                }
            }

            obj[key] = temp;
        }
        return obj;
    },
    mapDataWithCase: (objMap, objSoruce) => {
        objSoruce = Object.keys(objSoruce).map(e => ({ key: e.toLocaleLowerCase(), value: objSoruce[e] })).toObject(e => e.key, e => e.value)
        return Object.keys(objMap).map(key => ({ key, value: objSoruce[key.toLocaleLowerCase()] })).toObject(e => e.key, e => e.value)
    },
    genForm: (elements) => {

    },
    StartAudio: function (streamAudio) {
        try {
            // play the file tone.mp3
            //   SoundPlayer.playSoundFile('tone', 'mp3')
            // or play from url
            SoundPlayer.playUrl('http://nkt.btxh.gov.vn//UserData/AudioDieuHuong/' + streamAudio)
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    },
    detailAudio: function () {
        _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            console.log('finished playing', success)
          })
          _onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
            console.log('finished loading', success)
          })
          _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
            console.log('finished loading file', success, name, type)
          })
          _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            console.log('finished loading url', success, url)
          })
    },
    StopAudio: function () {
        SoundPlayer.stop();
        // _onFinishedPlayingSubscription.remove();
        // _onFinishedPlayingSubscription = undefined;
        // _onFinishedLoadingSubscription.remove();
        // _onFinishedLoadingSubscription = undefined;
        // _onFinishedLoadingURLSubscription.remove();
        // _onFinishedLoadingURLSubscription = undefined;
        // _onFinishedLoadingFileSubscription.remove();
        // _onFinishedLoadingFileSubscription = undefined;
        console.log("xóa hết audio")

    }

}
export default Utils;