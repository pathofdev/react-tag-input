import React from "react";
import ReactDOM from "react-dom";
import "../src/index.scss";
import Tags from "../src/index";

const root = document.getElementById("root");

function Demo() {
  const [tags, setTags] = React.useState<string[]>(["best", "this is a really long tag with a big name"]);
  console.log(tags);
  return (
    <form>

      <h2>Editable</h2>
      <Tags
        tags={tags}
        editable={true}
        onChange={(value) => setTags(value)}
      />

      <h2>Editable 2</h2>
      <Tags
        tags={tags}
        editable={true}
        onChange={(value) => setTags(value)}
      />

      {false && (
        <>
          <h2>Editable Validator Email Only</h2>
          <Tags
            tags={tags}
            editable={true}
            validator={(v) => {
              const valid = v.indexOf("@") !== -1;
              if (!valid) {
                alert("Please enter an email");
                return false;
              }
              return true;
            }}
            onChange={(value) => {
              console.log("EDITABLE VALUE", value);
              setTags(value);
            }}
            removeOnBackspace={true}
          />

          <h2>Default</h2>
          <Tags
            tags={tags}
            onChange={(value) => setTags(value)}
          />

          <h2>Read Only</h2>
          <Tags
            tags={tags}
            readOnly={true}
            onChange={(value) => setTags(value)}
          />

          <h2>Max Tags</h2>
          <Tags
            tags={tags}
            maxTags={4}
            onChange={(value) => setTags(value)}
          />

          <h2>Validator Email Only</h2>
          <Tags
            tags={tags}
            validator={(v) => {
              const valid = v.indexOf("@") !== -1;
              if (!valid) {
                alert("Please enter an email");
                return false;
              }
              return true;
            }}
            onChange={(value) => setTags(value)}
          />

          <h2>Remove on backspace</h2>
          <Tags
            tags={tags}
            editable={true}
            removeOnBackspace={true}
            onChange={(value) => setTags(value)}
          />
        </>
      )}

    </form>
  );
}

ReactDOM.render(<Demo/>, root);
