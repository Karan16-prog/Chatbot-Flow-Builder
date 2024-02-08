import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

// Store for state management. Refer to Zustand docs

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node) => void;
  setEdges: (edges: Edge[]) => void;
  selectedNode: Node | null;
  setSelectedNode: (selectedNode: Node | null) => void;
  updateNodes: (nodes: Node[]) => void;
};

// localstorage keys to get saved flow
const initialNodeKey = "initialNodes";
const initialEdgeKey = "initialEdges";

const useStore = create<RFState>((set, get) => {
  const initialNodeJson = localStorage.getItem(initialNodeKey);
  const initialNode = initialNodeJson
    ? (JSON.parse(initialNodeJson) as Node[])
    : ([] as Node[]);

  const initialEdgeJson = localStorage.getItem(initialEdgeKey);
  const initialEdge = initialEdgeJson
    ? (JSON.parse(initialEdgeJson) as Edge[])
    : ([] as Edge[]);

  return {
    nodes: initialNode,
    edges: initialEdge,
    selectedNode: null,
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    setNodes: (node: Node) => {
      set((state) => ({ nodes: state.nodes.concat(node) }));
    },
    updateNodes: (nodes: Node[]) => {
      set({ nodes: nodes });
    },
    setEdges: (edges: Edge[]) => {
      set({ edges });
    },
    setSelectedNode: (selectedNode: Node | null) => {
      set(() => ({ selectedNode: selectedNode }));
    },
  };
});

export default useStore;
