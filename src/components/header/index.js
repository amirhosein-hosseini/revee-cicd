import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAuth } from "../../context/authContext";
import { getAllPersonalInformation } from "../../api/user";
import Link from "next/link";
import TopHeader from "./top";
import { getAllCategories } from "@/api/category";
import { getLogoData } from "@/api/index";
import { useRouter } from "next/router";


const Header = () => {


    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showPromo, setShowPromo] = useState(false);
    const { isLoggedIn } = useAuth();
    const [personalInformation, setPersonalInformation] = useState(null);
    const [categories , setCategories] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchInput , setSearchInput] = useState("");
    const [logo , setLogo] = useState(null);





    // function for opening nav
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    
        if (!isNavOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

    // function for getting cart items
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // get all user information
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPersonalInformation();
                setPersonalInformation(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLogoData();
                setLogo(data?.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    console.log(logo)



    useEffect(() => {
        if (cartItems.length > 0) {
            setShowPromo(true);
        } else {
            setShowPromo(false);
        }
    }, []);


    // Update searchInput state when input value changes
    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };


    const handleSearch = () => {
        const encodedInputValue = encodeURIComponent(searchInput.trim());
        router.push(`/search/${encodedInputValue}`);
    };
    






    

    return (
        <div className="mb-5">
            <TopHeader />
            <div className="border-b border-b-[#C5C5C5]">
                <div className={styles.header + " w-11/12 container max-w-7xl mx-auto flex justify-between items-center py-3 max-md:py-5"}>
                    <div className="flex items-center gap-10 max-md:gap-5">
                        <div className={styles.logo + " max-w-[170px] max-md:max-w-[100px] max-h-[50px] max-md:max-h-[30px] overflow-hidden"}>
                            <Link href={"/"} className="object-contain w-full h-full">
                                <img className="object-contain w-full h-full" src={logo?.logo} alt={logo?.logo_alt} />
                            </Link>
                        </div>
                        <div className="flex items-center gap-10 max-md:gap-5">
                            <Link className="max-md:text-xs hover:text-[#27BDBE] duration-300" href={"/gender/women"}>Women</Link>
                            <Link className="max-md:text-xs hover:text-[#27BDBE] duration-300" href={"/gender/men"}>Men</Link>
                        </div>
                    </div>
                    <div className={styles.navopen + " hidden max-md:block"} onClick={toggleNav}>
                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="28" height="18" viewBox="0 0 28 18" fill="none">
                            <path d="M2 1.7168H26" stroke="black" strokeWidth="2.24007" strokeLinecap="round" />
                            <path d="M2 8.85864H26" stroke="black" strokeWidth="2.24007" strokeLinecap="round" />
                            <path d="M2 16H26" stroke="black" strokeWidth="2.24007" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className={styles.assets + " flex items-center gap-6"}>
                        <div className={styles.item}>
                            <div className="relative w-[430px]">
                                <input
                                    onChange={handleChange} 
                                    value={searchInput} 
                                    type="text" 
                                    className="bg-[#F1F1F1] w-full p-[8px] pl-10" 
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault(); // Prevent default form submission
                                            handleSearch();
                                        }
                                    }}
                                />
                                <Link href={"/search/" + searchInput}>
                                    <button className="absolute top-0 right-0 bg-[#27BDBE] h-full flex items-center justify-center text-white px-2 text-sm">Search</button>
                                </Link>
                                <svg className="absolute top-3 left-2" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9ZM16.0319 14.6177C17.2635 13.078 18 11.125 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C11.125 18 13.078 17.2635 14.6177 16.0319L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L16.0319 14.6177Z" fill="#888888" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <Link href={"/cart"}>
                                {cartItems.length > 0 ?
                                    <div className="flex flex-col gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.05134 7.58349L10.702 2.93286C11.9712 1.66366 14.029 1.66365 15.2982 2.93286L19.9488 7.58349H22.5843C23.2436 7.58349 23.75 8.1674 23.6567 8.82003L22.0653 19.9598C21.8366 21.5609 20.4654 22.7502 18.848 22.7502H7.1521C5.53473 22.7502 4.16349 21.5609 3.93476 19.9598L2.34337 8.82003C2.25013 8.16739 2.75655 7.58349 3.41581 7.58349H6.05134ZM12.234 4.46493C12.6571 4.04186 13.343 4.04186 13.7661 4.46492L16.8847 7.58349L9.11547 7.58349L12.234 4.46493ZM4.66491 9.75016L6.07965 19.6534C6.15589 20.1871 6.61297 20.5835 7.1521 20.5835H18.848C19.3871 20.5835 19.8442 20.1871 19.9205 19.6534L21.3352 9.75016H4.66491Z" fill="#35383F" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.66671 11.9165C9.26502 11.9165 9.75004 12.4015 9.75004 12.9998V17.3332C9.75004 17.9315 9.26502 18.4165 8.66671 18.4165C8.0684 18.4165 7.58337 17.9315 7.58337 17.3332V12.9998C7.58337 12.4015 8.0684 11.9165 8.66671 11.9165Z" fill="#35383F" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11.9165C13.5983 11.9165 14.0833 12.4015 14.0833 12.9998V17.3332C14.0833 17.9315 13.5983 18.4165 13 18.4165C12.4017 18.4165 11.9166 17.9315 11.9166 17.3332V12.9998C11.9166 12.4015 12.4017 11.9165 13 11.9165Z" fill="#35383F" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3333 11.9165C17.9316 11.9165 18.4167 12.4015 18.4167 12.9998V17.3332C18.4167 17.9315 17.9316 18.4165 17.3333 18.4165C16.735 18.4165 16.25 17.9315 16.25 17.3332V12.9998C16.25 12.4015 16.735 11.9165 17.3333 11.9165Z" fill="#35383F" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <circle cx="5" cy="5" r="5" fill="#27BDBE" />
                                        </svg>
                                    </div> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.05134 7.58349L10.702 2.93286C11.9712 1.66366 14.029 1.66365 15.2982 2.93286L19.9488 7.58349H22.5843C23.2436 7.58349 23.75 8.1674 23.6567 8.82003L22.0653 19.9598C21.8366 21.5609 20.4654 22.7502 18.848 22.7502H7.1521C5.53473 22.7502 4.16349 21.5609 3.93476 19.9598L2.34337 8.82003C2.25013 8.16739 2.75655 7.58349 3.41581 7.58349H6.05134ZM12.234 4.46493C12.6571 4.04186 13.343 4.04186 13.7661 4.46492L16.8847 7.58349L9.11547 7.58349L12.234 4.46493ZM4.66491 9.75016L6.07965 19.6534C6.15589 20.1871 6.61297 20.5835 7.1521 20.5835H18.848C19.3871 20.5835 19.8442 20.1871 19.9205 19.6534L21.3352 9.75016H4.66491Z" fill="#35383F" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.66671 11.9165C9.26502 11.9165 9.75004 12.4015 9.75004 12.9998V17.3332C9.75004 17.9315 9.26502 18.4165 8.66671 18.4165C8.0684 18.4165 7.58337 17.9315 7.58337 17.3332V12.9998C7.58337 12.4015 8.0684 11.9165 8.66671 11.9165Z" fill="#35383F" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11.9165C13.5983 11.9165 14.0833 12.4015 14.0833 12.9998V17.3332C14.0833 17.9315 13.5983 18.4165 13 18.4165C12.4017 18.4165 11.9166 17.9315 11.9166 17.3332V12.9998C11.9166 12.4015 12.4017 11.9165 13 11.9165Z" fill="#35383F" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3333 11.9165C17.9316 11.9165 18.4167 12.4015 18.4167 12.9998V17.3332C18.4167 17.9315 17.9316 18.4165 17.3333 18.4165C16.735 18.4165 16.25 17.9315 16.25 17.3332V12.9998C16.25 12.4015 16.735 11.9165 17.3333 11.9165Z" fill="#35383F" />
                                    </svg>
                                }
                            </Link>
                        </div>
                        <div className={styles.item}>
                            {isLoggedIn == true ?
                                <Link href={"/panel"}>
                                    <div className="flex items-center gap-1 flex-col">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10ZM12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#35383F" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 16C6.79086 16 5 17.7909 5 20V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V20C3 16.6863 5.68629 14 9 14H15C18.3137 14 21 16.6863 21 20V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V20C19 17.7909 17.2091 16 15 16H9Z" fill="#35383F" />
                                        </svg>
                                        <p className="text-xs text-[#27BDBE] text-center">{personalInformation?.first_name}</p>
                                    </div>
                                </Link>
                                :
                                <Link href={"/login"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10ZM12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#35383F" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 16C6.79086 16 5 17.7909 5 20V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V20C3 16.6863 5.68629 14 9 14H15C18.3137 14 21 16.6863 21 20V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V20C19 17.7909 17.2091 16 15 16H9Z" fill="#35383F" />
                                    </svg>
                                </Link>
                            }

                        </div>

                    </div>
                    {isNavOpen && (
                        <div className={styles.mobileNavBackdrop + " py-2 flex items-start justify-start"} onClick={toggleNav}>
                            <div className={styles.mobileNav + " w-full flex flex-col gap-3"}>
                                <div className={styles.mobileNavHeader}>
                                    <div className={styles.closeIcon + " flex justify-end ml-auto"} onClick={toggleNav}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                            <path d="M21 7L7 21" stroke="#25282B" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7 7L21 21" stroke="#25282B" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.mobileNavFooter}>
                                    <div className={styles.item + " p-4 flex flex-col items-start justify-between gap-3 mb-2"}>
                                        <Link href={"/search"} className="flex gap-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1656 9.35919C16.1656 12.6485 13.4991 15.315 10.2098 15.315C6.92044 15.315 4.25392 12.6485 4.25392 9.35919C4.25392 6.06986 6.92044 3.40333 10.2098 3.40333C13.4991 3.40333 16.1656 6.06986 16.1656 9.35919ZM16.1928 14.1389C17.2407 12.8289 17.8673 11.1672 17.8673 9.35919C17.8673 5.13005 14.4389 1.70166 10.2098 1.70166C5.98064 1.70166 2.55225 5.13005 2.55225 9.35919C2.55225 13.5883 5.98064 17.0167 10.2098 17.0167C12.0178 17.0167 13.6795 16.3901 14.9895 15.3422L17.2657 17.6183C17.5979 17.9506 18.1367 17.9506 18.4689 17.6183C18.8012 17.2861 18.8012 16.7474 18.4689 16.4151L16.1928 14.1389Z" fill="black" />
                                            </svg>
                                            <p>SEARCH</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center" href={"/shop"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19461 1.68912C7.18384 1.68891 7.17309 1.68891 7.16238 1.68912H5.53416C4.48916 1.68912 3.55134 2.33065 3.17259 3.30459L1.66245 7.1878C1.29556 8.13124 1.69865 9.1659 2.53389 9.63881V16.0477C2.53389 17.4471 3.66834 18.5815 5.06776 18.5815H15.2032C16.6026 18.5815 17.7371 17.4471 17.7371 16.0477V9.63881C18.5723 9.16591 18.9754 8.13124 18.6085 7.1878L17.0984 3.30459C16.7196 2.33065 15.7818 1.68912 14.7368 1.68912H13.1086C13.0979 1.68891 13.0872 1.68891 13.0764 1.68912H7.19461ZM16.0478 9.91441C15.669 9.87003 15.2977 9.76026 14.9512 9.58699L14.359 9.2909L14.3581 9.29091L13.8155 9.50796C12.8086 9.9107 11.6855 9.9107 10.6786 9.50796L10.1355 9.29071L9.59236 9.50796C8.58552 9.9107 7.46235 9.9107 6.45551 9.50796L5.91287 9.29091L5.91199 9.2909L5.31982 9.58699C4.97328 9.76026 4.60198 9.87003 4.22313 9.91441V16.0477C4.22313 16.5141 4.60128 16.8923 5.06776 16.8923H6.757V14.3584C6.757 12.959 7.89145 11.8246 9.29086 11.8246H10.9801C12.3795 11.8246 13.514 12.959 13.514 14.3584V16.8923H15.2032C15.6697 16.8923 16.0478 16.5141 16.0478 16.0477V9.91441ZM15.114 7.77981C15.1013 7.77344 15.0885 7.76723 15.0756 7.7612L14.1365 3.37836H14.7368C15.0851 3.37836 15.3978 3.5922 15.524 3.91685L17.0341 7.80006C17.0995 7.96812 17.0026 8.15541 16.8277 8.19915C16.4513 8.29324 16.0536 8.24959 15.7066 8.07609L15.114 7.77981ZM13.3706 7.86653L12.4089 3.37836H10.9801V7.80919L11.306 7.93954C11.9101 8.18118 12.584 8.18118 13.1881 7.93954L13.3706 7.86653ZM9.29086 3.37836H7.86214L6.90038 7.86654L7.08288 7.93954C7.68698 8.18118 8.36089 8.18118 8.96499 7.93954L9.29086 7.80919V3.37836ZM5.19537 7.76119L6.13455 3.37836H5.53416C5.18583 3.37836 4.87322 3.5922 4.74697 3.91685L3.23683 7.80006C3.17148 7.96812 3.26838 8.15541 3.44332 8.19915C3.81971 8.29324 4.21735 8.24959 4.56437 8.07609L5.15693 7.77981C5.16968 7.77343 5.1825 7.76722 5.19537 7.76119ZM11.8247 14.3584V16.8923H8.44624V14.3584C8.44624 13.892 8.82439 13.5138 9.29086 13.5138H10.9801C11.4466 13.5138 11.8247 13.892 11.8247 14.3584Z" fill="#262626" />
                                            </svg>
                                            <p className="text-[#5F5F5F]">
                                                SHOP
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center" href={"/cart"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.68292 5.86908L8.28211 2.26989C9.26436 1.28764 10.8569 1.28764 11.8392 2.26989L15.4383 5.86908H17.478C17.9882 5.86908 18.3801 6.32097 18.308 6.82605L17.0764 15.4473C16.8994 16.6864 15.8381 17.6068 14.5864 17.6068H5.53481C4.28311 17.6068 3.22189 16.6864 3.04487 15.4472L1.81327 6.82605C1.74112 6.32097 2.13304 5.86908 2.64325 5.86908H4.68292ZM9.46779 3.45558C9.79521 3.12816 10.3261 3.12816 10.6535 3.45558L13.067 5.86908L7.05429 5.86908L9.46779 3.45558ZM3.60994 7.54589L4.70483 15.2101C4.76384 15.6232 5.11758 15.9299 5.53481 15.9299H14.5864C15.0037 15.9299 15.3574 15.6232 15.4164 15.2101L16.5113 7.54589H3.60994Z" fill="black" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.70755 9.22217C7.17059 9.22217 7.54595 9.59754 7.54595 10.0606V13.4142C7.54595 13.8772 7.17059 14.2526 6.70755 14.2526C6.24451 14.2526 5.86914 13.8772 5.86914 13.4142V10.0606C5.86914 9.59754 6.24451 9.22217 6.70755 9.22217Z" fill="black" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0606 9.22217C10.5236 9.22217 10.899 9.59754 10.899 10.0606V13.4142C10.899 13.8772 10.5236 14.2526 10.0606 14.2526C9.59753 14.2526 9.22217 13.8772 9.22217 13.4142V10.0606C9.22217 9.59754 9.59753 9.22217 10.0606 9.22217Z" fill="black" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4146 9.22217C13.8776 9.22217 14.253 9.59754 14.253 10.0606V13.4142C14.253 13.8772 13.8776 14.2526 13.4146 14.2526C12.9515 14.2526 12.5762 13.8772 12.5762 13.4142V10.0606C12.5762 9.59754 12.9515 9.22217 13.4146 9.22217Z" fill="black" />
                                            </svg>
                                            <p className="text-[#5F5F5F]">
                                                BAG
                                            </p>
                                        </Link>
                                    </div>
                                    <div className={styles.item + " p-4 flex flex-col items-start gap-5"}>
                                        <Link className="flex gap-2 items-center" href={"/"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.42387 16.3784C3.19038 16.3784 2.19043 15.3784 2.19043 14.1449V8.4393C2.19043 7.80615 2.45916 7.20275 2.92978 6.7792L8.14115 2.08896C8.99054 1.32451 10.28 1.32451 11.1293 2.08896L16.3407 6.7792C16.8113 7.20275 17.0801 7.80615 17.0801 8.4393V14.1449C17.0801 15.3784 16.0801 16.3784 14.8466 16.3784H4.42387ZM15.5911 8.4393V14.1449C15.5911 14.5561 15.2578 14.8894 14.8466 14.8894H12.6132V11.167C12.6132 9.93352 11.6132 8.93358 10.3797 8.93358H8.89076C7.65727 8.93358 6.65732 9.93352 6.65732 11.167V14.8894H4.42387C4.01271 14.8894 3.67939 14.5561 3.67939 14.1449V8.4393C3.67939 8.22825 3.76897 8.02712 3.92584 7.88594L9.13721 3.1957C9.42034 2.94088 9.85015 2.94088 10.1333 3.1957L15.3447 7.88594C15.5015 8.02712 15.5911 8.22825 15.5911 8.4393ZM8.14628 14.8894V11.167C8.14628 10.7559 8.4796 10.4225 8.89076 10.4225H10.3797C10.7909 10.4225 11.1242 10.7559 11.1242 11.167V14.8894H8.14628Z" fill="#262626" />
                                            </svg>
                                            <p className="text-[#5F5F5F]">
                                                HOME
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center" href={"/about"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9117 17.0167C14.6709 17.0167 17.7184 13.9693 17.7184 10.21C17.7184 6.45079 14.6709 3.40333 10.9117 3.40333C7.15245 3.40333 4.10499 6.45079 4.10499 10.21C4.10499 13.9693 7.15245 17.0167 10.9117 17.0167ZM10.9117 18.7184C15.6107 18.7184 19.42 14.9091 19.42 10.21C19.42 5.51098 15.6107 1.70166 10.9117 1.70166C6.21264 1.70166 2.40332 5.51098 2.40332 10.21C2.40332 14.9091 6.21264 18.7184 10.9117 18.7184Z" fill="#262626" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9119 8.5083C11.3818 8.5083 11.7627 8.88923 11.7627 9.35914V13.6141C11.7627 14.084 11.3818 14.4649 10.9119 14.4649C10.442 14.4649 10.061 14.084 10.061 13.6141V9.35914C10.061 8.88923 10.442 8.5083 10.9119 8.5083Z" fill="#262626" />
                                                <ellipse cx="10.9119" cy="6.80689" rx="0.850836" ry="0.850836" fill="#262626" />
                                            </svg>
                                            <p className="text-[#5F5F5F]">
                                                ABOUT
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center" href={"/contact"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                <path d="M9.40615 3.125C10.0166 3.2441 10.5776 3.54266 11.0174 3.98246C11.4572 4.42226 11.7558 4.98329 11.8749 5.59375M9.40615 0.625C10.6744 0.765898 11.8571 1.33386 12.76 2.23563C13.663 3.1374 14.2324 4.31938 14.3749 5.5875M13.7499 10.575V12.45C13.7506 12.6241 13.7149 12.7964 13.6452 12.9558C13.5755 13.1153 13.4732 13.2585 13.3449 13.3762C13.2167 13.4938 13.0653 13.5834 12.9004 13.6392C12.7355 13.695 12.5608 13.7157 12.3874 13.7C10.4642 13.491 8.61677 12.8338 6.99365 11.7813C5.48354 10.8217 4.20323 9.54136 3.24365 8.03125C2.18738 6.40075 1.53005 4.54437 1.3249 2.6125C1.30928 2.43967 1.32982 2.26548 1.38521 2.10102C1.4406 1.93656 1.52963 1.78543 1.64663 1.65726C1.76362 1.5291 1.90603 1.42669 2.06477 1.35658C2.22351 1.28646 2.39511 1.25016 2.56865 1.25H4.44365C4.74696 1.24701 5.04102 1.35442 5.271 1.55221C5.50098 1.74999 5.6512 2.02465 5.69365 2.325C5.77279 2.92504 5.91955 3.5142 6.13115 4.08125C6.21524 4.30495 6.23344 4.54807 6.18359 4.7818C6.13374 5.01553 6.01794 5.23007 5.8499 5.4L5.05615 6.19375C5.94587 7.75847 7.24143 9.05403 8.80615 9.94375L9.5999 9.15C9.76983 8.98196 9.98437 8.86616 10.2181 8.81631C10.4518 8.76646 10.6949 8.78466 10.9186 8.86875C11.4857 9.08034 12.0749 9.22711 12.6749 9.30625C12.9785 9.34908 13.2558 9.502 13.454 9.73593C13.6522 9.96986 13.7575 10.2685 13.7499 10.575Z" stroke="#25282B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <p className="text-[#5F5F5F]">
                                                CONTACT
                                            </p>
                                        </Link>
                                        {isLoggedIn === true ?
                                            <Link className="flex gap-2 items-center" href={"/panel"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2102 8.50835C11.6199 8.50835 12.7627 7.36555 12.7627 5.95584C12.7627 4.54613 11.6199 3.40333 10.2102 3.40333C8.80052 3.40333 7.65773 4.54613 7.65773 5.95584C7.65773 7.36555 8.80052 8.50835 10.2102 8.50835ZM10.2102 10.21C12.5598 10.21 14.4644 8.30536 14.4644 5.95584C14.4644 3.60632 12.5598 1.70166 10.2102 1.70166C7.86072 1.70166 5.95605 3.60632 5.95605 5.95584C5.95605 8.30536 7.86072 10.21 10.2102 10.21Z" fill="black" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.65775 13.6133C5.77814 13.6133 4.25441 15.137 4.25441 17.0166V17.8675C4.25441 18.3374 3.87347 18.7183 3.40357 18.7183C2.93367 18.7183 2.55273 18.3374 2.55273 17.8675V17.0166C2.55273 14.1972 4.83833 11.9116 7.65775 11.9116H12.7628C15.5822 11.9116 17.8678 14.1972 17.8678 17.0166V17.8675C17.8678 18.3374 17.4869 18.7183 17.0169 18.7183C16.547 18.7183 16.1661 18.3374 16.1661 17.8675V17.0166C16.1661 15.137 14.6424 13.6133 12.7628 13.6133H7.65775Z" fill="black" />
                                                </svg>
                                                <p className="text-[#5F5F5F]">
                                                    PANEL
                                                </p>
                                            </Link> :
                                            <Link className="flex gap-2 items-center" href={"/login"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2102 8.50835C11.6199 8.50835 12.7627 7.36555 12.7627 5.95584C12.7627 4.54613 11.6199 3.40333 10.2102 3.40333C8.80052 3.40333 7.65773 4.54613 7.65773 5.95584C7.65773 7.36555 8.80052 8.50835 10.2102 8.50835ZM10.2102 10.21C12.5598 10.21 14.4644 8.30536 14.4644 5.95584C14.4644 3.60632 12.5598 1.70166 10.2102 1.70166C7.86072 1.70166 5.95605 3.60632 5.95605 5.95584C5.95605 8.30536 7.86072 10.21 10.2102 10.21Z" fill="black" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.65775 13.6133C5.77814 13.6133 4.25441 15.137 4.25441 17.0166V17.8675C4.25441 18.3374 3.87347 18.7183 3.40357 18.7183C2.93367 18.7183 2.55273 18.3374 2.55273 17.8675V17.0166C2.55273 14.1972 4.83833 11.9116 7.65775 11.9116H12.7628C15.5822 11.9116 17.8678 14.1972 17.8678 17.0166V17.8675C17.8678 18.3374 17.4869 18.7183 17.0169 18.7183C16.547 18.7183 16.1661 18.3374 16.1661 17.8675V17.0166C16.1661 15.137 14.6424 13.6133 12.7628 13.6133H7.65775Z" fill="black" />
                                                </svg>
                                                <p className="text-[#5F5F5F]">
                                                    PANEL
                                                </p>
                                            </Link>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="py-2 border-b border-b-[#C5C5C5] max-md:py-3">
                <div className="container max-w-7xl mx-auto w-11/12">
                    <div className="flex items-start gap-5">
                        {categories?.map((item, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{zIndex: "200"}}
                            >
                                <Link
                                    className="text-sm max-md:text-[10px] hover:text-[#27BDBE] duration-300"
                                    href={"/category/" + item?.slug}
                                    style={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }} // Ensure single line and auto-expand width
                                >
                                    {item?.category_title}
                                </Link>

                                {hoveredIndex === index && item?.subcategories?.length > 0 && (
                                    <div
                                        className="max-md:hidden absolute top-[24px] left-0 bg-[#eeeeee] p-5"
                                        style={{ zIndex: 10, minWidth: '100%' }}
                                    >

                                        <div  className="flex flex-col gap-2">
                                            {item?.subcategories?.map((subItem, subIndex) => (
                                                <div className="flex items-center justify-end flex-row-reverse py-1 mr-auto w-full justify-start mr-auto">
                                                    <Link
                                                        key={subIndex}
                                                        className="text-sm text-left text-black hover:text-[#27BDBE]"
                                                        href={"/category/" + item?.slug + "/" + subItem?.slug}
                                                        style={{ whiteSpace: 'nowrap' }}
                                                    >
                                                        {subItem?.subcategory_title}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Header;