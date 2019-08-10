import React from "react";
import {Tag} from "./tag";
import {classSelectors} from "./selectors";
import {generateUniqueKey} from "./utils";

type Tags = string[];

interface Props {
  tags: Tags;
  onChange: (tags: Tags) => void;
  placeholder?: string;
  maxTags?: number;
  validator?: (val: string) => boolean;
  editable?: boolean;
  readOnly?: boolean;
  removeOnBackspace?: boolean;
}

interface State {
  input: string;
}

export default class ReactTagInput extends React.Component<Props, State> {

  // Keys stores the unique key prop for each tag
  keys: string[] = [];

  // Ref to the input element
  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {

    super(props);

    // Generate keys for each initial tag
    this.keys = this.props.tags.map(() => generateUniqueKey());

    // Create input ref
    this.inputRef = React.createRef();

    // Define initial state
    this.state = {
      input: "",
    };

  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  }

  onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    const { input } = this.state;
    const { validator, removeOnBackspace } = this.props;

    // On enter
    if (e.keyCode === 13) {

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
      this.addTag(input);

    }
    // On backspace or delete
    else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {

      // If currently typing, do nothing
      if (input !== "") {
        return;
      }

      // If input is blank, remove previous tag
      this.removeTag(this.props.tags.length - 1);

    }

  }

  addTag = (value: string) => {
    const tags = [ ...this.props.tags ];
    tags.push(value);
    this.keys[tags.length - 1] = generateUniqueKey();
    this.props.onChange(tags);
    this.setState({ input: "" });
  }

  removeTag = (i: number) => {
    const tags = [ ...this.props.tags ];
    tags.splice(i, 1);
    this.keys.splice(i, 1);
    this.props.onChange(tags);
  }

  updateTag = (i: number, value: string) => {
    const tags = [...this.props.tags];
    tags[i] = value;
    this.props.onChange(tags);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>) {
    const { tags } = this.props;
    const nextTags = nextProps.tags;
    const tagLengthDifference = nextTags.length - tags.length;
    if (tagLengthDifference > 0) {
      for (let i = tags.length - 1; i < (tags.length + tagLengthDifference); i++) {
        this.keys[i] = generateUniqueKey();
      }
    }
    else if (tagLengthDifference < 0) {
      const startDelete = (tags.length + tagLengthDifference);
      const deleteCount = tags.length - startDelete;
      this.keys.splice(startDelete, deleteCount);
    }
    return true;
  }

  render() {

    // console.log(this.keys);

    const { input } = this.state;

    const { tags, placeholder, maxTags, editable, readOnly, validator, removeOnBackspace } = this.props;

    const maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;

    const isEditable = readOnly ? false : (editable || false);

    const showInput = !readOnly && !maxTagsReached;

    return (
      <div className={classSelectors.wrapper}>
        {tags.map((tag, i) => (
          <Tag
            key={this.keys[i]}
            tag={tag}
            index={i}
            editable={isEditable}
            readOnly={readOnly || false}
            inputRef={this.inputRef}
            update={this.updateTag}
            remove={this.removeTag}
            validator={validator}
            removeOnBackspace={removeOnBackspace}
          />
        ))}
        {showInput &&
          <input
            ref={this.inputRef}
            value={input}
            className={classSelectors.input}
            placeholder={placeholder || "Type and press enter"}
            onChange={this.onInputChange}
            onKeyDown={this.onInputKeyDown}
          />
        }
      </div>
    );

  }

}
