import "./styles.css";

import Login from "./Components/Login";
import Home from "./Components/HomePage";
import Editor from "./Components/doc";

import { Routes, Route } from "react-router-dom";
import { app, database } from "./firebaseConfig";

export default function App() {
  return (
    <div className="app">
      <h1>Welcome to Google Docs</h1>
      <Routes>
        // These are the different pages you can navigate to
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home database={database} />} />
        <Route path="/editor/:id" element={<Editor database={database} />} />
      </Routes>
    </div>
  );
}
