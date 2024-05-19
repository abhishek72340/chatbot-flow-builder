import "./Header.css";
import { PropTypes } from "prop-types";
import toast from "react-hot-toast";
const Header = ({ nodes, edges }) => {
  const handleSave = () => {
    console.log(nodes);
    const nodesWithNoTarget = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodes.length > 1 && nodesWithNoTarget.length > 1) {
      toast.error("cannot save flow.");
    } else {
      toast.success("flow saved successfully!");
    }
  };
  return (
    <div className="header">
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
    </div>
  );
};
Header.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
};

export default Header;
