import { useState, useEffect } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { IoMdArrowBack } from "react-icons/io";
const SettingsPanel = ({ node, onTextChange, hidePanel }) => {
  const [text, setText] = useState(node.data.label);

  useEffect(() => {
    setText(node.data.label);
  }, [node]);

  const handleChange = (event) => {
    setText(event.target.value);
    onTextChange(node.id, event.target.value);
  };

  return (
    <>
      <div className="msg-header">
        <IoMdArrowBack onClick={hidePanel} style={{ cursor: "pointer" }} />
        <div>Message</div>
      </div>
      <hr />

      <div className="settings-panel">
        <span>Text</span>
        <textarea value={text} onChange={handleChange} rows="4" cols="30" />
      </div>
      <hr />
    </>
  );
};

SettingsPanel.propTypes = {
  node: PropTypes.object.isRequired,
  onTextChange: PropTypes.func.isRequired,
  hidePanel: PropTypes.func.isRequired,
};

export default SettingsPanel;
