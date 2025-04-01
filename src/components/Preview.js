import React, { useEffect, useRef } from "react";

function Preview({ code }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument;

    // Clear previous content
    document.open();

    // Add viewport meta tag for responsive preview
    const responsiveCode = code.replace(
      "<head>",
      '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );

    // Write new content
    document.write(responsiveCode);

    // Close document
    document.close();

    // Add event listeners for errors in the iframe
    const handleError = (event) => {
      console.error("Error in preview:", event.message);
    };

    iframe.contentWindow.addEventListener("error", handleError);

    return () => {
      iframe.contentWindow?.removeEventListener("error", handleError);
    };
  }, [code]);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <div className="editor-title">Preview</div>
      </div>
      <iframe
        ref={iframeRef}
        title="preview"
        className="preview-content"
        sandbox="allow-scripts"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}

export default Preview;
