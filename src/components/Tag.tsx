import React from "react";
import {classSelectors} from "../utils/selectors";
import {ContentEditable} from "./ContentEditable";
import {removeLineBreaks} from "../utils/functions";

interface Props {
  value: string;
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

  innerEditableRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    const ref = this.innerEditableRef.current;
    if (ref) {
      ref.innerText = removeLineBreaks(this.props.value);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    const ref = this.innerEditableRef.current;
    if (ref && prevProps.value !== this.props.value) {
      ref.innerText = removeLineBreaks(this.props.value);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    const changedValue = nextProps.value !== this.props.value;
    const changedIndex = nextProps.index !== this.props.index;
    return (changedValue || changedIndex);
  }

  remove = () => this.props.remove(this.props.index);

  render() {

    const { value, index, editable, inputRef, validator, update, readOnly, removeOnBackspace } = this.props;

    const tagRemoveClass = !readOnly ?
      classSelectors.tagRemove : `${classSelectors.tagRemove} ${classSelectors.tagRemoveReadOnly}`;

    return (
      <div className={classSelectors.tag}>
        {!editable && <div className={classSelectors.tagContent}>{value}</div>}
        {editable && (
          <ContentEditable
            inputRef={inputRef}
            innerEditableRef={this.innerEditableRef}
            className={classSelectors.tagContent}
            change={(newValue) => update(index, newValue)}
            remove={this.remove}
            validator={validator}
            removeOnBackspace={removeOnBackspace}
          />
        )}
        <div className={tagRemoveClass} onClick={this.remove}/>
      </div>
    );

  }

}
