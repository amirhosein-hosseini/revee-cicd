import React from "react";
import { BluePrimaryButton } from "../button";
import styles from "./styles.module.scss";
import Link from "next/link";

const Subscribe = () => {
    return(
        <div className={styles.subscribe + " max-md:py-10 py-20"}>
            <div className={styles.gradient}></div>
            <div className={styles.wrappper + " w-11/12 max-w-5xl mx-auto flex flex-col max-md:gap-10 gap-20"}>
                <div className={styles.subscribe__header + " flex gap-2 items-center justify-center"}>
                    <div className={styles.image}>
                        <img src="../../images/subdoctors.png" alt="image" />
                    </div>
                    <div className={styles.number}>
                        <p className="text-xl font-bold">
                            <span>
                                999+
                            </span>
                            Doctors
                        </p>
                    </div>
                    <div className={styles.vector}>
                        <img src="../../images/subvector.png" alt="vector" />
                    </div>
                </div>
                <div className={styles.subscribe__content + " flex flex-col justify-center items-center gap-4"}>
                    <p className={styles.title + " text-center max-md:text-xl text-4xl text-[#27BDBE] font-extrabold"}>
                        Join 900+ subscribers
                    </p>
                    <p className={styles.desc + " text-center max-md:text-sm text-3xl text-[#9D9D9D] font-normal"}>
                        Stay in the loop with everything you need to know.
                    </p>
                </div>
                <div className={styles.subscribe__button + " flex justify-center items-center"}>
                    <Link href={"/signin"}>
                        <BluePrimaryButton>
                            Sign Up 
                        </BluePrimaryButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Subscribe;