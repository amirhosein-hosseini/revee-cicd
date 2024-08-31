import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import Banner from "../banner";
import Faq from "../faq";
import Subscribe from "../index/subscribe";
import axios from "axios";
import { domain } from "../../api/domain";
import { getCookie } from "../../api/auth";
import { getAllPersonalInformation } from "../../api/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Addresses = () => {


    const router = useRouter();
    const token = getCookie('token')
    const [formData, setFormData] = useState({
        address: "",
        additional_information: "",
        emirats: "",
        city: "",
        country: "",
    });
    const [personalInformation, setPersonalInformation] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "", // Add other fields here as needed
    });
    const [loading , setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const [userData , setUserData] = useState(null);
    const [showPromo , setShowPromo] = useState(false);
    const [error , setError] = useState(false);




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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true)

        axios.post(domain + 'api/accounts/address/', formData , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                router.push('/address-list');
                toast.success("Address Added")
            })
            .catch((error) => {
                setError(error.response.data);
            })
            .finally(() => {
                console.log("final");
                setLoading(false);
            });
    };
    
    // Function to retrieve cart items from local storage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        let totalPrice = storedCart.reduce((acc, currentItem) => {
            return acc + currentItem.quantity * currentItem.price;
        }, 0);
        setTotalPrice(totalPrice);

    }, []);

    return(
        <div className={styles.formpage}>
            <div className={styles.form + " container w-11/12 max-w-5xl mx-auto mb-20"}>
                <div className={styles.navbar + " mb-20 border-b pb-2 mt-10 w-3/4 max-w-[1000px] flex mx-auto justify-between"}>
                    <div className={styles.active + " flex justify-center gap-1 items-center flex-col"}>
                        <p className="text-white max-md:text-xs w-[40px] h-[40px] max-md:w-[25px] max-md:h-[25px] max-md:text-xs flex items-center justify-center bg-black">1</p>
                        <p className="max-md:text-xs">DELIVERY INFO</p>
                    </div>
                    <div className={styles.item + " flex justify-center gap-1 items-center flex-col"}>
                        <p className="text-white max-md:text-xs w-[40px] h-[40px] max-md:w-[25px] max-md:h-[25px] max-md:text-xs flex items-center justify-center bg-[#A3A3A3]">2</p>
                        <p className="text-[#A3A3A3] max-md:text-xs">PAYMENT</p>
                    </div>
                    <div className={styles.item + " flex justify-center gap-1 items-center flex-col"}>
                        <p className="text-white max-md:text-xs w-[40px] h-[40px] max-md:w-[25px] max-md:h-[25px] max-md:text-xs flex items-center justify-center bg-[#A3A3A3]">3</p>
                        <p className="text-[#A3A3A3] max-md:text-xs">PAYMENT</p>
                    </div>
                </div>
                <div className="flex max-md:flex-col gap-5">
                    <div className={styles.formwrapper + " border-r border-r-[#808080] pr-5 w-2/3 max-md:w-full max-md:border-r-0 flex flex-col gap-5"}>
                        <div className={styles.form__form}>
                            <form className="flex items-start gap-5 flex-col">
                                <div className={styles.formgroup + " w-full flex items-center gap-5"}>
                                    <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="first_name_address" value={personalInformation.first_name} placeholder="FIRST NAME*  " />
                                </div>
                                <div className={styles.formgroup + " w-full flex items-center gap-5 mb-3"}>
                                    <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="last_name_address" value={personalInformation.last_name} placeholder="SURNAME*  " />
                                </div>


                                <div className={styles.formgroup + " flex flex-col w-full flex items-center"}>
                                    {error?.address ? 
                                        <input className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="address" value={formData?.address} placeholder="ADDRESS*  " onChange={handleChange} />
                                        :
                                        <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="address" value={formData?.address} placeholder="ADDRESS*  " onChange={handleChange} />
                                    }
                                    {error?.address && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.address}</p>}
                                </div>
                                <div className={styles.formgroup + " flex flex-col w-full flex items-center"}>
                                    {error?.additional_information ? 
                                        <input className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="additional_information" value={formData?.additional_information} placeholder="ADDITIONAL iNFORMATION  " onChange={handleChange} />
                                        :
                                        <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="additional_information" value={formData?.additional_information} placeholder="ADDITIONAL iNFORMATION  " onChange={handleChange} />
                                    }
                                    {error?.additional_information && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.additional_information}</p>}
                                </div>
                                <div className={styles.formgroup + " flex flex-col w-full flex items-center"}>
                                    {error?.emirats ? 
                                        <input className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="emirats" value={formData?.emirats} placeholder="EMIRATE*  " onChange={handleChange} />
                                        :
                                        <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="emirats" value={formData?.emirats} placeholder="EMIRATE*  " onChange={handleChange} />
                                    }
                                    {error?.emirats && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.emirats}</p>}
                                </div>
                                <div className={styles.formgroup + " flex flex-col w-full flex items-center"}>
                                    {error?.city ? 
                                        <input className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="city" value={formData?.city} placeholder="CITY*  " onChange={handleChange} />
                                        :
                                        <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="city" value={formData?.city} placeholder="CITY*  " onChange={handleChange} />
                                    }
                                    {error?.city && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.city}</p>}
                                </div>
                                <div className={styles.formgroup + " flex flex-col w-full flex items-center"}>
                                    {error?.country ? 
                                        <input className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="country" value={formData?.country} placeholder="COUNTRY*  " onChange={handleChange} />
                                        :
                                        <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="country" value={formData?.country} placeholder="COUNTRY*  " onChange={handleChange} />
                                    }
                                    {error?.country && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.country}</p>}
                                </div>
                                <div className={styles.formgroup + " flex flex-col w-full flex items-center mb-3"}>
                                    {error?.phone_number ? 
                                        <input className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="phone_number" value={formData?.phone_number} placeholder="PHONE*  " onChange={handleChange} />
                                        :
                                        <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="phone_number" value={formData?.phone_number} placeholder="PHONE*  " onChange={handleChange} />
                                    }
                                    {error?.phone_number && <p className="text-xs mr-auto text-[#ff0000] mt-1">{error?.phone_number}</p>}
                                </div>

