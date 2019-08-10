import React from "react";
import {safeInputText} from "./utils";

interface Props {
  value: string;
  className: string;
  inputRef: React.RefObject<HTMLInputElement>;
  change: (value: string) => void;
  remove: () => void;
  validator?: (value: string) => boolean;
  removeOnBackspace?: boolean;
}

export class ContentEditable extends React.Component<Props> {

  // Ref for editable tag
  ref: React.RefObject<HTMLDivElement>;

  // Cache value of tag as class property
  value: string;

  // Save value before input is focused / user starts typing
  preFocusedValue: string;

  // Track focus state of editable tag
  focused: boolean = false;

  // Track if element has been removed from DOM
  removed: boolean = false;

  constructor(props: Props) {

    super(props);

    // Escape HTML and remove line breaks, then set cached value
    const value = safeInputText(this.props.value);

    this.value = value;
    this.preFocusedValue = value;

    // Create ref for editable content
    this.ref = React.createRef();

  }

  onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {

    // Cancel paste event
    e.preventDefault();

    // Remove formatting from clipboard contents
    const text = e.clipboardData.getData("text/plain");

    // Insert text manually from paste command
    document.execCommand("insertHTML", false, safeInputText(text));

  }

  focusInputRef = () => {
    const { inputRef } = this.props;
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }

  onFocus = () => {
    this.preFocusedValue = this.props.value;
    this.focused = true;
  }

  onBlur = () => {

    this.focused = false;

    const ref = this.ref.current;
    const { value, validator, change } = this.props;

    // On blur, if no content in tag, remove it
    if (ref && ref.innerText === "" && !this.removed) {
      this.props.remove();
    }
    // Else, validate input if needed
    else if (!this.removed && validator) {

      const valid = validator(value);

      // If invalidate, switch value back to pre focused value
      if (!valid) {
        change(this.preFocusedValue);
        if (ref) {
          ref.innerText = this.preFocusedValue;
        }
      }

    }

  }

  onInput = () => {
    // Update tag value on content change
    if (this.ref.current) {
      this.props.change(this.ref.current.innerText);
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
    const ref = this.ref.current;
    if (removeOnBackspace && ref && e.keyCode === 8 && ref.innerText === "") {
      this.removed = true;
      this.props.remove();
      this.focusInputRef();
    }

  }

  render() {

    const { value, className } = this.props;

    // Prevent tag from re-rendering content when a user is typing which causes cursor position to jump
    const content = safeInputText(this.focused ? this.value : value);

    console.log("RENDER CONTENT", value);

    return (
      <div
        ref={this.ref}
        className={className}
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={this.onInput}
        onPaste={this.onPaste}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
      />
    );

  }

}
