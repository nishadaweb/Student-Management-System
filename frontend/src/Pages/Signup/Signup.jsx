import { useState, useEffect } from "react";
import "./Signup.css";
import FormInput from "../../Component/FormInput/Forminput";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../api/AuthRequest";
const SignUp = () => {
  // const msg = useSelector((state) => state.authReducer.message);
  // console.log(msg, "jhdhd");
  const [errmsg, setErrMsg] = useState("");
  // useEffect(() => {
  //   console.log(msg, "latesterr");
  //   if (msg) setErrMsg(msg);
  // }, [msg]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "subject",
      type: "text",
      placeholder: "Subject",
      errorMessage: "It should be a subject!",
      label: "Subject",
      required: true,
    },

    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];
  // const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await signUp(values);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  };

  const onChange = (e) => {
    setErrMsg("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        {/* {errmsg && (
          <p style={{ color: "red", textAlign: "center" }}>{errmsg}</p>
        )} */}
        <h1>TEACHER SIGNUP</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="submitBtn" onClick={handleSubmit}>
          Sign up
        </button>
        <span
          style={{
            fontSize: "15px",
            cursor: "pointer",
            display: "inline",
            color: "black",
          }}
        >
          Already have an account??
          <span
            style={{ color: "blue", display: "inline" }}
            onClick={() => navigate("/login")}
          >
            LOGIN
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
