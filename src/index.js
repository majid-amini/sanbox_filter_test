import React from "react";
import ReactDOM from "react-dom";
import Job from "./job";
import "antd/dist/antd.css";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Job />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
