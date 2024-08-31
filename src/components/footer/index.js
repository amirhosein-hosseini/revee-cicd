import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import Link from "next/link";
import { getAllCategories } from "@/api/category";

const Footer = () => {


    const [categories , setCategories] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);





    return(
        <div className={styles.footer + " bg-[#232323] py-10"}>
            <div className="container max-w-7xl w-11/12 mx-auto">
                <div className="flex items-start justify-between gap-10 max-md:flex-col">
                    <div className="w-1/2 flex flex-col gap-10 max-md:w-full">
                        <div>
                            <p className="text-white text-lg">
                                <span className="text-xl font-bold">Recover in Style.</span>
                                Empowering your
                                <br/>
                                journey to wellness with premium 
                                <br/>
                                post-operative care products.
                            </p>
                        </div>
                        <div>
                            <img src="../../images/footerlogo.png" alt="logo" />
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-7 max-md:w-full">
                        <div className="flex flex-col gap-3">
                            <p className="mb-[-9px] text-sm font-bold text-white">
                                Newsletter sign up
                            </p>
                            <span className="text-sm text-white">
                                Lets keep in touch
                            </span>
                            <div className="mb-4 flex items-center gap-2">
                                <input className="bg-transparent border border-white p-[12px] w-full text-xs" type="text" placeholder="Enter Email Address "/>
                                <div className="">
                                    <button className="bg-white border border-white font-bold p-[13.5px] text-xs text-[#232323]">
                                        SUBSCRIBE   
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-bottom gap-5 justify-between max-md:flex-col">
                            <div className="w-1/2 max-md:w-full">
                                <p className="text-[15px] text-white">
                                    610 Clover Bay Tower, Business Bay,
                                    <br/>
                                    Dubai, United Arab Emirates.
                                    <br/>
                                    +971 44495097  |  info[at]healfit.ae 
                                </p>
                            </div>
                            <div className="flex items-center gap-2 max-md:w-full w-1/2 ml-auto justify-end max-md:justify-start">
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.3 34.214C27.2556 34.214 34.5156 26.9513 34.5156 17.9923C34.5156 9.03324 27.2556 1.77052 18.3 1.77052C9.3444 1.77052 2.08447 9.03324 2.08447 17.9923C2.08447 26.9513 9.3444 34.214 18.3 34.214Z" stroke="white" stroke-width="3" stroke-miterlimit="10" />
                                </svg>
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.3 34.214C27.2556 34.214 34.5156 26.9513 34.5156 17.9923C34.5156 9.03324 27.2556 1.77052 18.3 1.77052C9.3444 1.77052 2.08447 9.03324 2.08447 17.9923C2.08447 26.9513 9.3444 34.214 18.3 34.214Z" stroke="white" stroke-width="3" stroke-miterlimit="10" />
                                </svg>
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.3 34.214C27.2556 34.214 34.5156 26.9513 34.5156 17.9923C34.5156 9.03324 27.2556 1.77052 18.3 1.77052C9.3444 1.77052 2.08447 9.03324 2.08447 17.9923C2.08447 26.9513 9.3444 34.214 18.3 34.214Z" stroke="white" stroke-width="3" stroke-miterlimit="10" />
                                </svg>
                                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.3 34.214C27.2556 34.214 34.5156 26.9513 34.5156 17.9923C34.5156 9.03324 27.2556 1.77052 18.3 1.77052C9.3444 1.77052 2.08447 9.03324 2.08447 17.9923C2.08447 26.9513 9.3444 34.214 18.3 34.214Z" stroke="white" stroke-width="3" stroke-miterlimit="10" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex gap-5 mt-20">
                    <div className="w-3/4 max-md:hidden">
                        <div className="border-b border-b-[#8E8E8E] pb-2">
                            <p className="text-lg text-white">
                                Products
                            </p>
                        </div>
                        <div className="flex items-start gap-6">
                            {categories?.map((item) => (
                                <div className="flex flex-col gap-1 mt-3">
                                    <Link href={"/category/" + item?.slug} className="text-[#939393] font-bold text-lg">
                                        {item?.category_title}
                                    </Link>
                                    <div className="flex flex-col gap-1 text-[#939393] text-lg">
                                        {item?.subcategories?.map((subItem) => (
                                            <Link href={"/category/" + item?.slug + "/" + subItem?.slug}>{subItem?.subcategory_title}</Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-col gap-9 max-md:w-full">
                        <div className="flex flex-col gap-5">
                            <div className="border-b border-b-[#8E8E8E] pb-2">
                                <p className="text-lg text-white">
                                    Company
                                </p>
                            </div>
                            <div className="flex flex-col text-lg text-[#939393]">
                                <Link href={"/about"}>About Healfit</Link>
                                <Link href={"/blog"}>Blog</Link>
                                <Link href={"/careers"}>Careers</Link>
                                <Link href={"/site-map"}>Sitemap</Link>
                                <Link href={"/contact"}>Contact Us</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="border-b border-b-[#8E8E8E] pb-2">
                                <p className="text-lg text-white">
                                    Customer Service
                                </p>
                            </div>
                            <div className="flex flex-col text-lg text-[#939393]">
                                <Link href={"/about"}>Customer Care</Link>
                                <Link href={"/blog"}>Wholesale Inquiry</Link>
                                <Link href={"/careers"}>Return & Refund Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-start justify-between gap-20 border-t border-t-[#8E8E8E] pt-8 mt-10 max-md:flex-col">
                    <div className="flex items-start gap-4 w-1/2  max-md:flex-col max-md:w-full">
                        <div className="w-1/2 max-md:w-full">
                            <p className="text-lg text-white">
                                Some of products certifications:
                            </p>
                        </div>
                        <div className="w-1/2 flex flex-col gap-8 max-md:w-full">
                            <div className="flex items-center gap-3">
                                <div>
                                    <img src="../../images/c1.png" alt="logo" />
                                </div>
                                <div>
                                    <img src="../../images/c2.png" alt="logo" />
                                </div>
                                <div>
                                    <img src="../../images/c3.png" alt="logo" />
                                </div>
                                <div>
                                    <img src="../../images/c4.png" alt="logo" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1/3 overflow-hidden">
                                    <img className="object-cover w-full" src="../../images/europe.png" alt="logo" />
                                </div>
                                <p className="w-2/3 text-xs text-[#939393] leading-[19px]">
                                    Guaine Post-Chirurgiche
                                    Innovative di alta Qualità,
                                    prodotte in Europa
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 ml-auto flex items-start gap-4 max-md:w-full">
                        <div className="w-1/2">
                            <p className="text-lg text-white">
                                Payment methods:
                            </p>
                        </div>
                        <div className="w-1/2 flex items-center justify-center gap-3 flex-row-reverse">
                            <div>
                                <img src="../../images/visa.png" alt="logo" />
                            </div>
                            <div>
                                <img src="../../images/master.png" alt="logo" />
                            </div>
                            <div>
                                <img src="../../images/pay.png" alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-center justify-between gap-20 border-t border-t-[#8E8E8E] pt-8 mt-10">
                    <div className="w-7/12 flex flex-col gap-2 text-xs text-[#939393] max-md:hidden">
                        <p>
                            © 2024 Healfit, a Brand of SATELEC LLC FZ. All Rights Reserved.
                        </p>
                        <p className="text-[9px] leading-3">
                            Healfit and the Healfit logo are trademarks of SATELEC LLC FZ, registered in the United Arab Emirates. No part of this website or its content may be reproduced, distributed, or transmitted in any form or by any means
                            without the prior written permission of SATELEC LLC FZ. For inquiries or permission requests, please contact us at info[at]healfit.ae
                        </p>
                    </div>
                    <div className="w-5/12 flex items-center gap-3 text-sm text-[#939393] justify-end max-md:w-full max-md:text-xs max-md:justify-center">
                        <Link href={"/privacy"}>Privacy Policy</Link>
                        <Link href={"/conditions"}>Terms & Conditions</Link>
                        <Link href={"/shipping-delivery"}>Shipping & Delivery</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;