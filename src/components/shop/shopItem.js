import React from "react";
import styles from "./styles.module.scss";
import { domain, image_url } from "../../api/domain";
import Link from "next/link";

const ShopItem = ({gender , cover_image, subCategories , off_price , percent_discount , price , product , product_code , slug , subtitle}) => {
    return(
        <div className={styles.shopitem} style={{direction: "ltr"}}>
            <Link href={"/product/" + slug}>
                <div className={styles.shopitem__image + " w-full overflow-hidden"}>
                    <img className="object-cover w-full" src={image_url + cover_image} alt="image" />
                    <div className={styles.overlay}>
                        <svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                    </div>
                </div>
            </Link>
            <div className={styles.shopitem__info + " flex justify-between items-center mt-5"}>
                <p className={styles.title + " max-md:text-[7px] text-[14px] font-bold"}>
                    {product}
                </p>
            </div>
            <div className={styles.shopitem__desc}>
                <p  className="max-md:text-[8px] max-md:leading-3 text-sm font-bold">
                    {subtitle + " "}
                    {gender}
                </p>
            </div>
            <div className={styles.shopitem__desc}>
                <div className={styles.price + " flex gap-3 items-center mb-8 mt-1"}>
                    {percent_discount === 0 || percent_discount === "0" || percent_discount === null || percent_discount === undefined ? 
                        <>
                            <p className={styles.realprice + " text-sm max-md:text-xs text-[#27BDBE]"}>{off_price} AED</p>
                        </>                                
                        :
                        <>
                            <p className={styles.previousprice + " font-noraml text-sm text-[#27BDBE] line-through"}>{price} AED</p>
                            <p className={styles.realprice + " text-sm max-md:text-xs text-[#27BDBE]"}>{off_price} AED</p>
                        </>
                        }
                </div>
            </div>
        </div>
    )
}

export default ShopItem;