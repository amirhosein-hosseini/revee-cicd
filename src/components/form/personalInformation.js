import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import Banner from "../banner";
import Faq from "../faq";
import Subscribe from "../index/subscribe";
import { getAllPersonalInformation } from "../../api/user";
import { getCookie } from "../../api/auth";
import { domain } from "../../api/domain";
import axios from "axios";

const PersonalInformation = () => {

    const token = getCookie('token');
    const [personalInformation, setPersonalInformation] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        company_name: "",
        trn_number: "",
    });
    const [loading , setLoading] = useState(false);
    const [editable , setEditable] = useState(false);
    const [level , setLevel] = useState("info");

    // get all user information
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPersonalInformation();
                setPersonalInformation(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInformation((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };



    const handleEdit = (e) => {    

        e.preventDefault();


        setLoading(true);
    
        axios.put(domain + "accounts/info/" , personalInformation , {
          headers : {
            'Authorization' : 'Bearer ' + token,
          }
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false);
        });
    }
    



    return(
        <div className={styles.formpage + " container max-w-xl w-11/12 mx-auto mt-10"}>
            {level === "info" ? 
                <div className="flex flex-col gap-6 w-10/12 mx-auto">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">
                            FIRST NAME: 
                        </p>
                        <p className="text-sm font-bold">
                            {personalInformation?.first_name}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm">
                            LAST NAME: 
                        </p>
                        <p className="text-sm font-bold">
                            {personalInformation?.last_name}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm">
                            EMAIL: 
                        </p>
                        <p className="text-sm font-bold">
                            {personalInformation?.email}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm">
                            MOBILE NUMBER: 
                        </p>
                        <p className="text-sm font-bold">
                            {personalInformation?.phone_number}
                        </p>
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <p className="text-sm">
                            FIRST NAME: 
                        </p>
                        <p className="text-sm font-bold">
                            {personalInformation?.first_name}
                        </p>
                    </div> */}
                    <div className="mt-5">
                        <p className="text-[#27BDBE] text-sm cursor-pointer" onClick={() => setLevel("edit")}>
                            Edit
                        </p>
                    </div>
                    
                </div> : 
                <div className={styles.form + " mb-20"}>
                    <div className={styles.formwrapper + " flex flex-col gap-5"}>
                        <div className={styles.form__form}>
                            <form className="flex items-start gap-3 flex-col">
                                <div className={styles.formgroup + " w-full flex gap-1 flex-col"}>
                                    <label className="text-sm text-[#a3a3a3]">FIRST NAME</label>
                                    <input
                                        className="placeholder-opacity-25 w-full py-3 px-3 text-xs tracking-widest"
                                        type="text"
                                        name="first_name"
                                        value={personalInformation.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formgroup + " w-full flex gap-1 flex-col"}>
                                    <label className="text-sm text-[#a3a3a3]">LAST NAME</label>
                                    <input
                                        className="placeholder-opacity-25 w-full py-3 px-3 text-xs tracking-widest"
                                        type="text"
                                        name="last_name"
                                        value={personalInformation.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formgroup + " w-full flex gap-1 flex-col"}>
                                    <label className="text-sm text-[#a3a3a3]">EMAIL</label>
                                    <input
                                        className="placeholder-opacity-25 w-full py-3 px-3 text-xs tracking-widest"
                                        type="text"
                                        name="email"
                                        value={personalInformation.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {personalInformation?.company_name && personalInformation?.company_name != "" ?
                                    <div className={styles.formgroup + " w-full flex gap-1 flex-col"}>
                                        <label className="text-sm text-[#a3a3a3]">COMPANY NAME</label>
                                        <input
                                            className="placeholder-opacity-25 w-full py-3 px-3 text-xs tracking-widest"
                                            type="text"
                                            name="company_name"
                                            value={personalInformation.company_name}
                                            onChange={handleChange}

                                        />
                                    </div> : ""
                                }
                                {personalInformation?.trn_number && personalInformation?.trn_number != "" ?
                                    <div className={styles.formgroup + " w-full flex gap-1 flex-col"}>
                                        <label className="text-sm text-[#a3a3a3]">TRN NUMBER</label>
                                        <input
                                            className="placeholder-opacity-25 w-full py-3 px-3 text-xs tracking-widest"
                                            type="text"
                                            name="trn_number"
                                            value={personalInformation.trn_number}
                                            onChange={handleChange}

                                        />
                                    </div> : ""
                                }
                            </form>
                        </div>
                        <div className={styles.form__form}>
                            <form className="flex items-start gap-5 flex-col">
                                <div className={styles.formgroup + " w-full flex gap-1 flex-col"}>
                                    <label className="text-sm text-[#a3a3a3]">MOBILE NUMBER</label>
                                    <input
                                        className="placeholder-opacity-25 w-full py-3 px-3 text-xs tracking-widest"
                                        type="text"
                                        name="phone_number"
                                        value={personalInformation.phone_number}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex items-center w-full mt-10 gap-3">
                                    <div className={styles.button + " flex mr-auto items-center gap-3"} onClick={handleEdit}>
                                        {loading == true ?
                                            <button className="bg-[#606060] p-2 px-4 text-white">
                                                <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                                </svg>
                                                Processing...
                                            </button>
                                            :
                                            <button className="bg-[#606060] p-2 px-4 text-white">
                                                SAVE
                                            </button>
                                        }
                                        {level === "edit" ?
                                            <p className="text-sm text-[#3C3C3C] cursor-pointer" onClick={() => setLevel("info")}>CANCEL</p> : ""
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PersonalInformation;