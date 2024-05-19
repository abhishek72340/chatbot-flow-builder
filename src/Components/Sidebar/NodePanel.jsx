import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { TbMessage } from "react-icons/tb";
const NodePanel = ({ setNodes }) => {
  const [nodeCount, setNodeCount] = useState(2);

  const addTextNode = () => {
    const id = uuidv4();
    setNodes((nds) => [
      ...nds,
      {
        id: id,
        type: "customNode",
        data: { label: "Default Node" + nodeCount },
        position: { x: 250, y: 5 },
      },
    ]);
    setNodeCount(nodeCount + 1);
  };

  return (
    <div className="node-panel" onClick={addTextNode}>
      <TbMessage />
      <div>Message</div>
    </div>
  );
};

NodePanel.propTypes = {
  setNodes: PropTypes.func.isRequired,
};
export default NodePanel;
