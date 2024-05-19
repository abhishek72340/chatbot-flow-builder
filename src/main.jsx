import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <Toaster />
        <App />
      </ReactFlowProvider>
    </DndProvider>
  </React.StrictMode>
);
