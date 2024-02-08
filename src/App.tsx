import "./App.css";
import FlowGraph from "./components/flowGraph/flowGraph";
import SidePanel from "./components/panel/panel";
import Toolbar from "./components/toolbar/toolbar";
import { useState, useEffect } from "react";
function App() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="container">
          <Toolbar />
          <div className="canvas">
            <div className="flowContainer">
              <FlowGraph />
            </div>
            <SidePanel />
          </div>
        </div>
      ) : (
        <MobileInProgress />
      )}
    </>
  );
}

export default App;

// not mobile responsive as of now. Handling via error message
export const MobileInProgress = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mobile View in progress</h1>
    </div>
  );
};
