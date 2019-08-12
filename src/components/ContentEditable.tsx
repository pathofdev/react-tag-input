import React from "react";
import {safeHtmlString} from "../utils/functions";

interface Props {
  value: string;
  className: string;
  innerEditableRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  change: (value: string) => void;
  remove: () => void;
  validator?: (value: string) => boolean;
  removeOnBackspace?: boolean;
}

export class ContentEditable extends React.Component<Props> {

  // Track focus state of editable tag
  focused: boolean = false;

  // Track if element has been removed from DOM
  removed: boolean = false;

  // Save value before input is focused / user starts typing
  preFocusedValue: string = "";

  componentDidMount() {
    this.preFocusedValue = this.getValue();
  }

  onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {

    // Cancel paste event
    e.preventDefault();

    // Remove formatting from clipboard contents
    const text = e.clipboardData.getData("text/plain");

    // Insert text manually from paste command
    document.execCommand("insertHTML", false, safeHtmlString(text));

  }

  onFocus = () => {
    this.preFocusedValue = this.getValue();
    this.focused = true;
  }

  onBlur = () => {

    this.focused = false;

    const ref = this.props.innerEditableRef.current;
    const { validator, change } = this.props;

    if (!this.removed && ref) {

      // On blur, if no content in tag, remove it
      if (ref.innerText === "") {
        this.props.remove();
        return;
      }

      // Validate input if needed
      if (validator) {
        const valid = validator(this.getValue());
        // If invalidate, switch ref back to pre focused value
        if (!valid) {
          ref.innerText = this.preFocusedValue;
          return;
        }
      }

      change(ref.innerText);

    }

  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {

    // On enter, focus main tag input
    if (e.keyCode === 13) {
      e.preventDefault();
      this.focusInputRef();
      return;
    }

    // On backspace, if no content in ref, remove tag and focus main tag input
    const { removeOnBackspace } = this.props;
    const value = this.getValue();
    if (removeOnBackspace && e.keyCode === 8 && value === "") {
      this.removed = true;
      this.props.remove();
      this.focusInputRef();
      return;
    }

  }

  getValue = () => {
    const ref = this.getRef();
    return ref ? ref.innerText : "";
  }

  getRef = () => {
    return this.props.innerEditableRef.current;
  }

  focusInputRef = () => {
    const { inputRef } = this.props;
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }

  render() {
    const { value, className, innerEditableRef } = this.props;
    return (
      <div
        ref={innerEditableRef}
        className={className}
        contentEditable={true}
        onPaste={this.onPaste}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        dangerouslySetInnerHTML={{ __html: safeHtmlString(value) }}
      />
    );
  }

}
