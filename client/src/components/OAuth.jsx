import Button from "./ui/Button";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // save user infor from result of google auth to the backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
        }),
      });
      //console.log(resultsFromGoogle);
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate(from, { replace: true, state: { fromSignin: true } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button variant="secondary" onClick={handleGoogleClick} type="button">
      <div className=" inline-flex">
        <FcGoogle className=" text-2xl mr-4" />
        Continue with Google
      </div>
    </Button>
  );
};

export default OAuth;
