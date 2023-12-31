import React, { useEffect, useState } from "react";
import LOGO from "../assets/icon.svg";
import BG from "../assets/BGLOG.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
const LoginPage = () => {
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
  const [disabledbutton, setdisabledbutton] = useState(true);
  const [showpassword, setshowpassword] = useState(false);
  useEffect(() => {
    if (password.length === 0) {
      setdisabledbutton(true);
    } else {
      setdisabledbutton(false);
    }
  }, [password]);
  const WritetoBrowser = (email) => {
    const data = query(ref(db, "Users"), orderByChild("email"), equalTo(email));
    get(data).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        Toast.fire({
          title: "SignIn sucessfully (redirecting to home page)",
          icon: "success",
        });
        const keys = Object.keys(data);
        localStorage.setItem("CerebralId", data[keys[0]]?.id);
        setTimeout(() => {
          navigate("/");
        }, [3000]);
      } else {
        Toast.fire({
          title: "Try again, Something is went wrong",
          icon: "warning",
        });
      }
    });
  };
  const handle_click = ()=>{
    console.log("handle_click")
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user.email);
      WritetoBrowser(user.email);
    })
    .catch((error) => {
      Toast.fire({
        title: "Wrong password / Email",
        icon: "error",
      });
    });
  }
  return (
    <div className="w-full md:p-10 p-5 min-h-screen flex lg:flex-row flex-col lg:justify-center items-center">
      <div className="lg:w-1/2 w-full flex flex-col gap-5">
        <div className="lg:h-[50px] w-[100px]">
          <img onClick={()=>{navigate('/')}} className="w-full h-full" src={LOGO} alt="logo" />
        </div>
        <div className="lg:h-[80vh] relative h-[40vw] lg:w-5/6 w-full bg-cover">
          <img className="w-full rounded-3xl h-full" src={BG} alt="" />
          <div className="absolute w-1/2  top-[10%] left-[20%] text-white font-semibold text-center text-lg md:text-4xl">Therapists when you need them</div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center gap-2 lg:p-5">
        <div className="text-center md:text-3xl text-md font-bold">
        Log in to your account.
        </div>
        {/* <div className="text-center text-sm">
          Take the next step toward rediscovering your best self
        </div> */}
        <div className="w-full flex flex-col items-center gap-2">
          {email && email.length !== 0 && (
            <div className="md:w-2/3  w-full flex justify-start">Email Address</div>
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
              value={password}
              className="w-full rounded-2xl outline-none border border-blue-200 shadow-sm p-5"
              type={showpassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <div
              className="absolute right-[5px] top-1/3"
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
          </div>

          <div className="md:w-2/3 w-full text-sm flex justify-end">
            <div className="text-blue-800 underline cursor-pointer">
              forget your password?
            </div>
          </div>
          <div
          onClick={()=>{ if(disabledbutton === false){handle_click()}}}
            className={`${
              disabledbutton === true ? "bg-[#D1D3D7]" : "bg-[#51459E]"
            } py-5 px-10 rounded-3xl cursor-pointer text-white`}
          >
            Log in to my account
          </div>
          <div onClick={()=>{navigate('/app/SignUp')}} className="text-[#385ADE] underline font-semibold  text-sm cursor-pointer">I don't have an account</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
