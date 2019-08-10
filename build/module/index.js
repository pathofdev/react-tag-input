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
import { Tag } from "./components/Tag";
import { classSelectors } from "./utils/selectors";
var ReactTagInput = (function (_super) {
    __extends(ReactTagInput, _super);
    function ReactTagInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { input: "" };
        _this.inputRef = React.createRef();
        _this.onInputChange = function (e) {
            _this.setState({ input: e.target.value });
        };
        _this.onInputKeyDown = function (e) {
            var input = _this.state.input;
            var _a = _this.props, validator = _a.validator, removeOnBackspace = _a.removeOnBackspace;
            if (e.keyCode === 13) {
                e.preventDefault();
                if (input === "") {
                    return;
                }
                var valid = validator !== undefined ? validator(input) : true;
                if (!valid) {
                    return;
                }
                _this.addTag(input);
            }
            else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {
                if (input !== "") {
                    return;
                }
                _this.removeTag(_this.props.tags.length - 1);
            }
        };
        _this.addTag = function (value) {
            var tags = _this.props.tags.slice();
            tags.push(value);
            _this.props.onChange(tags);
            _this.setState({ input: "" });
        };
        _this.removeTag = function (i) {
            var tags = _this.props.tags.slice();
            tags.splice(i, 1);
            _this.props.onChange(tags);
        };
        _this.updateTag = function (i, value) {
            var tags = _this.props.tags.slice();
            tags[i] = value;
            _this.props.onChange(tags);
        };
        return _this;
    }
    ReactTagInput.prototype.render = function () {
        var _this = this;
        var input = this.state.input;
        var _a = this.props, tags = _a.tags, placeholder = _a.placeholder, maxTags = _a.maxTags, editable = _a.editable, readOnly = _a.readOnly, validator = _a.validator, removeOnBackspace = _a.removeOnBackspace;
        var maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;
        var isEditable = readOnly ? false : (editable || false);
        var showInput = !readOnly && !maxTagsReached;
        return (React.createElement("div", { className: classSelectors.wrapper },
            tags.map(function (tag, i) { return (React.createElement(Tag, { key: i, value: tag, index: i, editable: isEditable, readOnly: readOnly || false, inputRef: _this.inputRef, update: _this.updateTag, remove: _this.removeTag, validator: validator, removeOnBackspace: removeOnBackspace })); }),
            showInput &&
                React.createElement("input", { ref: this.inputRef, value: input, className: classSelectors.input, placeholder: placeholder || "Type and press enter", onChange: this.onInputChange, onKeyDown: this.onInputKeyDown })));
    };
    return ReactTagInput;
}(React.Component));
export default ReactTagInput;
//# sourceMappingURL=index.js.map