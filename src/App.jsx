import React, { useState } from "react";
import Game from "./Game";
import Home from "./Home";

export default function App() {
  var [mode, setMode] = useState("home");
  
  return (
    <div>
      {mode == "home" && <Home changeMode={() => setMode("play")} />}
      {mode == "play" && <Game changeMode={() => setMode("home")} />}
    </div>
  );
}
