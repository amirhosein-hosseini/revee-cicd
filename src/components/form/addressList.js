import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import { getAllAdresses, getAllPersonalInformation } from "../../api/user";
import axios from "axios";
import { domain } from "../../api/domain";
import { getCookie } from "../../api/auth";
import Link from "next/link";

const AddressList = () => {

    const token = getCookie('token');
    const [addresses, setAddresses] = useState(null);
    const [activeAddress, setActiveAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [payload, setPayload] = useState(null);
    const [loading , setLoading] = useState(false);
    const [totalPrice , setTotalPrice] = useState(0);
    const [showPromo , setShowPromo] = useState(false);
    const [personalInformation, setPersonalInformation] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "", // Add other fields here as needed
    });



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



    // get all user addresses
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllAdresses();
                setAddresses(data);
                setActiveAddress(data[0]?.id);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Function to retrieve cart items from local storage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
  
        let totalPrice = storedCart.reduce((acc, currentItem) => {
          return acc + currentItem.quantity * currentItem.price;
        }, 0);
        setTotalPrice(totalPrice);
  
    }, []);

    // // Function to construct and store the payload
    // useEffect(() => {
    //     const constructPayload = () => {
    //         const payload = {
    //             product: cartItems.map(item => ({
    //                 product_id: item.id,
    //                 quantity: item.quantity,
    //                 size: item?.size,
    //                 color: item?.color?.color, 
    //             })),
    //             address_id: activeAddress
    //         };
    //         setPayload(payload);
    //     };
    //     constructPayload();
    // }, []);

    
    const handleActiveAdress = (addressId) => {
        setActiveAddress(addressId);
    };


    // handle sending api to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        const payload = {
            product: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                size: item?.size,
                color: item?.color?.color, 
            })),
            address_id: activeAddress
        };
    
        axios.post(domain + 'order/pay/', payload , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
        .then((response) => {
            const redirectUrl = response?.data?.["redirect to : "];
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                console.log("No redirect URL found in the response.");
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        });
    };
    


    // function for handle delete address forom address list 
    const handelDeleteAddress = (itemId) => {
        axios.delete(domain + `api/accounts/address/?address_id=${itemId}` , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                console.log("Item deleted successfully");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };




    return(
        <div className={styles.formpage}>
            <div className={styles.form + " container max-w-5xl w-11/12 mx-auto mb-20"}>
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
                        <div className={styles.addresses}>
                            <p className="font-bold mb-2">SAVED DELIVERY ADDRESSES</p>
                            <ul className="flex flex-col gap-5">
                                {addresses?.map((item) => (
                                    <li>
                                        <div>
                                            <div className={styles.wrapper + " border rounded-lg p-3 flex flex-col gap-3"}>
                                                <div className="flex items-start gap-4">
                                                    <div className={styles.wrapper__header + " flex gap-2 items-center mt-3 ml-3"}>
                                                        {item?.id == activeAddress ? 
                                                            <div className="w-4 h-4 flex justify-center items-center border border-[#909090]">
                                                                <div className="w-[6px] h-[6px] cursor-pointer bg-[#27bdbe]" onClick={() => handleActiveAdress(item?.id)} />
                                                            </div>
                                                            :
                                                            <div className="w-4 h-4 border border-[#909090] cursor-pointer border-black" onClick={() => handleActiveAdress(item?.id)} />
                                                        }
                                                        <p>
                                                            {item?.first_name_address}
                                                        </p>
                                                    </div>
                                                    <div className={styles.wrapper__body + " flex flex-col gap-2 mt-2"}>
                                                        <p className="font-bold mb-2 text-sm max-md:text-xs">{personalInformation?.first_name}</p>
                                                        <p className="text-sm max-md:text-xs">{item?.address}</p>
                                                        <p className="text-sm max-md:text-xs">{item?.city + " , " + item?.emirats + " , " + item?.country}</p>
                                                        {/* <p className="text-sm max-md:text-xs">{}</p>
                                                        <p className="text-sm max-md:text-xs mb-2">{}</p> */}
                                                        
                                                        <p className="text-sm max-md:text-xs">{item?.additional_information}</p>
                                                        <p className="text-sm max-md:text-xs">{item?.phone_number}</p>
                                                    </div>
                                                </div>
                                                <div className={styles.wrapper__footer + " flex items-center justify-end gap-6"}>
                                                    {/* <div className={styles.edit + " flex gap-1 items-center"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                            <path d="M19.25 20.1665H2.75C2.37417 20.1665 2.0625 19.8548 2.0625 19.479C2.0625 19.1032 2.37417 18.7915 2.75 18.7915H19.25C19.6258 18.7915 19.9375 19.1032 19.9375 19.479C19.9375 19.8548 19.6258 20.1665 19.25 20.1665Z" fill="#5F5F5F"/>
                                                            <path d="M17.435 3.18986C15.6567 1.41153 13.915 1.36569 12.0909 3.18986L10.9817 4.29903C10.89 4.39069 10.8534 4.53736 10.89 4.66569C11.5867 7.09486 13.53 9.03819 15.9592 9.73486C15.9959 9.74403 16.0325 9.75319 16.0692 9.75319C16.17 9.75319 16.2617 9.71653 16.335 9.64319L17.435 8.53403C18.3425 7.63569 18.7825 6.76486 18.7825 5.88486C18.7917 4.97736 18.3517 4.09736 17.435 3.18986Z" fill="#5F5F5F"/>
                                                            <path d="M14.3096 10.5692C14.0438 10.4409 13.7871 10.3126 13.5396 10.1659C13.338 10.0467 13.1455 9.9184 12.953 9.7809C12.7971 9.68006 12.6138 9.5334 12.4396 9.38673C12.4213 9.37756 12.3571 9.32256 12.2838 9.24923C11.9813 8.99256 11.6421 8.66256 11.3396 8.2959C11.3121 8.27757 11.2663 8.2134 11.2021 8.1309C11.1105 8.0209 10.9546 7.83756 10.8171 7.62673C10.7071 7.48923 10.5788 7.28756 10.4596 7.0859C10.313 6.8384 10.1846 6.5909 10.0563 6.33423C10.0462 6.31255 10.0362 6.29093 10.0264 6.26936C9.8758 5.93742 9.44168 5.83967 9.18393 6.09743L3.97879 11.3026C3.85962 11.4217 3.74962 11.6509 3.72212 11.8067L3.22712 15.3176C3.13545 15.9409 3.30962 16.5276 3.69462 16.9217C4.02462 17.2426 4.48295 17.4167 4.97795 17.4167C5.08795 17.4167 5.19795 17.4076 5.30795 17.3892L8.82795 16.8942C8.99295 16.8667 9.22212 16.7567 9.33212 16.6376L14.5301 11.4396C14.7897 11.18 14.692 10.734 14.3548 10.5888C14.3398 10.5823 14.3248 10.5758 14.3096 10.5692Z" fill="#5F5F5F"/>
                                                        </svg>
                                                        <p className="text-xs">Edit</p>
                                                    </div> */}
                                                    <div className={styles.remove + " flex gap-1 items-center cursor-pointer"} onClick={() => handelDeleteAddress(item?.id)}>
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                            <path d="M18.4364 4.57625C17.0277 4.43625 15.6189 4.33125 14.2014 4.2525V4.24375L14.0089 3.10625C13.8777 2.30125 13.6852 1.09375 11.6377 1.09375H9.3452C7.30645 1.09375 7.11395 2.24875 6.97395 3.0975L6.7902 4.2175C5.97645 4.27 5.1627 4.3225 4.34895 4.40125L2.56395 4.57625C2.19645 4.61125 1.93395 4.935 1.96895 5.29375C2.00395 5.6525 2.31895 5.915 2.68645 5.88L4.47145 5.705C9.05645 5.25 13.6764 5.425 18.3139 5.88875C18.3402 5.88875 18.3577 5.88875 18.3839 5.88875C18.7164 5.88875 19.0052 5.635 19.0402 5.29375C19.0665 4.935 18.8039 4.61125 18.4364 4.57625Z" fill="#5F5F5F"/>
                                                            <path d="M16.8258 7.1225C16.6158 6.90375 16.327 6.78125 16.0295 6.78125H4.96954C4.67204 6.78125 4.37454 6.90375 4.17329 7.1225C3.97204 7.34125 3.85829 7.63875 3.87579 7.945L4.41829 16.9225C4.51454 18.2525 4.63704 19.915 7.69079 19.915H13.3083C16.362 19.915 16.4845 18.2613 16.5808 16.9225L17.1233 7.95375C17.1408 7.63875 17.027 7.34125 16.8258 7.1225ZM11.952 15.5313H9.03829C8.67954 15.5313 8.38204 15.2338 8.38204 14.875C8.38204 14.5163 8.67954 14.2188 9.03829 14.2188H11.952C12.3108 14.2188 12.6083 14.5163 12.6083 14.875C12.6083 15.2338 12.3108 15.5313 11.952 15.5313ZM12.687 12.0313H8.31204C7.95329 12.0313 7.65579 11.7338 7.65579 11.375C7.65579 11.0163 7.95329 10.7188 8.31204 10.7188H12.687C13.0458 10.7188 13.3433 11.0163 13.3433 11.375C13.3433 11.7338 13.0458 12.0313 12.687 12.0313Z" fill="#5F5F5F"/>
                                                        </svg>           */}
                                                        <p className="text-[10px]">Delete</p>                              
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link href={"/add-address"}>
                            <div className={styles.addnew + " flex items-center gap-2"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z" fill="#35383F"/>
                                </svg>
                                <p className="text-xs max-md:text-xs">
                                    ADD NEW ADDRESS
                                </p>
                            </div>
                        </Link>
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
                                {addresses?.length > 0 ? 
                                    <>
                                        {loading ? 
                                            <div className={styles.button + " flex ml-auto"}>
                                                <BluePrimaryButton>                                
                                                    <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                                    </svg>
                                                    Processing...
                                                </BluePrimaryButton>
                                            </div>
                                            :
                                            <div className={styles.button + " flex ml-auto"}>
                                                <BluePrimaryButton>
                                                    PROCEED TO CHECKOUT
                                                </BluePrimaryButton>
                                            </div>
                                        }
                                    </> : ""
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

export default AddressList;