{/* 
                                <div className={styles.formgroup + " w-full flex items-center gap-5"}>
                                    <input className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" type="text" name="phone_number" value={personalInformation.phone_number} placeholder="PHONE*  " />
                                </div> */}
                            </form>
                        </div>
                    </div>
                    <div className={styles.total + " w-1/3 max-md:w-full p-2 flex flex-col gap-4"}>
                            <div className={styles.title + " mb-3 flex items-center justify-center gap-1"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M4.95841 1.4165H4.25008C2.12508 1.4165 1.41675 2.68442 1.41675 4.24984V4.95817V14.8748C1.41675 15.4628 2.08258 15.7957 2.55008 15.4415L3.76133 14.5348C4.04466 14.3223 4.44133 14.3507 4.69633 14.6057L5.87216 15.7886C6.14841 16.0648 6.60175 16.0648 6.878 15.7886L8.068 14.5986C8.31591 14.3507 8.71258 14.3223 8.98883 14.5348L10.2001 15.4415C10.6676 15.7886 11.3334 15.4557 11.3334 14.8748V2.83317C11.3334 2.054 11.9709 1.4165 12.7501 1.4165H4.95841ZM4.22883 9.92359C3.83925 9.92359 3.5205 9.60484 3.5205 9.21525C3.5205 8.82567 3.83925 8.50692 4.22883 8.50692C4.61841 8.50692 4.93716 8.82567 4.93716 9.21525C4.93716 9.60484 4.61841 9.92359 4.22883 9.92359ZM4.22883 7.09025C3.83925 7.09025 3.5205 6.7715 3.5205 6.38192C3.5205 5.99234 3.83925 5.67359 4.22883 5.67359C4.61841 5.67359 4.93716 5.99234 4.93716 6.38192C4.93716 6.7715 4.61841 7.09025 4.22883 7.09025ZM8.50008 9.7465H6.37508C6.08466 9.7465 5.84383 9.50567 5.84383 9.21525C5.84383 8.92484 6.08466 8.684 6.37508 8.684H8.50008C8.7905 8.684 9.03133 8.92484 9.03133 9.21525C9.03133 9.50567 8.7905 9.7465 8.50008 9.7465ZM8.50008 6.91317H6.37508C6.08466 6.91317 5.84383 6.67234 5.84383 6.38192C5.84383 6.0915 6.08466 5.85067 6.37508 5.85067H8.50008C8.7905 5.85067 9.03133 6.0915 9.03133 6.38192C9.03133 6.67234 8.7905 6.91317 8.50008 6.91317Z" fill="#292D32"/>
                                    <path d="M12.757 1.4165V2.479C13.2245 2.479 13.6708 2.67025 13.9966 2.989C14.3366 3.33609 14.5208 3.78234 14.5208 4.24984V5.964C14.5208 6.48817 14.287 6.729 13.7558 6.729H12.3958V2.84025C12.3958 2.64192 12.5587 2.479 12.757 2.479V1.4165ZM12.757 1.4165C11.9708 1.4165 11.3333 2.054 11.3333 2.84025V7.7915H13.7558C14.8749 7.7915 15.5833 7.08317 15.5833 5.964V4.24984C15.5833 3.47067 15.2645 2.76234 14.7545 2.24525C14.2374 1.73525 13.5362 1.42359 12.757 1.4165C12.7641 1.4165 12.757 1.4165 12.757 1.4165Z" fill="#292D32"/>
                                </svg>
                                <p className="font-bold text-sm">
                                    ORDER SUMMARY
                                </p>
                            </div>
                            <div className={styles.desc + " flex flex-col gap-2 max-md:w-full"}>
                                <div className={styles.number + " flex items-center justify-between"}>
                                    <p>item</p>
                                    <p>{cartItems?.length}</p>
                                </div>
                                <div className={styles.shipping + " flex items-center justify-between"}>
                                    <p>Shipping</p>
                                    <p>free</p>
                                </div>
                                <div className={styles.totalprice + " p-2 flex items-center justify-between"}>
                                    <p>Total (VAT incl.)</p>
                                    <p>{totalPrice} AED</p>
                                </div>
                            </div>
                            <div className={styles.promocode + " w-1/2 mx-auto mt-3 flex flex-col gap-2"}>
                                <p className={styles.title + " text-xs text-center text-[#868686] cursor-pointer"} onClick={() => setShowPromo(!showPromo)}>Have a Promo Code?</p>
                                {showPromo == true ? 
                                    <input className="w-full rounded-lg border border-[#A1A1A1]" type="text" /> : ""
                                }
                            </div>
                            <div className={styles.cart__button + " flex items-center justify-center"}>
                                <div className={styles.button + " flex items-center justify-center"} onClick={handleSubmit}>
                                    {loading == true? 
                                        <BluePrimaryButton>                                
                                            <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                            </svg>
                                            Processing...
                                        </BluePrimaryButton>
                                        :
                                        <BluePrimaryButton>
                                            PROCEED TO CHECKOUT
                                        </BluePrimaryButton>
                                    }
                                </div>
                            </div>
                            <div className={styles.payments + " flex mt-2 gap-1 items-center mx-auto"}>
                                <div className={styles.item}>
                                    <img src="../../images/lvisa.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/linter.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/lmaster.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/lapple.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/lblue.png" alt="image" /> 
                                </div>
                            </div>
                        </div>
                </div>
            </div>


            {/* <FooterBanner />

            <div className="mt-10">
                <Faq />
            </div>

            <Subscribe /> */}
        </div>
    )
}

export default Addresses;