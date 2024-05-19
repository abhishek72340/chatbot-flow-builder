// App.jsx
import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import "./App.css";
import "reactflow/dist/style.css";
import NodePanel from "./Components/Sidebar/NodePanel";
import SettingsPanel from "./Components/Sidebar/SettingsPanel";
import Header from "./Components/Header/Header";
import CustomNode from "./Components/CustomNode/CustomNode";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import { ItemTypes } from "./ItemTypes";
import { v4 as uuidv4 } from "uuid";

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    data: { label: "test message 1" },
    position: { x: 200, y: 5 },
  },
];
const initialEdges = [];
const nodeTypes = {
  customNode: CustomNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [nodeCount, setNodeCount] = useState(2);
  const { project } = useReactFlow();

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setShowSettingsPanel(true);
  };

  const handleNodeTextChange = (id, text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
  };

  const hideSettingsPanel = () => {
    setShowSettingsPanel(false);
    setSelectedNode(null);
  };

  const handleDrop = useCallback(
    (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const canvasPosition = project({
        x: clientOffset.x,
        y: clientOffset.y,
      });

      const id = uuidv4();
      const label = `test node ${nodeCount}`;

      setNodes((nds) => [
        ...nds,
        {
          id: id,
          type: item.type,
          data: { label: label },
          position: { x: canvasPosition.x - 200, y: canvasPosition.y - 200 },
        },
      ]);
      setNodeCount(nodeCount + 1);
    },
    [nodeCount, project, setNodes]
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.NODE,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: ItemTypes.NODE,
  //   drop: (item, monitor) => {
  //     const offset = monitor.getClientOffset();
  //     if (!offset) return;

  //     // Transform the drop coordinates to the canvas space
  //     const transformed = project({ x: offset.x, y: offset.y });

  //     // Adjust the coordinates by subtracting a certain value
  //     const adjustedX = transformed.x - 250; // Adjust the value as needed
  //     const adjustedY = transformed.y - 220; // Adjust the value as needed

  //     const id = uuidv4();
  //     const label = `test node ${nodeCount}`;

  //     // Add the new node at the adjusted coordinates
  //     setNodes((nds) => [
  //       ...nds,
  //       {
  //         id: id,
  //         type: item.type,
  //         data: { label: label },
  //         position: { x: adjustedX, y: adjustedY },
  //       },
  //     ]);
  //     setNodeCount(nodeCount + 1);
  //   },
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));

  return (
    <ReactFlowProvider>
      <Header nodes={nodes} edges={edges} />
      <div className="app">
        <div className="panel">
          {showSettingsPanel ? (
            <SettingsPanel
              node={selectedNode}
              onTextChange={handleNodeTextChange}
              hidePanel={hideSettingsPanel}
            />
          ) : (
            <NodePanel nodeCount={nodeCount} />
          )}
        </div>
        <div
          className="flow"
          ref={drop}
          style={{ border: isOver ? "2px solid green" : "none" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
