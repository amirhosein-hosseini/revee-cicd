import React from "react";
import styles from "./styles.module.scss";

export const GrayPrimaryBtn = ({children}) => {
    return(
        <button className={styles.primarybtn + " max-md:py-1 hover:bg-[#9D9B9B] duration-300 py-2 max-md:px-2 max-md:text-xs px-6 bg-[#B1B1B1] text-white"}>
            {children}
        </button>
    )
}

export const BluePrimaryButton = ({children}) => {
    return(
        <button className={styles.BluePrimaryButton + " flex items-center hover:bg-[#7FD4D5] duration-300 hover:gap-2 justify-center text-center gap-1 max-md:py-1 py-2 text-sm max-md:px-2 px-5 max-md:text-xs bg-[#27BDBE] text-white"}>
            {children}
        </button>
    )
}

export const DeBluePrimaryButton = ({children}) => {
    return(
        <button className={styles.DeBluePrimaryButton + " flex items-center duration-300 hover:gap-2 justify-center text-center gap-1 max-md:py-1 py-2 text-sm max-md:px-2 px-5 max-md:text-xs text-white"}>
            {children}
        </button>
    )
}

export const SecondPrimaryButton = ({children}) => {
    return(
        <button className={styles.secondprimarybutton + " hover:bg-[#7FD4D5] duration-300 py-2 max-md:px-10 px-10 bg-[#27BDBE] text-white rounded-lg text-xs"}>
            {children}
        </button>
    )
}


export const SecondBlackPrimaryButton = ({children}) => {
    return(
        <button className={styles.secondprimarybutton + " hover:bg-[#2C2A2A] duration-300 max-md:py-1 py-2 max-md:px-2 px-6 max-md:text-xs bg-black text-white rounded-lg"}>
            {children}
        </button>
    )
}


export const OutlineBlueButton = ({children}) => {
    return(
        <button className={styles.OutlineBlueButton + " tracking-widest max-md:py-1 py-1 max-md:px-2 px-6 border-2 max-md:text-xs"}>
            {children}
        </button>
    )
}



export const OutlineBlackButton = ({children}) => {
    return(
        <button className={styles.OutlineBlackButton + " text-sm tracking-widest max-md:py-1 py-2 max-md:px-2 px-6 border-2 max-md:text-xs"}>
            {children}
        </button>
    )
}