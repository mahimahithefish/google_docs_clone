import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import {
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
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        //console.log(res.user);
        localStorage.setItem("userEmail", res.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      // console.log(response);
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
    <div className="google-btn">
      <GoogleButton onClick={signIn} />
    </div>
  );
}
