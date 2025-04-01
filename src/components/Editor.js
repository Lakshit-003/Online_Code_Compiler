import React from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FaTimes } from "react-icons/fa";

// Import CodeMirror themes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";

// Import language modes
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

// Import addons
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/show-hint.css";

function Editor({ language, displayName, value, onChange, theme, onClose }) {
  function handleChange(editor, data, value) {
    onChange(value);
  }

  // Map the language prop to CodeMirror's mode
  const modeMap = {
    html: "xml",
    css: "css",
    javascript: "javascript",
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="editor-title">{displayName}</div>
        <div className="editor-actions">
          <button className="editor-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="editor-content">
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: modeMap[language] || language,
            theme: theme || "default",
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            extraKeys: {
              "Ctrl-Space": "autocomplete",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
