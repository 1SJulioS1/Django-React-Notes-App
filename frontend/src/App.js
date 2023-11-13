import React from "react";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
