import React from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import { domain } from "../../api/domain";
import Link from "next/link";

const CartPopUp = ({image , title , size , color , quantity , price , total , cartNumber , id}) => {


    const handleScroll = () => {
        document.body.classList.remove("noScroll");
    }


    return(
        <div className={styles.cartpopup + " absolute top-0 left-0 w-full h-full bg-black z-50"} onclick={onclick}>
            <div className={styles.cartpopupwrapper + " bg-white max-w-[600px] flex max-md:flex-col mt-10 gap-5 rounded-lg p-4 mx-auto w-3/5 justify-between items-center"}>
                <div className={styles.cartpopup__product + " w-3/5 max-md:w-full max-md:border-r-0 max-md:border-b max-md:pb-2 max-md:border-b-black border-r border-r-black flex flex-col gap-2"}>
                    <div className={styles.pass + " flex gap-1"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.393 4.98187C16.7021 5.29104 16.7021 5.79229 16.393 6.10146L9.59588 12.8985C8.66839 13.826 7.16462 13.826 6.23713 12.8985L3.39838 10.0598C3.08921 9.75063 3.08921 9.24937 3.39838 8.94021C3.70754 8.63104 4.2088 8.63104 4.51796 8.94021L7.35671 11.779C7.66588 12.0881 8.16713 12.0881 8.4763 11.779L15.2734 4.98187C15.5825 4.67271 16.0838 4.67271 16.393 4.98187Z" fill="#27BDBE"/>
                        </svg>
                        <p className="text-xs text-[#27BDBE]">PRODUCT ADDED TO THE BAG CORRECTLY</p>
                    </div>
                    <div className={styles.product + " flex gap-4"}>
                        <div className={styles.image + " w-[105px] overflow-hidden"}>
                            <img className="object-cover w-full" src={image} alt="image" />
                        </div>
                        <div className={styles.desc + " flex flex-col gap-2"}>
                            <p className={styles.title + " font-bold text-xs text-[#2B2B2B]"}>{title}</p>
                            <p className={styles.item + " text-xs text-[#2B2B2B]"}>Size: <span className="font-bold text-black">{size}</span></p>
                            <p className={styles.item + " text-xs text-[#2B2B2B]"}>Color: <span className="font-bold text-black">{color}</span></p>
                            <p className={styles.item + " text-xs text-[#2B2B2B]"}>Quantity: <span className="font-bold text-black">{quantity}</span></p>
                            <p className={styles.item + " text-xs text-[#2B2B2B]"}>Price: <span className="font-bold text-black">{price}</span><span className="font-bold text-black"> AED</span></p>
                        </div>
                    </div>
                </div>
                <div className={styles.total + " w-2/5 max-md:w-full flex flex-col gap-4"}>
                    {cartNumber == 1 ?
                        <p className={styles.title + " text-xs text-center"}>
                            There are <span>{cartNumber}</span> item in your bag
                        </p> :
                        <p className={styles.title + " text-xs text-center"}>
                            There are <span>{cartNumber}</span> items in your bag
                        </p>
                    }
                    <div className={styles.price + " text-xs flex justify-between items-center"}>
                        <p className="font-bold">Total:</p>
                        <p className="font-bold">{total} <span>AED</span></p>
                    </div>
                    <p className="text-xs text-center underline cursor-pointer hover:text-[#27BDBE]">Continue shopping</p>
                    <div className={styles.button + " mx-auto"}>
                        <Link href={"/cart"} onClick={handleScroll}>
                            <BluePrimaryButton>Go to your shopping bag</BluePrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPopUp;