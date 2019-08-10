import React from "react";
import ReactDOM from "react-dom";
import ReactTagInput from "../src/index";
import "../src/styles/index.scss";

const root = document.getElementById("root");

function Example() {
  const [tags, setTags] = React.useState<string[]>(["machine-1", "machine-2"]);
  return (
    <ReactTagInput
      tags={tags}
      editable={true}
      onChange={(value) => setTags(value)}
    />
  );
}

ReactDOM.render(<Example/>, root);
