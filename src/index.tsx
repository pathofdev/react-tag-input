import React, { useRef, useState } from "react";
import Tag from "./components/Tag";
import { classSelectors } from "./utils/selectors";

type Tags = string[];

export interface ReactTagInputProps {
  tags: Tags;
  onChange: (tags: Tags) => void;
  placeholder?: string;
  maxTags?: number;
  validator?: (val: string) => boolean;
  editable?: boolean;
  readOnly?: boolean;
  removeOnBackspace?: boolean;
  wrapperClass?: string;
  inputClass?: string;
  [x: string]: any; // Allow for any additional props
}

const ReactTagInput = React.forwardRef<HTMLInputElement, ReactTagInputProps>(({ tags, onChange, placeholder, maxTags, validator, editable, readOnly, removeOnBackspace, wrapperClass, inputClass, ...rest }, ref) => {

  const [input, setInput] = useState<string>("");

  // Ref for input element
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement> || ref;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // On enter
    const key = e.key || e.keyCode;
    if (key === 13 || key === 188 || key === 'Enter' || key === ',') {

      // Prevent form submission if tag input is nested in <form>
      e.preventDefault();

      // If input is blank, do nothing
      if (input === "") { return; }

      // Check if input is valid
      const valid = validator !== undefined ? validator(input) : true;
      if (!valid) {
        return;
      }

      // Add input to tag list
      addTag(input);
    }
    // On backspace or delete
    else if (removeOnBackspace && (key === 8 || key === 46 || key === 'Backspace' || key === 'Delete')) {

      // If currently typing, do nothing
      if (input !== "") {
        return;
      }

      // If input is blank, remove previous tag
      removeTag(tags.length - 1);
    }
  }

  const addTag = (value: string) => {
    const newTags = [...tags];
    if (!newTags.includes(value)) {
      newTags.push(value);
      onChange(newTags);
    }
    setInput('');
  }

  const removeTag = (i: number) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    onChange(newTags);
  }

  const updateTag = (i: number, value: string) => {
    const newTags = [...tags];
    const numOccurencesOfValue = newTags.reduce((prev, currentValue, index) => prev + (currentValue === value && index !== i ? 1 : 0), 0);
    if (numOccurencesOfValue > 0) {
      newTags.splice(i, 1);
    } else {
      newTags[i] = value;
    }
    onChange(newTags);
  }

  const maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;

  const isEditable = readOnly ? false : (editable || false);

  const showInput = !readOnly && !maxTagsReached;

  return (
    <div className={`${classSelectors.wrapper} ${wrapperClass}`}>
      {tags.map((tag, i) => (
        <Tag
          key={i}
          value={tag}
          index={i}
          editable={isEditable}
          readOnly={readOnly || false}
          ref={inputRef}
          update={updateTag}
          remove={removeTag}
          validator={validator}
          removeOnBackspace={removeOnBackspace}
        />
      ))}
      {showInput &&
        <input
          ref={inputRef}
          value={input}
          className={`${classSelectors.input} ${inputClass}`}
          placeholder={placeholder || "Type and press enter"}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          {...rest}
        />
      }
    </div>
  );
});

export default ReactTagInput;
