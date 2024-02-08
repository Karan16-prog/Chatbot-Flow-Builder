import "./App.css";
import FlowArea from "./components/FlowArea/flowArea";
import SidePanel from "./components/panel/panel";
import Toolbar from "./components/toolbar/toolbar";
function App() {
  return (
    <div className="container">
      <Toolbar />
      <div className="canvas">
        <div className="flowContainer">
          <FlowArea />
        </div>
        <SidePanel />
      </div>
    </div>
  );
}

export default App;
