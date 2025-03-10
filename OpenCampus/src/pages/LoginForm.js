import React, { useState, useCallback, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        erno: "",
        password: "",
    });

    // Prevent logged-in users from accessing the login page
    useEffect(() => {
        if (localStorage.getItem("loggedInUser")) {
            navigate("/");
        }
    }, [navigate]);

    // Prevent back navigation
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

    // Optimized Change Handler
    const changeHandler = useCallback((event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }, []);

    // Optimized Submit Handler
    const submitHandler = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);

            try {
                const response = await fetch(
                    "https://login--data-default-rtdb.firebaseio.com/data.json"
                );
                const data = await response.json();

                let userFound = false;
                for (const key in data) {
                    if (data[key].erno === formData.erno) {
                        userFound = true;
                        if (data[key].password === formData.password) {
                            toast.success("Login Successful!");
                            setIsLoggedIn(true);

                            // Store logged-in user ID in localStorage
                            localStorage.setItem("loggedInUser", data[key].erno);

                            // Redirect to home page
                            navigate("/");

                            // Prevent back navigation
                            window.history.pushState(null, null, window.location.href);
                            window.onpopstate = () => {
                                window.history.go(1);
                            };

                            return;
                        } else {
                            toast.error("Incorrect Password!");
                            return;
                        }
                    }
                }

                if (!userFound) {
                    toast.error("User Not Found");
                }
            } catch (error) {
                toast.error("Login failed, please try again.");
            } finally {
                setLoading(false);
            }
        },
        [formData, setIsLoggedIn, navigate]
    );

    return (
        <>
            <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
                {/* Enrollment Number */}
                <label className="w-full">
                    <p className="flex text-[0.875rem] mb-1 leading-[1.375rem]">
                        Enrollment No<sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        value={formData.erno}
                        onChange={changeHandler}
                        placeholder="Enter ER No"
                        name="erno"
                        className="bg-black-400 rounded-[0.5rem] text-black w-full p-[12px]"
                    />
                </label>

                {/* Password Field */}
                <label className="w-full relative">
                    <p className="flex text-[0.875rem] mb-1 leading-[1.375rem]">
                        Password<sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        name="password"
                        className="bg-richblack-800 rounded-[0.5rem] text-black w-full p-[12px]"
                    />
                    <span
                        className="absolute right-3 top-[38px] cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                    <Link to="/signup">
                        <p className="text-xs mt-1 text-blue-400 max-w-max ml-auto">
                            Register Now
                        </p>
                    </Link>
                </label>

                {/* Submit Button */}
                <button className="bg-yellow-400 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            {loading && <Spinner />} {/* Show spinner when loading */}
        </>
    );
};

export default LoginForm;
