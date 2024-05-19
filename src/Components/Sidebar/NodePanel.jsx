import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { TbMessage } from "react-icons/tb";
import { ItemTypes } from "../../ItemTypes";
import "./Sidebar.css";

const NodePanel = ({ nodeCount }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    item: { type: "customNode", label: `test node ${nodeCount}` },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="node-panel"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <TbMessage />
      <div>Message</div>
    </div>
  );
};

NodePanel.propTypes = {
  nodeCount: PropTypes.number.isRequired,
};

export default NodePanel;
