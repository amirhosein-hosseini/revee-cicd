import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton } from "../button";
import Link from "next/link";
import { getAllCategories } from "@/api/category";
import { toast } from "react-toastify";
import axios from "axios";
import { domain } from "@/api/domain";

const Footer = () => {


    const [categories , setCategories] = useState(null);
    const [email , setEmail] = useState(null);
    const [loading , setLoading] = useState(null);


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }


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


    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true)


        axios.post(domain + 'home/newsletter/', {email : email})
            .then((response) => {
                toast.success("Submitted Successfully")
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
            .finally(() => {
                setLoading(false)
            });
    };







    return(
        <div className={styles.footer + " bg-[#232323] py-10"}>
            <div className="container max-w-7xl w-11/12 mx-auto">
                <div className="flex items-start justify-between gap-10 max-md:gap-6 max-md:flex-col">
                    <div className="w-1/2 flex flex-col gap-10 max-md:gap-6 max-md:w-full">
                        <div>
                            <p className="text-white text-lg max-md:text-sm">
                                <span className="text-xl font-bold max-md:text-lg">Recover in Style.</span>
                                Empowering your
                                <br/>
                                journey to wellness with premium 
                                <br/>
                                post-operative care products.
                            </p>
                        </div>
                        <div className="max-md:max-w-[100px] overflow-hidden">
                            <img src="../../images/footerlogo.png" alt="logo" />
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-7 max-md:gap-5 max-md:w-full">
                        <div className="flex flex-col gap-3">
                            <p className="mb-[-9px] text-sm font-bold text-white">
                                Newsletter sign up
                            </p>
                            <span className="text-sm text-white">
                                Lets keep in touch
                            </span>
                            <div className="mb-4 flex items-center gap-2">
                                <input className="bg-transparent border border-white p-[12px] w-full text-xs text-white" type="text" onChange={handleEmailChange} placeholder="Enter Email Address "/>
                                <div className="">
                                    {loading === true ? 
                                        <button className="bg-white border border-white font-bold p-[13.5px] text-xs text-[#232323]">
                                            <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                            </svg>
                                        </button> : 
                                        <button className="bg-white border border-white font-bold p-[13.5px] text-xs text-[#232323]" onClick={handleSubmit}>
                                            SUBSCRIBE
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="flex items-bottom gap-5 justify-between max-md:flex-col">
                            <div className="w-1/2 max-md:w-full">
                                <p className="text-[15px] text-white max-md:text-[12px]">
                                    610 Clover Bay Tower, Business Bay,
                                    <br/>
                                    Dubai, United Arab Emirates.
                                    <br/>
                                    +971 44495097  |  info[at]healfit.ae 
                                </p>
                            </div>
                            <div className="flex items-center gap-2 max-md:w-full w-1/2 ml-auto justify-end max-md:justify-start">
                                <a target="_blank" href="https://www.instagram.com/revee.uae">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_16_178)">
                                            <path d="M14.7293 2.65242C18.6648 2.65242 19.1308 2.66968 20.6785 2.73873C22.1169 2.80202 22.8937 3.04367 23.4115 3.24505C24.0962 3.50971 24.591 3.83191 25.1031 4.34399C25.6209 4.86181 25.9373 5.35087 26.202 6.03555C26.4034 6.55338 26.645 7.33587 26.7083 8.76852C26.7774 10.322 26.7946 10.788 26.7946 14.7178C26.7946 18.6533 26.7774 19.1193 26.7083 20.667C26.645 22.1054 26.4034 22.8822 26.202 23.4C25.9373 24.0847 25.6151 24.5795 25.1031 25.0916C24.5852 25.6094 24.0962 25.9258 23.4115 26.1905C22.8937 26.3919 22.1112 26.6335 20.6785 26.6968C19.1251 26.7659 18.659 26.7831 14.7293 26.7831C10.7938 26.7831 10.3278 26.7659 8.78003 26.6968C7.34163 26.6335 6.56489 26.3919 6.04706 26.1905C5.36238 25.9258 4.86757 25.6036 4.35549 25.0916C3.83767 24.5737 3.52122 24.0847 3.25655 23.4C3.05518 22.8822 2.81352 22.0997 2.75023 20.667C2.68119 19.1135 2.66393 18.6475 2.66393 14.7178C2.66393 10.7823 2.68119 10.3163 2.75023 8.76852C2.81352 7.33012 3.05518 6.55338 3.25655 6.03555C3.52122 5.35087 3.84342 4.85606 4.35549 4.34399C4.87332 3.82616 5.36238 3.50971 6.04706 3.24505C6.56489 3.04367 7.34738 2.80202 8.78003 2.73873C10.3278 2.66968 10.7938 2.65242 14.7293 2.65242ZM14.7293 0C10.7305 0 10.2299 0.0172609 8.65921 0.0863044C7.09422 0.155348 6.01829 0.408507 5.08621 0.770986C4.11384 1.15073 3.29107 1.65129 2.47406 2.47406C1.65129 3.29107 1.15073 4.11384 0.770986 5.08045C0.408507 6.01829 0.155348 7.08847 0.0863044 8.65345C0.0172609 10.2299 0 10.7305 0 14.7293C0 18.7281 0.0172609 19.2286 0.0863044 20.7994C0.155348 22.3643 0.408507 23.4403 0.770986 24.3724C1.15073 25.3447 1.65129 26.1675 2.47406 26.9845C3.29107 27.8015 4.11384 28.3078 5.08045 28.6818C6.01829 29.0443 7.08847 29.2975 8.65345 29.3665C10.2242 29.4355 10.7248 29.4528 14.7235 29.4528C18.7223 29.4528 19.2229 29.4355 20.7936 29.3665C22.3586 29.2975 23.4345 29.0443 24.3666 28.6818C25.3332 28.3078 26.156 27.8015 26.973 26.9845C27.79 26.1675 28.2963 25.3447 28.6703 24.3781C29.0328 23.4403 29.286 22.3701 29.355 20.8051C29.424 19.2344 29.4413 18.7338 29.4413 14.735C29.4413 10.7363 29.424 10.2357 29.355 8.66496C29.286 7.09997 29.0328 6.02405 28.6703 5.09196C28.3078 4.11384 27.8073 3.29107 26.9845 2.47406C26.1675 1.65704 25.3447 1.15073 24.3781 0.776739C23.4403 0.414261 22.3701 0.161102 20.8051 0.092058C19.2286 0.0172609 18.7281 0 14.7293 0Z" fill="white" />
                                            <path d="M14.7293 7.16327C10.5522 7.16327 7.16333 10.5522 7.16333 14.7293C7.16333 18.9064 10.5522 22.2953 14.7293 22.2953C18.9065 22.2953 22.2954 18.9064 22.2954 14.7293C22.2954 10.5522 18.9065 7.16327 14.7293 7.16327ZM14.7293 19.6371C12.0194 19.6371 9.82151 17.4392 9.82151 14.7293C9.82151 12.0193 12.0194 9.82144 14.7293 9.82144C17.4393 9.82144 19.6372 12.0193 19.6372 14.7293C19.6372 17.4392 17.4393 19.6371 14.7293 19.6371Z" fill="white" />
                                            <path d="M24.3608 6.86402C24.3608 7.84214 23.5669 8.63039 22.5945 8.63039C21.6164 8.63039 20.8281 7.83639 20.8281 6.86402C20.8281 5.8859 21.6221 5.09766 22.5945 5.09766C23.5669 5.09766 24.3608 5.89166 24.3608 6.86402Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_16_178">
                                                <rect width="29.4586" height="29.4586" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/company/healfit-ae/">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M27.7421 0H2.63898C1.43647 0 0.464111 0.949348 0.464111 2.12309V27.3297C0.464111 28.5035 1.43647 29.4586 2.63898 29.4586H27.7421C28.9446 29.4586 29.9227 28.5035 29.9227 27.3355V2.12309C29.9227 0.949348 28.9446 0 27.7421 0ZM9.20387 25.1031H4.83111V11.0412H9.20387V25.1031ZM7.01749 9.12525C5.61361 9.12525 4.48014 7.99179 4.48014 6.59365C4.48014 5.19552 5.61361 4.06206 7.01749 4.06206C8.41562 4.06206 9.54909 5.19552 9.54909 6.59365C9.54909 7.98603 8.41562 9.12525 7.01749 9.12525ZM25.5672 25.1031H21.2002V18.2678C21.2002 16.6395 21.1714 14.5394 18.9275 14.5394C16.6548 14.5394 16.3096 16.3173 16.3096 18.1527V25.1031H11.9483V11.0412H16.137V12.9629H16.1945C16.7756 11.8582 18.2025 10.6902 20.3256 10.6902C24.7502 10.6902 25.5672 13.6016 25.5672 17.3875V25.1031Z" fill="white" />
                                    </svg>
                                </a>
                                {/* <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                </svg> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex gap-5 mt-20 max-md:mt-10">
                    <div className="w-3/4 max-md:hidden">
                        <div className="border-b border-b-[#8E8E8E] pb-2">
                            <p className="text-lg text-white">
                                Products
                            </p>
                        </div>
                        <div className="flex items-start gap-6">
                            {categories?.map((item) => (
                                <div className="flex flex-col gap-2 mt-3">
                                    <Link href={"/category/" + item?.slug} className="text-[#939393] hover:text-white duration-300 font-bold text-xl">
                                        {item?.category_title}
                                    </Link>
                                    <div className="flex flex-col gap-1 text-[#939393] text-">
                                        {item?.subcategories?.map((subItem) => (
                                            <Link className=" hover:text-white duration-300" href={"/category/" + item?.slug + "/" + subItem?.slug}>{subItem?.subcategory_title}</Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-col gap-9 max-md:w-full">
                        <div className="flex flex-col gap-5">
                            <div className="border-b border-b-[#8E8E8E] pb-2">
                                <p className="text-lg text-white max-md:text-sm">
                                    Company
                                </p>
                            </div>
                            <div className="flex flex-col text-lg max-md:text-sm text-[#939393]">
                                <Link className=" hover:text-white duration-300" href={"/about"}>About Healfit</Link>
                                <Link className=" hover:text-white duration-300" href={"#"}>Blog</Link>
                                <Link className=" hover:text-white duration-300" href={"#"}>Careers</Link>
                                <Link className=" hover:text-white duration-300" href={"#"}>Sitemap</Link>
                                <Link className=" hover:text-white duration-300" href={"/contact"}>Contact Us</Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="border-b border-b-[#8E8E8E] pb-2">
                                <p className="text-lg text-white max-md:text-sm">
                                    Customer Service
                                </p>
                            </div>
                            <div className="flex flex-col text-lg max-md:text-sm text-[#939393]">
                                <Link className=" hover:text-white duration-300" href={"#"}>Customer Care</Link>
                                <Link className=" hover:text-white duration-300" href={"#"}>Wholesale Inquiry</Link>
                                <Link className=" hover:text-white duration-300" href={"#"}>Return & Refund Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex items-start justify-between gap-20 border-t border-t-[#8E8E8E] pt-8 mt-10 max-md:flex-col">
                    <div className="flex items-start gap-4 w-1/2  max-md:flex-col max-md:w-full">
                        <div className="w-1/2 max-md:w-full">
                            <p className="text-lg text-white max-md:text-sm">
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
                            <p className="text-lg text-white max-md:text-sm">
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
                        <Link className=" hover:text-white duration-300" href={"/privacy"}>Privacy Policy</Link>
                        <Link className=" hover:text-white duration-300" href={"/conditions"}>Terms & Conditions</Link>
                        <Link className=" hover:text-white duration-300" href={"/shipping-delivery"}>Shipping & Delivery</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;