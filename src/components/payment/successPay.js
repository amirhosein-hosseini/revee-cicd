import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getSuccessPay } from "../../api/payment";
import { BluePrimaryButton } from "../button";
import Link from "next/link";

const SuccessPay = () => {

    const [number , setNumber] = useState(null);

    // get data for home contents
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getSuccessPay();
            setNumber(data?.data);
            deleteCartData();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    
    // const deleteCartData = () => {
    //     localStorage.removeItem('cart'); 
    // };






    return(
        <div className={styles.successpay}>
            <div className={styles.successpaywrapper}>
                <div className={styles.navbar + " mb-40 border-b pb-2 mt-10 w-3/4 max-w-[1000px] flex mx-auto justify-between"}>
                    <div className={styles.item + " flex justify-center gap-1 items-center flex-col"}>
                        <p className="text-white max-md:text-xs w-[40px] h-[40px] max-md:w-[25px] max-md:h-[25px] max-md:text-xs flex items-center justify-center bg-black">1</p>
                        <p className="max-md:text-xs">DELIVERY INFO</p>
                    </div>
                    <div className={styles.item + " flex justify-center gap-1 items-center flex-col"}>
                        <p className="text-white max-md:text-xs w-[40px] h-[40px] max-md:w-[25px] max-md:h-[25px] max-md:text-xs flex items-center justify-center bg-black">2</p>
                        <p className="text-black max-md:text-xs">PAYMENT</p>
                    </div>
                    <div className={styles.active + " flex justify-center gap-1 items-center flex-col"}>
                        <p className="text-white max-md:text-xs w-[40px] h-[40px] max-md:w-[25px] max-md:h-[25px] max-md:text-xs flex items-center justify-center bg-black">3</p>
                        <p className="text-black max-md:text-xs">SUMMERY</p>
                    </div>
                </div>
                <div className={styles.content + " flex justify-center items-center flex-col mx-auto mb-20 mt-30"}>
                    <div className={styles.text + " flex items-center gap-1 mb-10"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 4L12 14.01L9 11.01" stroke="#27BDBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p className="text-[#27BDBE]">Thank you! your payment has been accepted. </p>
                    </div>
                    <div className={styles.code}>
                        <p className="text-[#27BDBE] text-lg">Reference Number: <span>{number?.trace}</span></p>
                    </div>
                    <div>
                        <Link href={"/"}>
                            <BluePrimaryButton>
                                Go To Home
                            </BluePrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPay;