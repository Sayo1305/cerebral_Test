import React, { useEffect, useState } from "react";
import LOGO from "../assets/icon.svg";
import BG from "../assets/BGLOG.png";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Swal from "sweetalert2";
import { auth, db } from "../firebase";
import { uid } from "uid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {ref , set} from "firebase/database";
const SignPage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [disabledbutton, setdisabledbutton] = useState(true);
  const [showpassword, setshowpassword] = useState(false);
  const [correctpassword, setcorrectpassword] = useState(false);
  const [showpasswordrule, setshowpasswordrule] = useState(false);
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/),
    repeat_password: Joi.ref("password"),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  const handle_click = async() => {
    try{
     await schema.validateAsync({ username: name, email : email , password : password });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const uniqueId = uid(16);
          localStorage.setItem("CerebralId", uniqueId);
          // const user = userCredential.user;
          set(ref(db, `Users/${uniqueId}`), {
            id: uniqueId,
            name: name,
            email: email,
          });
          Toast.fire({
            title: "SignIn sucessfully (redirecting to home page)",
            icon: "success",
          });
          setTimeout(() => {
            navigate('/');
          }, 3000);

        })
        .catch((error) => {
          Toast.fire({
            title: "already user exist",
            icon: "error",
          });
          console.log(error);
        });
    }catch(err){
      Toast.fire({
        icon: 'error',
        text : err,
        timer : 3000,
        timerProgressBar: true,
      })
    }
  };
  function hasUpperAndLower(str) {
    return /[a-z]/.test(str) && /[A-Z]/.test(str);
  }
  function hasDigit(str) {
    return /\d/.test(str);
  }
  function hasSpecialCharacter(str) {
    return /[^\w\s]/.test(str);
  }
  useEffect(() => {
    if (password.length === 0) {
      setdisabledbutton(true);
    } else {
      setdisabledbutton(false);
    }
    if (
      password.length >= 8 &&
      hasDigit(password) &&
      hasUpperAndLower(password) &&
      hasSpecialCharacter(password)
    ) {
      setshowpasswordrule(false);
      setcorrectpassword(true);
    } else {
      setshowpasswordrule(true);
      setcorrectpassword(false);
    }
  }, [password]);
  return (
    <div className="w-full md:p-10 p-5 min-h-screen flex lg:flex-row flex-col lg:justify-center items-center">
      <div className="lg:w-1/2 w-full flex flex-col gap-5">
        <div className="lg:h-[50px] w-[100px]">
          <img onClick={()=>{navigate('/')}} className="w-full h-full" src={LOGO} alt="logo" />
        </div>
        <div className="lg:h-[80vh] relative h-[40vw] lg:w-5/6 w-full bg-cover">
          <img className="w-full rounded-3xl h-full" src={BG} alt="" />
          <div className="absolute w-1/2  top-[10%] left-[20%] text-white font-semibold text-center text-lg md:text-4xl">
            Therapists when you need them
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center gap-2 lg:p-5">
        <div className="text-center md:text-3xl text-md font-bold">
          Find your path forward
        </div>
        <div className="text-center text-sm">
          Take the next step toward rediscovering your best self
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          {name && name.length !== 0 && (
            <div className="md:w-2/3  w-full flex justify-start">Name</div>
          )}
          <input
            onChange={(e) => {
              setname(e.target.value);
            }}
            value={name}
            className="md:w-2/3 w-full rounded-2xl outline-none border border-blue-200 shadow-sm p-5"
            type="text"
            placeholder="Name"
          />
          {email && email.length !== 0 && (
            <div className="md:w-2/3  w-full flex justify-start">
              Email Address
            </div>
          )}
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
            className="md:w-2/3 w-full rounded-2xl outline-none border border-blue-200 shadow-sm p-5"
            type="email"
            placeholder="Email"
          />
          {password && password.length !== 0 && (
            <div className="md:w-2/3 w-full flex justify-start">password</div>
          )}
          <div className="md:w-2/3 w-full relative">
            <input
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              onFocus={() => {
                setshowpasswordrule(true);
              }}
              value={password}
              className="w-full rounded-2xl outline-none border border-blue-200 shadow-sm p-5"
              type={showpassword ? "text" : "password"}
              placeholder="Password"
            />
            <div
              className="absolute right-[5px] top-[25px]"
              onClick={() => {
                setshowpassword(!showpassword);
              }}
            >
              {showpassword === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#6786FF"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#6786FF"
                  className="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              )}
            </div>
            {showpasswordrule === true && (
              <div
                className={`w-full flex p-3 rounded-2xl flex-col text-[12px] ${
                  correctpassword === true ? "bg-[#d5fce3]" : "bg-[#faeded]"
                } `}
              >
                <div>Your password must include</div>
                <div className="flex gap-2">
                  <div
                    className={`font-semibold ${
                      password.length <= 8 ? "text-red-800" : "text-green-800"
                    }`}
                  >
                    {password.length <= 8 ? "X" : "🗸"}
                  </div>
                  <div> be at least 8 characters long</div>
                </div>
                <div className="flex gap-2">
                  <div
                    className={`font-semibold ${
                      hasUpperAndLower(password) === false
                        ? "text-red-800"
                        : "text-green-800"
                    }`}
                  >
                    {hasUpperAndLower(password) === false ? "X" : "🗸"}
                  </div>
                  <div> include both upper and lower case letters</div>
                </div>
                <div className="flex gap-2">
                  <div
                    className={`font-semibold ${
                      hasDigit(password) === false
                        ? "text-red-800"
                        : "text-green-800"
                    }`}
                  >
                    {hasDigit(password) === false ? "X" : "🗸"}
                  </div>
                  <div> include at least 1 number</div>
                </div>
                <div className="flex gap-2">
                  <div
                    className={`font-semibold ${
                      hasSpecialCharacter(password) === false
                        ? "text-red-800"
                        : "text-green-800"
                    }`}
                  >
                    {hasSpecialCharacter(password) === false ? "X" : "🗸"}
                  </div>
                  <div> include at least 1 special symbol like ! $ @ + %</div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="md:w-2/3 w-full text-sm flex justify-end">
            <div className="text-blue-800 underline cursor-pointer">
              forget your password?
            </div>
          </div> */}
          <div
            onClick={() => {
              handle_click();
            }}
            className={`${
              disabledbutton === true ? "bg-[#D1D3D7]" : "bg-[#51459E]"
            } py-4 px-20 rounded-3xl cursor-pointer text-white`}
          >
            Continue
          </div>
          <div
            onClick={() => {
              navigate("/app/Login");
            }}
            className="font-semibold  text-sm "
          >
            Already have an account?
            <span className="text-[#385ADE]  underline cursor-pointer">
              {" "}
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
