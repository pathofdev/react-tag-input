import React from "react";
import { classSelectors } from "../utils/selectors";
import ContentEditable from "./ContentEditable";

interface Props {
  value: string;
  index: number;
  editable: boolean;
  readOnly: boolean;
  update: (i: number, value: string) => void;
  remove: (i: number) => void;
  validator?: (val: string) => boolean;
  removeOnBackspace?: boolean;
}

const Tag = React.forwardRef<HTMLInputElement, Props>(({ value, index, editable, readOnly, update, remove, validator, removeOnBackspace }, ref) => {

  const removeTag = () => remove(index);

  const tagRemoveClass = !readOnly ?
    classSelectors.tagRemove : `${classSelectors.tagRemove} ${classSelectors.tagRemoveReadOnly}`;

  return (
    <div className={classSelectors.tag}>
      {!editable && <div className={classSelectors.tagContent}>{value}</div>}
      {editable && (
        <ContentEditable
          value={value}
          ref={ref}
          className={classSelectors.tagContent}
          change={(newValue) => update(index, newValue)}
          remove={removeTag}
          validator={validator}
          removeOnBackspace={removeOnBackspace}
        />
      )}
      <div className={tagRemoveClass} onClick={removeTag} ></div>
    </div>
  );
});

export default Tag;