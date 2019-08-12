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
import { classSelectors } from "../utils/selectors";
import { ContentEditable } from "./ContentEditable";
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.innerEditableRef = React.createRef();
        _this.remove = function () { return _this.props.remove(_this.props.index); };
        return _this;
    }
    Tag.prototype.render = function () {
        var _a = this.props, value = _a.value, index = _a.index, editable = _a.editable, inputRef = _a.inputRef, validator = _a.validator, update = _a.update, readOnly = _a.readOnly, removeOnBackspace = _a.removeOnBackspace;
        var tagRemoveClass = !readOnly ?
            classSelectors.tagRemove : classSelectors.tagRemove + " " + classSelectors.tagRemoveReadOnly;
        return (React.createElement("div", { className: classSelectors.tag },
            !editable && React.createElement("div", { className: classSelectors.tagContent }, value),
            editable && (React.createElement(ContentEditable, { value: value, inputRef: inputRef, innerEditableRef: this.innerEditableRef, className: classSelectors.tagContent, change: function (newValue) { return update(index, newValue); }, remove: this.remove, validator: validator, removeOnBackspace: removeOnBackspace })),
            React.createElement("div", { className: tagRemoveClass, onClick: this.remove })));
    };
    return Tag;
}(React.Component));
export { Tag };
//# sourceMappingURL=Tag.js.map