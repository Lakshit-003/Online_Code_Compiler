import React, { useState, useEffect } from "react";
import "./styles.css";
import { Controlled as CodeMirror } from "react-codemirror2";

// Import CodeMirror styles
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/eclipse.css";

// Import language modes
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

// Import language addons
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/lint/css-lint";

// Import jshint (for linting)
window.JSHINT = require("jshint").JSHINT;

function App() {
  const [htmlCode, setHtmlCode] = useState(
    "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Web Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>"
  );
  const [cssCode, setCssCode] = useState(
    "body {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n  margin: 20px;\n}\n\nh1 {\n  color: #333;\n}"
  );
  const [jsCode, setJsCode] = useState(
    '// JavaScript code here\nconsole.log("Hello from JavaScript!");\n\n// Try creating a function with a syntax error\nfunction greet(name) {\n  return "Hello, " + name;\n}\n\n// Try using different variable types\nlet number = 42;\nconst text = "This is a string";\nvar isTrue = true;\n\n// Create an object\nconst person = {\n  name: "John",\n  age: 30,\n  isStudent: false\n};'
  );

  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState("neat"); // Default theme

  // Available themes
  const themes = [
    { name: "Default", value: "neat" },
    { name: "Material", value: "material" },
    { name: "Dracula", value: "dracula" },
    { name: "Monokai", value: "monokai" },
    { name: "Eclipse", value: "eclipse" },
  ];

  // Update body class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Generate the preview HTML
  const combinedCode = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode
          .replace("<!DOCTYPE html>", "")
          .replace(/<html>|<\/html>|<head>.*<\/head>/s, "")}
        <script>${jsCode}</script>
      </body>
    </html>
  `;

  // CodeMirror options
  const getEditorOptions = (mode) => {
    return {
      mode: mode,
      theme: theme,
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: [
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter",
        "CodeMirror-lint-markers",
      ],
      lint: mode === "javascript" ? true : false,
      indentUnit: 2,
      tabSize: 2,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
      },
    };
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="navbar">
        <div className="navbar-title">Online Code Compiler</div>
        <div className="navbar-actions">
          <div className="theme-selector">
            <label htmlFor="editor-theme">Theme: </label>
            <select
              id="editor-theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              {themes.map((themeOption) => (
                <option key={themeOption.value} value={themeOption.value}>
                  {themeOption.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="code-panels">
          <div className="panel">
            <div className="panel-header">HTML</div>
            <div className="codemirror-wrapper">
              <CodeMirror
                value={htmlCode}
                options={getEditorOptions("xml")}
                onBeforeChange={(editor, data, value) => {
                  setHtmlCode(value);
                }}
              />
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">CSS</div>
            <div className="codemirror-wrapper">
              <CodeMirror
                value={cssCode}
                options={getEditorOptions("css")}
                onBeforeChange={(editor, data, value) => {
                  setCssCode(value);
                }}
              />
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">JavaScript</div>
            <div className="codemirror-wrapper">
              <CodeMirror
                value={jsCode}
                options={getEditorOptions("javascript")}
                onBeforeChange={(editor, data, value) => {
                  setJsCode(value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="preview-panel">
          <div className="panel-header">Preview</div>
          <iframe
            title="preview"
            className="preview-frame"
            srcDoc={combinedCode}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
