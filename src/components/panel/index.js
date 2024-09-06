import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useAuth } from "../../context/authContext";
import PersonalInformation from "../form/personalInformation";
import PanelAdress from "./panelAdress";
import OrderHistory from "./orderHistory";
import LikeProducts from "./likeProducts";

const Panel = () => {

    const [panelLevel , setPanelLevel] = useState("info")
    const {signOut} = useAuth();

    const handleSignout = () => {
        if(window.confirm("Are you sure you want to sign out?")){
            signOut();
        }
    }



    return(
        <div className={styles.panel + " mt-10 min-h-[80vh]"}>
            <div className={styles.panelwrapper + " mb-20 flex flex-col gap-6 h-full"}>
                <p  className={styles.title + " text-xl max-md:text-xl max-md:text-center text-left text-center"}>MY ACCOUNT</p>
                <div className={styles.items + " flex w-full gap-10 bg-black items-center justify-center max-md:gap-4"}>
                    {panelLevel == "info" ?
                        <div className={styles.item + " py-3 cursor-pointer flex gap-2 items-center justify-center bg-black border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-white"}>
                            <p className="text-white text-center text-xs">
                                My Information
                            </p>
                        </div> :
                        <div className={styles.item + " py-3 cursor-pointer flex gap-2 items-center justify-center border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-black"} onClick={() => setPanelLevel("info")}>
                            <p className="text-white text-center text-xs hover:text-[#27BDBE] duration-300">
                                My Information
                            </p>
                        </div>
                    }
                    {panelLevel == "address" ?
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center bg-black border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-white"}>
                            <p className="text-white text-center text-xs">
                                My address
                            </p>
                        </div> :
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-black"} onClick={() => setPanelLevel("address")}>
                            <p className="text-white text-center text-xs hover:text-[#27BDBE] duration-300">
                                My address
                            </p>
                        </div>
                    }
                    {panelLevel == "order" ?
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center bg-black border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-white"}>
                            <p className="text-white text-center text-xs">
                                Order History
                            </p>
                        </div> :
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-black"} onClick={() => setPanelLevel("order")}>
                            <p className="text-white text-center text-xs hover:text-[#27BDBE] duration-300">
                                Order History
                            </p>
                        </div>
                    }
                    {panelLevel == "like" ?
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center bg-black border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-white"}>
                            <p className="text-white text-center text-xs">
                                Likes
                            </p>
                        </div> :
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-black"} onClick={() => setPanelLevel("like")}>
                            <p className="text-white text-center text-xs hover:text-[#27BDBE] duration-300">
                                Likes
                            </p>
                        </div>
                    }
                    <div className={styles.signout + " max-md:text-center flex"}>
                        <div className={styles.item + " py-3 cursor-pointer flex gap-3 items-center justify-center border-t border-t-[8px] border-t-black border-b border-b-[8px] border-b-black"} onClick={handleSignout}>
                            <p className=" text-center text-xs text-[#27BDBE] font-bold">
                                Sign Out
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex max-md:flex-col gap-10 w-11/12 container mx-auto h-full">
                    <div className={styles.panel__container + " w-full max-md:w-full h-full"}>
                        {panelLevel == "info" ? 
                            <PersonalInformation /> : 
                        panelLevel == "address" ? 
                            <PanelAdress /> :
                        panelLevel == "order" ? 
                            <OrderHistory /> :
                        panelLevel == "like" ? 
                            <LikeProducts /> : ""
                        }
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

export default Panel;