import React from "react";
import {classSelectors} from "./selectors";
import {ContentEditable} from "./ContentEditable";

interface Props {
  tag: string;
  index: number;
  editable: boolean;
  readOnly: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  update: (i: number, value: string) => void;
  remove: (i: number) => void;
  validator?: (val: string) => boolean;
  removeOnBackspace?: boolean;
}

export class Tag extends React.Component<Props> {

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    return (nextProps.tag !== this.props.tag || nextProps.index !== this.props.index);
  }

  remove = () => this.props.remove(this.props.index);

  render() {
    const { tag, index, editable, inputRef, validator, update, readOnly, removeOnBackspace } = this.props;
    return (
      <div className={classSelectors.tag}>
        {!editable && <div className={classSelectors.tagContent}>{tag}</div>}
        {editable && (
          <ContentEditable
            value={tag}
            inputRef={inputRef}
            className={classSelectors.tagContent}
            change={(value) => update(index, value)}
            remove={this.remove}
            validator={validator}
            removeOnBackspace={removeOnBackspace}
          />
        )}
        <div className={`${classSelectors.tagRemove} ${readOnly ? classSelectors.tagRemoveReadOnly : ""}`} onClick={this.remove}/>
      </div>
    );
  }

}
