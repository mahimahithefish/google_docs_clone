import { useState, useEffect } from "react";

import ReactQuill from "react-quill"; // used for the editor window
import "react-quill/dist/quill.snow.css"; 
import { useNavigate, useParams } from "react-router-dom"; // for changing pages 
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify"; // notification banners 
import "react-toastify/dist/ReactToastify.css"; // notification banners

export default function Editor({ database }) {
  let navigate = useNavigate(); // changing pages 

  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState(""); // to see the document title when you open a certain document
  let databaseCollection = collection(database, "docs-data");
  let params = useParams();

  const getEditorData = (value) => {
    setEditorData(value);
  };
  useEffect(() => {
    const updateDocument = setTimeout(() => { // automatically saves doc after typing something
      let docToUpdate = doc(databaseCollection, params.id);
      updateDoc(docToUpdate, {
        body: editorData
      })
        .then(() => {
          toast.success("Document Updated", { // notify that document has been updated
            autoClose: 1000  // closing banner after 1 sec
          });
        })
        .catch(() => {
          toast.error("Document cannot be updated");
        });
    }, 1000);
    return () => clearTimeout(updateDocument);
  }, [editorData]);

  useEffect(() => {
    const document = doc(databaseCollection, params.id); // isntance of one doc
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title); // Displaying the document title when doc is opened
      setEditorData(docs.data().body);
    });
  }, []);

  
  return (
    <div>
      <div>
        // Navigating back to the home page
        <button className="back-btn" onClick={() => navigate("/home")}> 
          Back 
        </button>
      </div>
      <ToastContainer />
      <h3>{title}</h3>
      <ReactQuill value={editorData} onChange={getEditorData} />
    </div>
  );
}
