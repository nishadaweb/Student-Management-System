import { useState } from "react";
import "./Forminput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label style={{ margin: "8px" }}>{label}</label>
      <input
        style={{ margin: "0" }}
        className="logininput"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="err">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
