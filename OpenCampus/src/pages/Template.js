import React from "react";
import frameImage from "../assets/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";

const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
  return (
    <div className="bg-gray-900 w-screen h-screen overflow-hidden">
      <div className="flex  justify-between w-11/12 max-w-[1160px] pt-16 mx-auto gap-x-12 gap-y-0 text-white">
        <div className="w-11/12 max-w-[450px]">
          <h1 className="text-richblack-5 text-white font-semibold text-[1.875rem] leading-[2.375rem]">
            {title}
          </h1>

          <p className="text-[1.125rem] leading[1.625rem] mt-4">
            <span className="text-richblack-100">{desc1}</span>
            <br />
            <span className="text-blue-500 italic">{desc2}</span>
          </p>

          {formtype === "signup" ? (
            <SignupForm setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}

          <div className="flex w-full items-center my-4 gap-x-2">
            <div className="w-full h-[1px] bg-richblack-700"></div>
            <p className="text-richblack-700 font-medium leading[1.375rem]">
              OR
            </p>
            <div className="w-full h-[1px] bg-richblack-700"></div>
          </div>

          <button
            className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
                            border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 "
          >
            
            <Link to="/admin-login" className="flex items-center gap-2">
              <MdAdminPanelSettings className=" text-3xl"/>
              <p>Admin Previlages</p>
            </Link>
          </button>
        </div>

        <div className="relative w-11/12 max-w-[450px] ">
          <img
            src={frameImage}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />

          <img
            src={image}
            alt="Students"
            width={558}
            height={490}
            loading="lazy"
            className="absolute -top-4 right-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
