import "./styles.css";

import Login from "./Components/Login"; // For signing out and signing in
import Home from "./Components/HomePage"; // After loging in 
import Editor from "./Components/doc"; // text editing 

import { Routes, Route } from "react-router-dom"; // allows to go to different pages in the web-app
import { app, database } from "./firebaseConfig";

export default function App() {
  return (
    <div className="app">
      <h1>Welcome to Google Docs</h1>
      <Routes> // These are the different pages you can navigate to
        <Route path="/" element={<Login />} /> // Login page
        <Route path="/home" element={<Home database={database} />} /> // home page
        <Route path="/editor/:id" element={<Editor database={database} />} /> // editor page that opens up a 
                                                                              // specific document w/ unique id
      </Routes>
    </div>
  );
}
