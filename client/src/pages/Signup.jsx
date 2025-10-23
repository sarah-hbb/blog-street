import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const [errorMessage, setErrorMesssage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (
      formData.email === "" ||
      formData.username === "" ||
      formData.password === ""
    ) {
      setErrorMesssage("Please fill out all fields!");
      return;
    }
    try {
      setLoading(true);
      setErrorMesssage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMesssage(data.message);
        setLoading(false);
        return;
      }

      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMesssage(error.message);
      setLoading(false);
    }
  };

  return (
    <AuthForm
      page={"signup"}
      onSubmitForm={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};

export default Signup;
