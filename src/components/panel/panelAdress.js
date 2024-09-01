import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllAdresses, getAllPersonalInformation } from "../../api/user";
import { getCookie } from "../../api/auth";
import axios from "axios";
import { domain } from "../../api/domain";
import PanelAddAddress from "./panelAddAddress";
import Link from "next/link";

const PanelAdress = () => {

    const token = getCookie('token')
    const [addresses , setAddresses] = useState(null);
    const [level , setlevel] = useState("info");
    const [reload , setReload] = useState(1)
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
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);


    // function for handle delete address forom address list 
    const handelDeleteAddress = (itemId) => {
        axios.delete(domain + `api/accounts/address/?address_id=${itemId}` , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                console.log("Item deleted successfully");
                setReload(reload + 1)
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
    };



    return(
        <div className={styles.formpage}>
            <div className={styles.form + " container max-w-xl mx-auto mb-20"}>
                {level === "info" ? 
                    <div className={styles.formwrapper + " flex flex-col gap-5"}>
                        <div className={styles.addresses}>
                            {addresses?.length === 0 ?
                                <div className="text-center mt-10">
                                    <p>
                                        You have not added any address yet
                                    </p>
                                </div> :
                                <ul className="flex flex-col gap-5">
                                    {addresses?.map((item) => (
                                        <li>
                                            <div className={styles.wrapper + " rounded-lg p-3 flex flex-col gap-3"}>
                                                <div className={styles.wrapper__header + " flex gap-2 items-center"}>
                                                    <p className="font-bold">
                                                        {item?.first_name_address}
                                                    </p>
                                                </div>
                                                <div className={styles.wrapper__body + " flex flex-col gap-2"}>
                                                    <p className="font-bold mb-2 text-sm max-md:text-xs">{personalInformation?.first_name}</p>
                                                    <p className="text-sm max-md:text-xs">{item?.address}</p>
                                                    <p className="text-sm max-md:text-xs">{item?.city + " , " + item?.emirats + " , " + item?.country}</p>
                                                    <p className="text-sm max-md:text-xs">{item?.additional_information}</p>
                                                    <p className="text-sm max-md:text-xs">{item?.phone_number}</p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <div className={styles.wrapper__footer + " flex items-center justify-start gap-6 mt-3"}>
                                                        <div className={styles.remove + " flex gap-1 items-center cursor-pointer"} onClick={() => handelDeleteAddress(item?.id)}>
                                                            <p className="text-sm text-[#27BDBE]">Delete</p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.wrapper__footer + " flex items-center justify-start gap-6 mt-3"}>
                                                        <div className={styles.remove + " flex gap-1 items-center cursor-pointer"}>
                                                            <Link href={"/panel/edit-address/" + item?.id} className="text-sm text-[#27BDBE]">Edit</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                        <div onClick={() => setlevel("add")}>
                            {level == "info" ?
                                <div className={styles.addnew + " flex items-center gap-2 cursor-pointer"}>
                                    <p className="text-xs text-[#27BDBE]">
                                        <span className="text-lg">+</span> ADD ADDRESS
                                    </p>
                                </div> : ""
                            }
                        </div>
                    </div> : 
                    <PanelAddAddress handleLevel={setlevel} handleReload={setReload} reload={reload} />
                }



            </div>

        </div>
    )
}

export default PanelAdress;