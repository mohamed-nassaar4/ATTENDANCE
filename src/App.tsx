import React from "react";
import "./App.css";
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import Login from "./login";

const App:React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* //     <img src={logo} className="App-logo" alt="logo" /> */}
        <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Login />}/>
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
