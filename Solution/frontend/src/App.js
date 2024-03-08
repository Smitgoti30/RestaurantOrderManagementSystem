import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Roms from "./components/Roms.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Roms></Roms>
      </BrowserRouter>
    </>
  );
}

export default App;
