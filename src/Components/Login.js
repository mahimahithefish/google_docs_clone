import GoogleButton from "react-google-button"; // gogole sign-in button 
import { useNavigate } from "react-router-dom"; // allows changing to a different web page
import { // Use firebase functions that allows for authorization of google accounts
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

import { useEffect } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect"; 

export default function Login() {
  let navigate = useNavigate();

  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, googleProvider) // opening a pop-up window for signing into google account 
      .then((res) => {
        localStorage.setItem("userEmail", res.user.email); // user-email stored in local database
      })
      .catch((error) => {
        console.log(error);
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
  return (
    <div className="google-btn"> // sign-in when clicked the google button 
      <GoogleButton onClick={signIn} /> 
    </div>
  );
}
