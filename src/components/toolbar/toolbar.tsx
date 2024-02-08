import Button from "../common/button/button";
import "./toolbar.css";
import useStore from "../../store";
import { useState } from "react";
import CustomAlert from "../alert/customAlert";

const Toolbar = () => {
  const [nodes, edges] = useStore((state) => [state.nodes, state.edges]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const saveFlow = () => {
    let targetSet = new Set();
    edges.forEach((ele) => targetSet.add(ele.target));
    if (nodes.length > 1 && nodes.length - targetSet.size > 1) {
      setShowAlert(true);
      setAlertMessage("Cannot Save Flow");
    } else {
      localStorage.setItem("initialNodes", JSON.stringify(nodes));
      localStorage.setItem("initialEdges", JSON.stringify(edges));
      setAlertMessage("Saved Successfully!");
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="toolbar-container">
      <Button onClick={saveFlow}>Save Changes</Button>
      {showAlert && (
        <CustomAlert message={alertMessage} closeAlert={handleAlertClose} />
      )}
    </div>
  );
};

export default Toolbar;
