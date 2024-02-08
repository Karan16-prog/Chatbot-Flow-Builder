import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Connection,
  OnSelectionChangeParams,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "../../nodeConfig";
import useStore from "../../store";
import "./flowGraph.css";

// generate mock ID
const getId = () => `node_${Date.now()}`;

const FlowGraph = () => {
  // fetch required states from store
  const reactFlowWrapper = useRef(null);
  const [
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setSelectedNode,
  ] = useStore((state) => [
    state.nodes,
    state.edges,
    state.onNodesChange,
    state.onEdgesChange,
    state.onConnect,
    state.setNodes,
    state.setSelectedNode,
  ]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // update nodes array after drag & drop of new node
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

  // multiple source connection validation
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

  // store selected node in state
  const onSelect = useCallback((params: OnSelectionChangeParams) => {
    const k =
      params.nodes.length > 0 ? params.nodes[params.nodes.length - 1] : null;

    setSelectedNode(k);
  }, []);

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

export default FlowGraph;
