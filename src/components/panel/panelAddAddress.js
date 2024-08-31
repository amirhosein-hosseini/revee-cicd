import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import Banner from "../banner";
import Faq from "../faq";
import Subscribe from "../index/subscribe";
import axios from "axios";
import { domain } from "../../api/domain";
import { getCookie } from "../../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

const PanelAddAddress = ({handleLevel , handleReload , reload}) => {


    const token = getCookie('token')
    const [formData, setFormData] = useState({
        address: "",
        additional_information: "",
        emirats: "",
        city: "",
        country: "",
        phone_number: "",
    });
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)

        axios.post(domain + 'accounts/address/', formData , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                handleReload(reload + 1)
                handleLevel("info")
            })
            .catch((error) => {
                setError(error.response.data);
            })
            .finally(() => {
                console.log("final");
                setLoading(false);
            });
    };
    

    return(
        <div className={styles.formpage}>
            <div className={styles.form + " container mx-auto mb-20 mt-10"}>
                <div className={styles.formwrapper + " flex flex-col gap-5"}>
                    <div className={styles.form__form}>
                        <form className="flex items-start flex-col">
                                <div className={styles.formgroup + " w-full flex flex-col items-center gap-1 mb-3"}>
                                    {error?.address ? 
                                        <input 
                                            className="redinput placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" 
                                            name="address" 
                                            value={formData?.address} 
                                            placeholder="ADDRESS*  " 
                                            onChange={handleChange} 
                                        /> : 
                                        <input 
                                            className="placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" 
                                            name="address" 
                                            value={formData?.address} 
                                            placeholder="ADDRESS*  " 
                                            onChange={handleChange} 
                                        />
                                    }
                                    {error?.address && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.address}</p>}
                                </div>
                                <div className={styles.formgroup + " w-full flex flex-col items-center gap-1 mb-3"}>
                                    {error?.additional_information ? 
                                    <input 
                                        className="redinput placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                        type="text" 
                                        name="additional_information" 
                                        value={formData?.additional_information} 
                                        placeholder="ADDITIONAL iNFORMATION  " 
                                        onChange={handleChange} 
                                    /> : 
                                    <input 
                                        className="placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                        type="text" 
                                        name="additional_information" 
                                        value={formData?.additional_information} 
                                        placeholder="ADDITIONAL iNFORMATION  " 
                                        onChange={handleChange} 
                                    />
                                    }
                                    {error?.additional_information && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.additional_information}</p>}
                                </div>
                                <div className={styles.formgroup + " w-full flex flex-col items-center gap-1 mb-3"}>
                                    {error?.emirats ? 
                                        <input 
                                            className="redinput placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" 
                                            name="emirats" 
                                            value={formData?.emirats} 
                                            placeholder="EMIRATE*  " 
                                            onChange={handleChange} 
                                        /> : 
                                        <input 
                                            className="placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" 
                                            name="emirats" 
                                            value={formData?.emirats} 
                                            placeholder="EMIRATE*  " 
                                            onChange={handleChange} 
                                        />
                                    }
                                    {error?.emirats && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.emirats}</p>}
                                </div>
                                <div className={styles.formgroup + " w-full flex flex-col items-center gap-1 mb-3"}>
                                    {error?.city ? 
                                        <input 
                                            className="redinput placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" 
                                            name="city" 
                                            value={formData?.city} 
                                            placeholder="CITY*  " 
                                            onChange={handleChange} 
                                        /> : 
                                        <input 
                                            className="placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" 
                                            name="city" 
                                            value={formData?.city} 
                                            placeholder="CITY*  " 
                                            onChange={handleChange} 
                                        />
                                    }
                                    {error?.city && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.city}</p>}
                                </div>
                                <div className={styles.formgroup + " w-full flex flex-col items-center gap-1 mb-3"}>
                                    {error?.country ?
                                        <input 
                                            className="redinput placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" name="country" 
                                            value={formData?.country} 
                                            placeholder="COUNTRY*  " 
                                            onChange={handleChange} 
                                        /> : 
                                        <input 
                                            className="placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" name="country" 
                                            value={formData?.country} 
                                            placeholder="COUNTRY*  " 
                                            onChange={handleChange} 
                                        />
                                    }
                                    {error?.country && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.country}</p>}
                                </div>
                                <div className={styles.formgroup + " w-full flex flex-col items-center gap-1 mb-3"}>
                                    {error?.phone_number ? 
                                        <input 
                                            className="redinput placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" name="phone_number" 
                                            value={formData?.phone_number} 
                                            placeholder="PHONE*  " 
                                            onChange={handleChange} 
                                        /> : 
                                        <input 
                                            className="placeholder-opacity-25 w-full p-3 text-xs tracking-widest" 
                                            type="text" name="phone_number" 
                                            value={formData?.phone_number} 
                                            placeholder="PHONE*  " 
                                            onChange={handleChange} 
                                        />
                                    }
                                    {error?.phone_number && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.phone_number}</p>}
                                </div>
                        </form>
                    </div>
                    <div className={styles.form__form + " mt-5"}>
                        <form className="flex items-start gap-5 flex-col">
                            <div className={styles.button + " flex mr-auto items-center gap-4"} onClick={handleSubmit}>
                                {loading == true? 
                                    <button className="bg-[#606060] p-2 px-4 text-white text-sm flex items-center gap-2">                                
                                        <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                        </svg>
                                        Processing...
                                    </button>
                                    :
                                    <button className="bg-[#606060] p-2 px-4 text-white text-sm">
                                        SAVE
                                    </button>
                                }
                                <p className="text-sm text-[#3C3C3C] cursor-pointer" onClick={() => handleLevel("info")}>CANCEL</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelAddAddress;