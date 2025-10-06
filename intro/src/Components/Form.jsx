import React, { useState } from "react";
// keep your existing import
import ErrorIcon from "../assets/images/icon-error.svg";

export default function Form() {
  const [values, setValues] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const [isExampleEmail, setIsExampleEmail] = useState(false);

  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    if (field === "email" && isExampleEmail) {
      setIsExampleEmail(false);
    }
    setValues((s) => ({ ...s, [field]: val }));
    // keep clearing the error visually while typing
    setErrors((s) => ({ ...s, [field]: "" }));
  };

  const validateField = (field, value) => {
    if (field === "first") {
      if (!String(value || "").trim()) return "First Name cannot be empty";
    }
    if (field === "last") {
      if (!String(value || "").trim()) return "Last Name cannot be empty";
    }
    if (field === "password") {
      if (!String(value || "").trim()) return "Password cannot be empty";
    }
    if (field === "email") {
      const v = String(value || "").trim();
      if (!v) return "Looks like this is not an email";
      const at = v.indexOf("@");
      const dot = v.lastIndexOf(".");
      if (at <= 0 || dot <= at + 1) return "Looks like this is not an email";
    }
    return "";
  };

  // validateAll now returns the newly computed errors object and boolean validity
  const validateAll = () => {
    const newErrors = {
      first: validateField("first", values.first),
      last: validateField("last", values.last),
      email: validateField("email", values.email),
      password: validateField("password", values.password),
    };

    console.log("Validation errors:", newErrors);

    // mimic screenshot: if email empty then show example text
    if (!String(values.email || "").trim() && newErrors.email) {
      setValues((s) => ({ ...s, email: "email@example/com" }));
      setIsExampleEmail(true);
    }

    // Ensure the errors are set in state
    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some(Boolean);
    return { isValid, newErrors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted, current values:", values);
    const { isValid, newErrors } = validateAll();
    console.log("Validation result:", { isValid, newErrors });

    if (isValid) {
      // do submit logic
      console.log("Form valid. Submitting values:", values);
      return;
    }

    // focus first invalid field using the freshly computed newErrors object
    const order = ["first", "last", "email", "password"];
    for (const k of order) {
      if (newErrors[k]) {
        const el = document.querySelector(`[name="${k}"]`);
        if (el) {
          el.focus();
          // optionally set cursor to start if email example is present
          if (k === "email" && isExampleEmail) {
            el.setSelectionRange(0, 0);
          }
        }
        break;
      }
    }
  };

  const handleFocus = (field) => (e) => {
    if (field === "email" && isExampleEmail) {
      setValues((s) => ({ ...s, email: "" }));
      setIsExampleEmail(false);
    }
    setErrors((s) => ({ ...s, [field]: "" }));
  };

  return (
    <div className="w-[40rem] h-[40rem] mb-[3rem] sm:mb-[0rem] flex flex-col justify-center items-center  relative">
      <div className="bg-[#5d54a3] text-[#ffffff] flex justify-center items-center relative top-[-1rem] w-full h-[6rem] md:h-[3rem] rounded-[0.5rem] shadow-[0_10px_0_rgba(0,0,0,0.10),0_10px_30px_rgba(0,0,0,0.20)]">
        <p className="text-center">
          <b className="px-1">Try it free 7 days</b> then $20/mo. thereafter
        </p>
      </div>

      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="form-section flex flex-col justify-center items-center md:p-10 p-6 bg-[#ffffff] w-full  md:h-[30rem] gap-6 rounded-[0.5rem] shadow-[0_10px_0_rgba(0,0,0,0.10),0_10px_30px_rgba(0,0,0,0.20)]"
        noValidate
      >
        {/* First Name */}
        <div className="w-full relative">
          <input
            name="first"
            type="text"
            placeholder="First Name"
            value={values.first}
            onChange={handleChange("first")}
            onFocus={handleFocus("first")}
            className={`w-full h-[4rem] md:h-[3rem] rounded-[0.5rem] border-solid border-[0.15rem] pl-5
              ${errors.first ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.first && (
            <>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src={ErrorIcon} alt="" />
              </span>
              <small className="absolute py-1 top-14 md:top-11 right-4 text-sm italic text-red-500 mt-1">
                {errors.first}
              </small>
            </>
          )}
        </div>

        {/* Last Name */}
        <div className="w-full relative">
          <input
            name="last"
            type="text"
            placeholder="Last Name"
            value={values.last}
            onChange={handleChange("last")}
            onFocus={handleFocus("last")}
            className={`w-full h-[4rem] md:h-[3rem] rounded-[0.5rem] border-solid border-[0.15rem] pl-5
              ${errors.last ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.last && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={ErrorIcon} alt="" />
            </span>
          )}
          {errors.last && (
            <small className="absolute py-1 top-14 md:top-11 right-4 text-sm italic text-red-500 mt-1">
              {errors.last}
            </small>
          )}
        </div>

        {/* Email */}
        <div className="w-full relative">
          <input
            name="email"
            type="text" // keep text so example can appear
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange("email")}
            onFocus={handleFocus("email")}
            className={`w-full h-[4rem] md:h-[3rem] rounded-[0.5rem] border-solid border-[0.15rem] pl-5
              ${errors.email ? "border-red-400 text-red-600 placeholder-red-600" : "border-gray-200"}`}
          />
          {errors.email && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={ErrorIcon} alt="" />
            </span>
          )}
          {errors.email && (
            <small className="absolute py-1 top-14 md:top-11 right-4 text-sm italic text-red-500 mt-1">
              {errors.email}
            </small>
          )}
        </div>

        {/* Password */}
        <div className="w-full relative">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange("password")}
            onFocus={handleFocus("password")}
            className={`w-full h-[4rem] md:h-[3rem] rounded-[0.5rem] border-solid border-[0.15rem] pl-5
              ${errors.password ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.password && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img src={ErrorIcon} alt="" />
            </span>
          )}
          {errors.password && (
            <small className="absolute py-1 top-14 md:top-11 right-4 text-sm italic text-red-500 mt-1">
              {errors.password}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-[4rem] md:h-[3rem] rounded-[0.5rem] bg-[#37cc8a] text-white uppercase font-semibold shadow-[0_10px_0_rgba(0,0,0,0.10),0_10px_30px_rgba(0,0,0,0.20)]"
        >
          Claim your free trial
        </button>

        <p className="text-center w-full text-[0.8rem]">
          By clicking the button, you are agreeing to our
          <a href="#" className="text-red-700 pl-1 font-medium">
            Terms and Services
          </a>
        </p>
      </form>
    </div>
  );
}
