import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton, DeBluePrimaryButton, OutlineBlackButton } from "../button";
import { domain } from "../../api/domain";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { setCookie } from "../../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import Link from "next/link";

const Signin = () => {

    const { signIn } = useAuth();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        company_name: "",
        trn_number: "",
    });
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState("individual");



  
    const handleCheckboxChange = (event) => {
      if (event.target.id === "vehicle2") {
        setIsChecked1(event.target.checked);
      } else if (event.target.id === "vehicle3") {
        setIsChecked2(event.target.checked);
      }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {


        setLoading(true)
        e.preventDefault();


        axios.post(domain + 'accounts/register/', formData)
            .then((response) => {
                setCookie("rtoken" , response?.data?.refresh , 7);
                signIn(response?.data?.access);
                toast.success("welcome to healfit");
                setLoading(false)
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


    // handle chaning value of individual or company
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };


    return(
        <div className={styles.login + " relative h-screen"}>
            <div className={styles.back + " absolute top-5 left-5 z-50"}>
                <Link href={"/"}>
                    <svg className="w-6 fill-white max-md:fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                </Link>
            </div>
            <div className={styles.loginwrapper + " relative flex items-center h-full"}>
                <div className={styles.gotoLogin + " absolute top-7 right-7"}>
                    <Link className="font-bold" href={"/login"}>LOGIN</Link>
                </div>
                <div className={styles.login__image + " w-2/5 max-md:hidden overflow-hidden h-full"}>
                    <img className="object-cover w-full h-full" src="../../images/login.png" alt="image" />
                </div>
                <div className={styles.form + " w-3/5 max-md:w-full flex justify-center items-center flex-col"}>
                    <p className={styles.title + " w-1/2 max-md:w-11/12 text-left mb-4"}>
                        CREATE ACCOUNT
                    </p>
                    <form className="w-1/2 max-md:w-11/12 m-x-auto flex justify-center items-center flex-col gap-4">
                        <div className={styles.radio + " w-full flex gap-4 justify-start items-start"}>
                            <div className={styles.item + " flex gap-1 items-center"}>
                                <label className="text-xs" htmlFor="individual">INDIVIDUAL</label>
                                <input
                                    className="w-[10px]"
                                    type="radio"
                                    id="individual"
                                    name="age"
                                    value="individual"
                                    checked={selectedOption === "individual"}
                                    onChange={handleOptionChange}
                                />
                            </div>
                            <div className={styles.item + " flex gap-1 items-center"}>
                                <label className="text-xs" htmlFor="company">COMPANY</label>
                                <input
                                    className="w-[10px]"
                                    type="radio"
                                    id="company"
                                    name="age"
                                    value="company"
                                    checked={selectedOption === "company"}
                                    onChange={handleOptionChange}
                                />
                            </div>
                        </div>
                        {selectedOption == "company" ? 
                            <>
                                <div className={styles.formgroup + " relative w-full"}>
                                    {error?.phone_number ? 
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                            placeholder="COMPANY NAME * "
                                        /> : 
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                            placeholder="COMPANY NAME * "
                                        />
                                    }
                                    {error?.company_name && <p className="text-xs text-[#ff0000] mt-1">{error?.company_name}</p>}
                                </div>
                                <div className={styles.formgroup + " relative w-full"}>
                                    {error?.company_name ? 
                                        <input
                                            type="text"
                                            name="trn_number"
                                            value={formData.trn_number}
                                            onChange={handleChange}
                                            className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                            placeholder="COMPANY NAME * "
                                        /> : 
                                        <input
                                            type="text"
                                            name="trn_number"
                                            value={formData.trn_number}
                                            onChange={handleChange}
                                            className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                            placeholder="TRN NUMBER * "
                                        />
                                    }
                                    {error?.trn_number && <p className="text-xs text-[#ff0000] mt-1">{error?.trn_number}</p>}
                                </div>
                            </> : ""
                        }
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.email ? 
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="EMAIL * "
                                /> : 
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="EMAIL * "
                                />
                            }
                            {error?.email && <p className="text-xs text-[#ff0000] mt-1">{error?.email}</p>}
                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.first_name ? 
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="NAME * "
                                /> : 
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="NAME * "
                                />
                            }
                            {error?.first_name && <p className="text-xs text-[#ff0000] mt-1">{error?.first_name}</p>}
                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.last_name ? 
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="SURNAME * "
                                /> : 
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="SURNAME * "
                                />
                            }
                            {error?.last_name && <p className="text-xs text-[#ff0000] mt-1">{error?.last_name}</p>}
                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.password ? 
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="PASSWORD * "
                                /> : 
                                <input
                                    type="text"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="PASSWORD * "
                                />
                            }
                            {error?.password && <p className="text-xs text-[#ff0000] mt-1">{error?.password}</p>}
                        </div>
                        <div className={styles.formgroup + " relative w-full"}>
                            {error?.phone_number ? 
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="PHONE * "
                                /> : 
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest"
                                    placeholder="PHONE * "
                                />
                            }
                            {error?.phone_number && <p className="text-xs text-[#ff0000] mt-1">{error?.phone_number}</p>}
                        </div>
                        <div className={styles.check + " w-full flex flex-col gap-3 mt-4 mb-4"}>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="vehicle2" 
                                    name="vehicle2" 
                                    value="Car"
                                    checked={isChecked1}
                                    onChange={handleCheckboxChange} 
                                />
                                <label className="text-sm text-[#5E5E5E]" for="vehicle2"> I agree to the <a target="_blank" className="underline" href="https://healfit.ae/conditions">terms and conditions</a> and the <a target="_blank" className="underline" href="https://healfit.ae/privacy">privacy policy</a>.</label><br />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox" 
                                    id="vehicle3" 
                                    name="vehicle3" 
                                    value="Boat"
                                    checked={isChecked2}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="text-sm text-[#5E5E5E]" for="vehicle3"> Sign up for our newsletter and promotions.</label><br/>
                            </div>
                        </div>
                    </form>
                    <div className={styles.button + " w-1/2 mt-5 flex justify-between items-center flex-col gap-4"}>
                        {isChecked1 == true && loading == true ?
                            <BluePrimaryButton>                                
                                <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                </svg>
                                Processing...
                            </BluePrimaryButton> : 
                            isChecked1 == true && loading == false ?
                            <div className="grid w-full" onClick={handleSubmit}>
                                <BluePrimaryButton>
                                    CONTINUE
                                </BluePrimaryButton>
                            </div> : 
                            <div className="grid w-full">
                                <DeBluePrimaryButton>
                                    CONTINUE
                                </DeBluePrimaryButton>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;