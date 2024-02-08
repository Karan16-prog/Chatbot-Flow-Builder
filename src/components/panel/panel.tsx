import React, { useState } from "react";
import "./panel.css";
import useStore from "../../store";
import { Node } from "reactflow";

function SidePanel() {
  const [selectedNode, nodes, updateNodes] = useStore((state) => [
    state.selectedNode,
    state.nodes,
    state.updateNodes,
  ]);
  const updateTextCallback = (text: string) => {
    let idx = nodes.findIndex((ele: Node) => ele.id === selectedNode?.id);
    if (idx !== -1) {
      nodes[idx].data.label = text;
      updateNodes(nodes);
    }
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
  const dragNode = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="node-panel">
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
    updateText(event.target.value);
    setText(event.target.value);
  };

  return (
    <div className="setting-container">
      <div className="setting-header">
        <div>Message</div>
      </div>
      <h6>Text</h6>
      <textarea value={text} className="text-area" onChange={handleChange} />
    </div>
  );
}

const NODE_TYPE = [
  {
    id: 1,
    label: "Message",
    type: "messageNode",
  },
];

export default SidePanel;
