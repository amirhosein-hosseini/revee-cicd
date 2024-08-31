import React from "react";
import styles from "./styles.module.scss";

const Loading = () => {
    return(
        <div className={styles.loading + " absolute h-screen z-50 w-full top-0 left-0 bg-white flex items-center justify-center"}>
            <div className={styles.loadingwrapper + " flex flex-col gap-10"}>
                <div className={styles.image}>
                    <img src="../../images/logo.png" alt="logo" />
                </div>
                <div className={styles.loadingsvg}>
                    <svg
                    className={styles.spinner}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    >
                    <circle
                        className={styles.path}
                        style={{stroke: "#27BDBE"}}
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="4"
                    />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Loading;