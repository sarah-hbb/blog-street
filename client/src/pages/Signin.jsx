import { useLocation, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm";

const Signin = () => {
  // const [errorMessage, setErrorMesssage] = useState(null);
  // const [loading, setLoading] = useState(false);
  // 🌐🌐🌐 instead: using global state from userSlice
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    if (formData.email === "" || formData.password === "") {
      //setErrorMesssage(""); 🌐🌐🌐
      return dispatch(signInFailure("Please fill out all the fields!"));
    }
    try {
      // setLoading(true);
      // setErrorMesssage(null);
      // 🌐🌐🌐
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false)
        // setErrorMesssage(data.message);
        //🌐🌐🌐
        dispatch(signInFailure(data.message));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate(from, { replace: true, state: { fromSignin: true } });
      }
    } catch (error) {
      // setErrorMesssage(error.message);
      // setLoading(false);
      //🌐🌐🌐
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <AuthForm
      page={"signin"}
      onSubmitForm={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};

export default Signin;
