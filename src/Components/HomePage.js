import { onAuthStateChanged, signOut, getAuth } from "firebase/auth"; // for auth
import { useNavigate } from "react-router-dom"; // chnaging webpages
import { useEffect, useState } from "react";

import Button from "@mui/material/Button"; // "add a new dowment" button
import Add from "@mui/icons-material/Add";

import { database } from "../firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify"; // notification banners 
import "react-toastify/dist/ReactToastify.css";

export default function Home({ database }) {
  let databaseCollection = collection(database, "docs-data");
  let userEmail = localStorage.getItem("userEmail");

  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);

  let auth = getAuth();
  let navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then(() => {
      navigate("/"); // going to the homepage once logged out
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        // we are logged in
        // navigate to the homepage.
        navigate("/home");
      } else {
        // we are not logged in
        navigate("/"); // go to the login page
      }
    });
  }, []);

  const addDocs = () => { // EMpty document in the database after it is created w/ a title 
    addDoc(databaseCollection, {
      title: title,
      author: userEmail,
      body: ""
    })
      .then((response) => {
        toast.success("New document created", { // notify
          autoClose: 1000
        });
        setIsAdd(false);
        setTitle("");
      })
      .catch(() => {
        toast.error("Error creating new document", {
          autoClose: 1000
        });
      });
  };

  const openEditor = (id) => {
    navigate(`/editor/${id}`); // changing to the editor page w/ the document w/ unique id
  };

  useEffect(() => {
    onSnapshot(databaseCollection, (response) => {
      setDocsData(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="logout-container">
        <button className="logout-btn" onClick={logOut}> // Logging out 
          Log Out{" "}
        </button>
      </div>
      <Button
        // do the addDocs function
        onClick={() => setIsAdd(!isAdd)} // when clicking "Create a new Document" then "add item" will allow input
        variant="outlined"
        startIcon={<Add />}
      >Create A new Document
      </Button>
      {!isAdd ? (
        <div className="title-input"> 
          <input
            placeholder="Title" // add title to the new document 
            className="add-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button className="add-btn" onClick={addDocs}>
            {" "}
            Add{" "}
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="grid-main"> 
        {docsData.map((doc) => { 
          return ( // displaying the document in a grid-like manner
            <div className="grid-child" onClick={() => openEditor(doc.id)}>
              <h3>{doc.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}