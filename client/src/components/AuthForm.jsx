import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import TextLink from "../components/ui/TextLink";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import OAuth from "../components/OAuth";
import bg from "../assets/bg.jpg";

function AuthForm({ page, onSubmitForm, errorMessage, loading }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [submitClicked, setSubmitClicked] = useState(false);

  const handleChange = (e) => {
    setFormData((prvFormData) => ({
      ...prvFormData,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    onSubmitForm(formData);
  };

  return (
    <div className={`relative flex items-center justify-center`}>
      <img
        src={bg}
        class="absolute inset-0 w-full h-full object-cover blur-sm brightness-[50%] flex items-center justify-center "
      />

      <div
        className="sm:p-20 p-4 flex flex-col max-w-3xl mx-auto my-10 z-10 bg-cyan-950 bg-opacity-50
        gap-4 justify-center rounded md:shadow-md md:shadow-slate-500"
      >
        <form
          className="flex flex-col justify-between gap-4 "
          onSubmit={handleSubmit}
        >
          {page === "signup" && (
            <Input
              value={formData.username}
              id="username"
              type="text"
              label="Your Username"
              onChange={handleChange}
              borderError={submitClicked && formData.username === ""}
            />
          )}
          <Input
            value={formData.email}
            id="email"
            type="email"
            label="Your Email"
            onChange={handleChange}
            borderError={submitClicked && formData.email === ""}
          />
          <Input
            value={formData.password}
            id="password"
            type="password"
            label="Your Password"
            onChange={handleChange}
            borderError={submitClicked && formData.password === ""}
          />
          {errorMessage && <h2 className="text-red-600">{errorMessage}</h2>}
          <Button disabled={loading} type="submit" variant="primary">
            {loading ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner size={"small"} />
                <span className="text-cyan-800 ml-3">Loading ...</span>
              </div>
            ) : page === "signup" ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <OAuth />
        <h3>
          {page === "signup" ? "Have an account?" : " Don't have an account?"}

          <span>
            {page === "signup" ? (
              <TextLink path={"/signin"} className={"text-blue-400"}>
                {" "}
                Sign in
              </TextLink>
            ) : (
              <TextLink path={"/signup"} className="text-blue-400 self-start">
                {" "}
                Sign up
              </TextLink>
            )}
          </span>
        </h3>
      </div>
    </div>
  );
}

export default AuthForm;
