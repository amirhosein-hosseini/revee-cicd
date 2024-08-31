import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton, OutlineBlackButton } from "../button";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { domain } from "../../api/domain";
import { getCookie, setCookie } from "../../api/auth";
import { toast } from "react-toastify";
import { googleLogin } from "../../api/user";

import { useRouter } from 'next/router';
import Link from "next/link";


const Login = () => {

    const router = useRouter();
    const { code } = router.query;


    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const code = searchParams.get('code');
    const token = getCookie("token")
    const { signIn } = useAuth();
    const [showPass , setShowPass] = useState("password");
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {

        setLoading(true)
        e.preventDefault();


        axios.post(domain + 'accounts/login/', formData)
            .then((response) => {
                setCookie("rtoken" , response?.data?.refresh , 7);
                signIn(response?.data?.access);
                setLoading(false)
                toast.success("welcome to healfit")
            })
            .catch((error) => {
                setError(error.response.data)
                setLoading(false)
                if(error?.response?.data === "user invalid"){
                    toast.error(error?.response?.data)
                }
            })
            .finally(() => {
                setLoading(false)
            });
    };


    useEffect(() => {
            axios.post(domain + 'accounts/auth/google/' , {"code" : code})
            .then((response) => {
                setCookie("rtoken" , response?.data?.refresh , 7);
                signIn(response?.data?.access);
                setLoading(false)
                toast.success("welcome to healfit")
            })
            .catch((error) => {
                setError(error.response.data)
                setLoading(false)
                if(error?.response?.data === "user invalid"){
                    toast.error(error?.response?.data)
                }
            })
            .finally(() => {
                setLoading(false)
            });
    } , [code])


    const handleShowPassword = () => {
        if(showPass == "password"){
            setShowPass("text")
        }else if(showPass == "text"){
            setShowPass("password")
        }
    }


    const handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=404588717147-739as16dm0mu3n6u3un0d45f99qefmov.apps.googleusercontent.com&redirect_uri=https://healfit.ae/login/&scope=email%20profile&access_type=online";
    }

    

    
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
                            {error?.email ? 
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={"redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"}
                                    placeholder="EMAIL*"
                                /> :
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="EMAIL*"
                                />
                            }

                            {error?.email && <p className="text-xs text-[#ff0000] mt-1">{error?.email}</p>}
                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.password ? 
                                <input
                                    type={showPass}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="PASSWORD*"
                                /> : 
                                <input
                                    type={showPass}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="PASSWORD*"
                                />
                            }

                            {error?.password && <p className="text-xs text-[#ff0000] mt-1">{error?.password}</p>}
                            <svg onClick={handleShowPassword} className="absolute right-3 top-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.25 9.14999C18.94 5.51999 15.56 3.42999 12 3.42999C10.22 3.42999 8.49 3.94999 6.91 4.91999C5.33 5.89999 3.91 7.32999 2.75 9.14999C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.14999ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.76999 9.76 7.95999 12 7.95999C14.24 7.95999 16.04 9.76999 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z" fill="black"/>
                                <path d="M11.9999 9.14C10.4299 9.14 9.1499 10.42 9.1499 12C9.1499 13.57 10.4299 14.85 11.9999 14.85C13.5699 14.85 14.8599 13.57 14.8599 12C14.8599 10.43 13.5699 9.14 11.9999 9.14Z" fill="black"/>
                            </svg>
                        </div>
                    </form>
                    <div className={styles.forget + " w-1/2 max-md:w-11/12 mt-4"}>
                        <Link href={"/forgot-pass"}>
                            <p className="text-xs text-left">
                                Forgotten Your  Password?
                            </p>
                        </Link>
                    </div>
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
                                    LOGIN
                                </BluePrimaryButton>
                            }
                        </div>
                        <div className="grid w-full">
                            <Link href={"/signin"}>
                                <OutlineBlackButton>
                                    SIGN UP
                                </OutlineBlackButton>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.social + " mt-7  max-md:w-11/12"}>
                        <button className="flex max-md:justify-center text-sm max-md:w-3/4 max-md:mx-auto w-full rounded-lg bg-white text-[#0000008A] py-2 px-3 gap-3" onClick={handleGoogleLogin}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <rect width="17.9417" height="17.9417" transform="translate(0.213623 0.213572)" fill="white"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4375 9.37982C17.4375 8.77021 17.3828 8.18404 17.2812 7.62133H9.18433V10.9468H13.8111C13.6118 12.0215 13.0061 12.932 12.0956 13.5416V15.6987H14.874C16.4997 14.202 17.4375 11.998 17.4375 9.37982Z" fill="#4285F4"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.18436 17.7814C11.5056 17.7814 13.4516 17.0116 14.8741 15.6985L12.0956 13.5415C11.3258 14.0573 10.3411 14.3621 9.18436 14.3621C6.94522 14.3621 5.04995 12.8498 4.37391 10.8178H1.50171V13.0452C2.91632 15.8549 5.82369 17.7814 9.18436 17.7814Z" fill="#34A853"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37402 10.8179C4.20208 10.3021 4.10439 9.7511 4.10439 9.18448C4.10439 8.61785 4.20208 8.06686 4.37402 7.55103V5.32361H1.50182C0.919562 6.48421 0.587402 7.79722 0.587402 9.18448C0.587402 10.5717 0.919562 11.8847 1.50182 13.0453L4.37402 10.8179Z" fill="#FBBC05"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.18437 4.00665C10.4466 4.00665 11.5798 4.44041 12.4708 5.2923L14.9366 2.8265C13.4477 1.43925 11.5017 0.587358 9.18437 0.587358C5.82369 0.587358 2.91632 2.51388 1.50171 5.32356L4.37391 7.55099C5.04995 5.51895 6.94522 4.00665 9.18437 4.00665Z" fill="#EA4335"/>
                            </svg>
                            Sign In with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;