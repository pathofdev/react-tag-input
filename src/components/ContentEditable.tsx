import React, { useEffect, useRef, useState } from "react";
import { safeHtmlString } from "../utils/functions";

interface Props {
  value: string;
  className: string;
  change: (value: string) => void;
  remove: () => void;
  validator?: (value: string) => boolean;
  removeOnBackspace?: boolean;
}

const ContentEditable = React.forwardRef<HTMLInputElement, Props>(({ value, className, change, remove, validator, removeOnBackspace }, ref) => {

  const innerEditableRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [removed, setRemoved] = useState(false);
  const [preFocusedValue, setPreFocusedValue] = useState("");

  useEffect(() => {
    setPreFocusedValue(getValue());
  }, []);

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {

    // Cancel paste event
    e.preventDefault();

    // Remove formatting from clipboard contents
    const text = e.clipboardData.getData("text/plain");

    // Insert text manually from paste command
    document.execCommand("insertHTML", false, safeHtmlString(text));

  }

  // When we focus on the div, get it's text value.
  const onFocus = () => {
    setPreFocusedValue(getValue());
  }


  const onBlur = () => {
    const ref = innerEditableRef.current;

    if (!removed && ref) {
      // On blur, if no content in tag, remove it
      if (ref.innerText === "") {
        remove();
        return;
      }

      // Validate input if needed
      if (validator) {
        const valid = validator(getValue());
        // If invalidate, switch ref back to pre focused value
        if (!valid) {
          ref.innerText = preFocusedValue;
          return;
        }
      }
      change(ref.innerText);
    }
  }


  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // On enter, focus main tag input
    const key = e.key || e.keyCode;
    if (key === 13 || key === 188 || key === 'Enter' || key === ',') {
      e.preventDefault();
      focusInputRef();
      return;
    }

    // On backspace, if no content in ref, remove tag and focus main tag input
    const value = getValue();
    if (removeOnBackspace && (key === 8 || key === 'Backspace') && value === "") {
      setRemoved(true);
      remove();
      focusInputRef();
      return;
    }
  }

  const getValue = () => {
    const ref = innerEditableRef.current;
    return ref ? ref.innerText : "";
  }


  const focusInputRef = () => {
    if (ref && typeof ref !== 'function' && ref?.current) {
      ref?.current?.focus();
    }
  }

  return (
    <div
      ref={innerEditableRef}
      className={className}
      contentEditable={true}
      onPaste={onPaste}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      dangerouslySetInnerHTML={{ __html: safeHtmlString(value) }}
    ></div>
  )

});

export default ContentEditable;
