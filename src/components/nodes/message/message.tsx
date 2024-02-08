import { Handle, Position } from "reactflow";
import "./message.css";

// custom message node
function MessageNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <div className={`node-message ${selected ? "selected-node" : ""}`}>
      <div className="node-header">
        <p>Send Message</p>
      </div>
      <Handle type="target" position={Position.Left} />
      <div className="node-body">
        <label>{data.label}</label>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default MessageNode;
