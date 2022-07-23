import { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Editor({ database }) {
  let navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState(""); // to see the document title when you open a certain document
  let databaseCollection = collection(database, "docs-data");
  let params = useParams();
  //console.log(params.id);

  const getEditorData = (value) => {
    setEditorData(value);
  };
  useEffect(() => {
    const updateDocument = setTimeout(() => {
      //console.log(editorData);
      let docToUpdate = doc(databaseCollection, params.id);
      updateDoc(docToUpdate, {
        body: editorData
      })
        .then(() => {
          toast.success("Document Updated", {
            autoClose: 1000
          });
        })
        .catch(() => {
          toast.error("Document cannot be updated");
        });
    }, 1000);
    return () => clearTimeout(updateDocument);
  }, [editorData]);

  useEffect(() => {
    const document = doc(databaseCollection, params.id);
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title);
      setEditorData(docs.data().body);
    });
  }, []);

  return (
    <div>
      <div>
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
