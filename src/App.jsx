import { useState } from "react";
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
} from "reactflow";

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    data: { label: "test message 1" },
    position: { x: 250, y: 5 },
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

  return (
    <>
      <Header nodes={nodes} edges={edges} />
      <div className="app">
        <ReactFlowProvider>
          <div className="panel">
            {showSettingsPanel ? (
              <SettingsPanel
                node={selectedNode}
                onTextChange={handleNodeTextChange}
                hidePanel={hideSettingsPanel}
              />
            ) : (
              <NodePanel setNodes={setNodes} />
            )}
          </div>
          <div className="flow">
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
        </ReactFlowProvider>
      </div>
    </>
  );
}

export default App;
