import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllOrderHistory } from "../../api/user";
import { domain } from "../../api/domain";
import Link from "next/link";

const OrderHistory = () => {

    const [orderHistroy , setOrderHistory] = useState(null);


    // get all user information
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllOrderHistory();
                setOrderHistory(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);






    return(
        <div className={styles.orderHistory + " w-11/12 container mx-auto h-full"}>
            {orderHistroy?.length === 0 ? 
                <div className="flex items-center justify-center flex-col h-full my-20">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <g opacity="0.3">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2748 29.1667L41.1619 11.2796C46.0434 6.39809 53.958 6.39808 58.8395 11.2796L76.7266 29.1667H86.8631C89.3987 29.1667 91.3465 31.4125 90.9879 33.9226L84.8671 76.7678C83.9874 82.9259 78.7134 87.5 72.4928 87.5H27.5085C21.2878 87.5 16.0138 82.9259 15.1341 76.7678L9.01336 33.9226C8.65477 31.4125 10.6025 29.1667 13.1382 29.1667H23.2748ZM47.0544 17.1722C48.6816 15.545 51.3198 15.545 52.947 17.1722L64.9415 29.1667L35.0599 29.1667L47.0544 17.1722ZM17.9424 37.5L23.3837 75.5893C23.6769 77.642 25.4349 79.1667 27.5085 79.1667H72.4928C74.5663 79.1667 76.3243 77.642 76.6175 75.5893L82.0589 37.5H17.9424Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M33.3327 45.8333C35.6339 45.8333 37.4993 47.6988 37.4993 50V66.6667C37.4993 68.9678 35.6339 70.8333 33.3327 70.8333C31.0315 70.8333 29.166 68.9678 29.166 66.6667V50C29.166 47.6988 31.0315 45.8333 33.3327 45.8333Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M50.0007 45.8333C52.3018 45.8333 54.1673 47.6988 54.1673 50V66.6667C54.1673 68.9678 52.3018 70.8333 50.0007 70.8333C47.6995 70.8333 45.834 68.9678 45.834 66.6667V50C45.834 47.6988 47.6995 45.8333 50.0007 45.8333Z" fill="black" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.6667 45.8333C68.9679 45.8333 70.8333 47.6988 70.8333 50V66.6667C70.8333 68.9678 68.9679 70.8333 66.6667 70.8333C64.3655 70.8333 62.5 68.9678 62.5 66.6667V50C62.5 47.6988 64.3655 45.8333 66.6667 45.8333Z" fill="black" />
                            </g>
                        </svg>
                    </div>
                    <div className="mt-3">
                        <p>
                            Your Order History is Empty 
                        </p>
                    </div>
                    <div className="mt-10">
                        <Link href={"/shop"} className="bg-[#27BDBE] text-white py-2 px-6">
                            Shop Now
                        </Link>
                    </div>
                </div> :
                <div className={styles.items + " flex flex-col gap-8"}>
                    {orderHistroy?.map((item) => (
                        <div className="flex max-md:flex-col justify-between items-start gap-2">
                            <div className={styles.cartpopup__product + " w-2/5 max-md:w-full flex flex-col gap-2"}>
                                <div className={styles.product + " flex gap-4"}>
                                    <div className={styles.image + " w-[150px] overflow-hidden"}>
                                        <img className="object-cover w-full" src={domain + item?.image.substring(1)} alt="image" />
                                    </div>
                                    <div className={styles.desc + " flex flex-col gap-2"}>
                                        <p className={styles.title + " text-xs text-[#2B2B2B]"}>{item?.product}</p>
                                        <p className={styles.item + " text-xs text-[#2B2B2B]"}>Size: <span className="font-bold text-black">{item?.size}</span></p>
                                        <p className={styles.item + " text-xs text-[#2B2B2B]"}>Color: <span className="font-bold text-black">{item?.color}</span></p>
                                        <p className={styles.item + " text-xs text-[#2B2B2B]"}>Quantity: <span className="font-bold text-black">{item?.quantity}</span></p>
                                        <p className={styles.item + " text-xs text-[#2B2B2B]"}>Price: <span className="font-bold text-black">{item?.price}</span><span className="font-bold text-black"> AED</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.total + " w-1/5 max-md:w-full flex flex-col gap-4"}>
                                <div className={styles.price + " text-xs flex justify-between items-center"}>
                                    <p className="font-bold">Total:</p>
                                    <p className="font-bold">{item?.price * item?.quantity} <span>AED</span></p>
                                </div>
                            </div>
                            <div className={styles.date + " w-1/5 max-md:w-full"}>
                                <p className="text-xs">Date: <span>{item?.created}</span></p>
                                <p className="text-xs">Refrence Number: <span>{item?.trace}</span></p>
                                <div className="flex gap-2 items-center mt-2">
                                    <p className="font-bold text-sm">Completed</p>
                                    <div className="w-3 h-3 bg-[#1DC57D]"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }

        </div>
    )
}

export default OrderHistory;