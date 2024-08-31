import React from "react";
import styles from "./styles.module.scss";
import { domain, image_url } from "../../api/domain";
import Link from "next/link";

const RecommendItem = ({image , slug , desc , price}) => {
    return(
        <div className={styles.shopitem}>
            <Link href={"/product/" + slug}>
                <div className={styles.shopitem__image + " border w-full overflow-hidden h-full max-h-[400px]"}>
                    <img className="object-cover w-full h-full" src={image_url + image} alt="image" />
                </div>
            </Link>
            <div className={styles.shopitem__desc + " text-left mt-1 flex flex-col"}>
                <p className="max-md:text-[7px] max-md:leading-3 text-[10px]">
                    {desc}  
                </p>
                <p className="text-[12px] text-[#959494]">
                    {price + " AED"} 
                </p>
            </div>
        </div>
    )
}

export default RecommendItem;