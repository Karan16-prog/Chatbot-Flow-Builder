import { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Connection,
  Controls,
  OnSelectionChangeParams,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import useStore from "../../store";
import MessageNode from "../nodes/message/message";
import "./flowArea.css";

const getId = () => `node_${Date.now()}`;

const FlowArea = () => {
  const reactFlowWrapper = useRef(null);
  const [
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setSelectedNode,
  ] = useStore((s) => [
    s.nodes,
    s.edges,
    s.onNodesChange,
    s.onEdgesChange,
    s.onConnect,
    s.setNodes,
    s.setSelectedNode,
  ]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (reactFlowInstance) {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type}-${getId().split("_")[1]}` },
        };
        setNodes(newNode);
      }
    },
    [reactFlowInstance]
  );

  const validateEdge = useCallback(
    (connection: Connection) => {
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].source === connection.source) {
          return false;
        }
      }
      return true;
    },
    [edges]
  );

  const onSelect = useCallback((params: OnSelectionChangeParams) => {
    const k =
      params.nodes.length > 0 ? params.nodes[params.nodes.length - 1] : null;

    setSelectedNode(k);
  }, []);

  const nodeTypes = useMemo(() => ({ messageNode: MessageNode }), []);

  return (
    <div className="flow-area">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onSelectionChange={onSelect}
            fitView
            isValidConnection={(connection: Connection) => {
              return validateEdge(connection);
            }}
          ></ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowArea;
