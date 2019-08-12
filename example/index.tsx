import React from "react";
import ReactDOM from "react-dom";
import ReactTagInput, {ReactTagInputProps} from "../src/index";
import "../src/styles/index.scss";

const root = document.getElementById("root");

const initialSettings: ReactTagInputProps = {
  tags: [],
  onChange: (tags) => {},
  placeholder: "Types and press enter",
  maxTags: 10,
  editable: true,
  readOnly: false,
  removeOnBackspace: true,
  validator: undefined,
};

function Example() {
  const [tags, setTags] = React.useState<string[]>(["machine-1", "machine-2"]);
  const [settings, setSettings] = React.useState(initialSettings);
  console.log(tags, settings);
  return (
    <>
      <ReactTagInput
        {...settings}
        tags={tags}
        onChange={(value) => setTags(value)}
      />

      <div className="form">

        <div className="section" style={{ marginTop: "40px" }}>
          <label>
            Placeholder
            <input
              type="text"
              value={settings.placeholder}
              onChange={(e) => setSettings({ ...settings, placeholder: e.target.value })}
            />
          </label>

          <label>
            Max tags
            <input
              type="number"
              value={settings.maxTags}
              onChange={(e) => setSettings({ ...settings, maxTags: parseInt(e.target.value, 10) })}
            />
          </label>
        </div>

        <div className="section" style={{ marginTop: "40px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.editable}
              onChange={(e) => setSettings({ ...settings, editable: e.target.checked })}
            />
            Editable
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.readOnly}
              onChange={(e) => setSettings({ ...settings, readOnly: e.target.checked })}
            />
            Read-only
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.removeOnBackspace}
              onChange={(e) => setSettings({ ...settings, removeOnBackspace: e.target.checked })}
            />
            Remove on backspace
          </label>

          <label>
            <input
              type="checkbox"
              checked={!!settings.validator}
              onChange={(e) => setSettings({
                ...settings,
                validator: e.target.checked ? (val) => val.indexOf("@") !== -1 : undefined,
              })}
            />
            Custom validator (email)
          </label>
        </div>

      </div>
    </>
  );
}

ReactDOM.render(<Example/>, root);
