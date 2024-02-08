import React, { useState } from "react";
import "./panel.css";
import useStore from "../../store";
import { FormPreviousLink } from "grommet-icons";
import { NODE_TYPE } from "../../nodeConfig";

function SidePanel() {
  const [selectedNode, nodes, updateNodes] = useStore((state) => [
    state.selectedNode,
    state.nodes,
    state.updateNodes,
  ]);

  // callback function passed to setting panel to update node text
  const updateTextCallback = (text: string) => {
    nodes.forEach((node) => {
      if (node.id === selectedNode?.id) {
        node.data.label = text;
        node.selected = false;
        updateNodes([...nodes]);
      }
    });
  };

  return (
    <div className="panel-container">
      {selectedNode === null ? (
        <NodePanel />
      ) : (
        <SettingPanel
          currentText={selectedNode?.data?.label ?? ""}
          updateText={updateTextCallback}
        />
      )}
    </div>
  );
}

function NodePanel() {
  // passing node type to dragging event
  const dragNode = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="node-panel">
      {/* Mapping all NODE_TYPE from nodeConfig */}
      {NODE_TYPE.map((node) => (
        <div
          onDragStart={(event) => dragNode(event, node.type)}
          className="node-container"
          key={node.id}
          draggable
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

function SettingPanel({
  currentText,
  updateText,
}: {
  currentText: string;
  updateText: (text: string) => void;
}) {
  const [text, setText] = useState(currentText);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // calls the callback fn to update node text
  const updateNode = () => {
    updateText(text);
  };

  return (
    <div className="setting-container">
      <div className="setting-header">
        <div
          onClick={updateNode}
          style={{
            cursor: "pointer",
          }}
        >
          <FormPreviousLink size="medium" />
        </div>

        <div style={{ margin: "auto" }}>Message</div>
      </div>
      <h6>Text</h6>
      <textarea value={text} className="text-area" onChange={handleChange} />

      <span style={{ fontSize: 10 }}>Save on Arrow click</span>
    </div>
  );
}

export default SidePanel;
