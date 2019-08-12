var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { safeHtmlString } from "../utils/functions";
var ContentEditable = (function (_super) {
    __extends(ContentEditable, _super);
    function ContentEditable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focused = false;
        _this.removed = false;
        _this.preFocusedValue = "";
        _this.onPaste = function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            document.execCommand("insertHTML", false, safeHtmlString(text));
        };
        _this.onFocus = function () {
            _this.preFocusedValue = _this.getValue();
            _this.focused = true;
        };
        _this.onBlur = function () {
            _this.focused = false;
            var ref = _this.props.innerEditableRef.current;
            var _a = _this.props, validator = _a.validator, change = _a.change;
            if (!_this.removed && ref) {
                if (ref.innerText === "") {
                    _this.props.remove();
                    return;
                }
                if (validator) {
                    var valid = validator(_this.getValue());
                    if (!valid) {
                        ref.innerText = _this.preFocusedValue;
                        return;
                    }
                }
                change(ref.innerText);
            }
        };
        _this.onKeyDown = function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                _this.focusInputRef();
                return;
            }
            var removeOnBackspace = _this.props.removeOnBackspace;
            var value = _this.getValue();
            if (removeOnBackspace && e.keyCode === 8 && value === "") {
                _this.removed = true;
                _this.props.remove();
                _this.focusInputRef();
                return;
            }
        };
        _this.getValue = function () {
            var ref = _this.getRef();
            return ref ? ref.innerText : "";
        };
        _this.getRef = function () {
            return _this.props.innerEditableRef.current;
        };
        _this.focusInputRef = function () {
            var inputRef = _this.props.inputRef;
            if (inputRef && inputRef.current) {
                inputRef.current.focus();
            }
        };
        return _this;
    }
    ContentEditable.prototype.componentDidMount = function () {
        this.preFocusedValue = this.getValue();
    };
    ContentEditable.prototype.render = function () {
        var _a = this.props, value = _a.value, className = _a.className, innerEditableRef = _a.innerEditableRef;
        return (React.createElement("div", { ref: innerEditableRef, className: className, contentEditable: true, onPaste: this.onPaste, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, dangerouslySetInnerHTML: { __html: safeHtmlString(value) } }));
    };
    return ContentEditable;
}(React.Component));
export { ContentEditable };
//# sourceMappingURL=ContentEditable.js.map