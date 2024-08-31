import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton, OutlineBlackButton } from "../button";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { domain } from "../../api/domain";
import { getCookie, setCookie } from "../../api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

const ResetPassword = () => {

    const { signIn } = useAuth();
    const [showPass , setShowPass] = useState("password");
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
    });


    const router = useRouter();
    const { token } = router.query;
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const token = serach.get('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {

        setLoading(true)
        e.preventDefault();


        axios.post(domain + 'password_reset/confirm/', {"password" : formData?.password , "token" : token})
            .then((response) => {
                if(response?.data?.status == "OK"){
                    toast.success("Password Has Been Changed")
                    router.push("/login")
                }
            })
            .catch((error) => {
                setError(error.response.data)
                setLoading(false)
            })
            .finally(() => {
                console.log("final")
                setLoading(false)
            });
    };



    
    return(
        <div className={styles.login + " relative h-screen"}>
            <div className={styles.back + " absolute top-5 left-5 z-50"}>
                <Link href={"/"}>
                    <svg className="w-6 fill-white max-md:fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </Link>
            </div>
            <div className={styles.loginwrapper + " flex items-center h-full"}>
                <div className={styles.login__image + " w-2/5 max-md:hidden overflow-hidden h-full"}>
                    <img className="object-cover w-full h-full" src="../../images/login.png" alt="image" />
                </div>
                <div className={styles.form + " w-3/5 max-md:w-full flex justify-center items-center flex-col"}>
                    <form className="w-1/2 max-md:w-11/12 m-x-auto flex justify-center items-center flex-col gap-4">
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.password ? 
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={"redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                    placeholder="New Password*"
                                /> :
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="New Password*"
                                />
                            }

                            {error?.password && <p className="text-xs text-[#ff0000] mt-1">{error?.password}</p>}
                        </div>
                    </form>
                    <div className={styles.button + " w-1/2 max-md:w-11/12 mt-5 flex justify-between items-center flex-col gap-4"}>
                        <div className="grid w-full" onClick={handleSubmit}>
                            {loading == true? 
                                <BluePrimaryButton>                                
                                    <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                    </svg>
                                    Processing...
                                </BluePrimaryButton>
                                    :
                                <BluePrimaryButton>
                                    Change Password
                                </BluePrimaryButton>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;