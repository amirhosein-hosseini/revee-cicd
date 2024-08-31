import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { SecondBlackPrimaryButton } from "../button";
import { domain, image_url } from "../../api/domain";
import Link from "next/link";

const Category = ({category , category_title , description , id , image , slug}) => {


    return(
        <div className={styles.category}>
            
            <Link className="relative w-full h-full" href={"/gender/" + category}>
                <div className="absolute top-0 left-0 w-full h-full" style={{background:"#27BDBEB2" , zIndex: "100"}}></div>
                <img src={image} alt="image" />
                <div className={styles.category__desc + " flex flex-col justify-between max-md:py-2 py-10 max-md:px-2 px-6"}>
                    <div className={styles.top + " flex flex-col gap-1 mt-auto"}>
                        <p className={styles.title + " max-md:text-[10px] max-md:leading-3 text-5xl text-white text-left font-semibold"}>
                            {category_title}
                        </p>
                        <p className={styles.desc + " max-md:text-[6px] max-md:leading-3 text-xl text-white text-left font-normal"}>
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Category;