import Editor from "@monaco-editor/react";

const SqlEditor = ({ value, onChange }) => {
  return (
    <div className="panel panel--editor">
      <div className="panel__header">
        <h2>SQL Editor</h2>
      </div>
      <div className="panel__body panel__body--editor">
        <Editor
          height="280px"
          defaultLanguage="sql"
          value={value}
          onChange={(nextValue) => onChange(nextValue || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
            wordWrap: "on"
          }}
        />
      </div>
    </div>
  );
};

export default SqlEditor;

