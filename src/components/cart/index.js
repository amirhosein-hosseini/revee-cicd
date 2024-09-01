import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CartItem from "./cartItem";
import Banner from "../banner";
import Faq from "../faq";
import Subscribe from "../index/subscribe";
import ShopItem from "../shop/shopItem";
import RecommendItem from "../shop/recomendItem";
import { getPopularProducts } from "../../api/shop";
import { getCartProducts } from "../../api/cart";
import { domain } from "../../api/domain";
import axios from "axios";
import { BluePrimaryButton, SecondPrimaryButton } from "../button";
import { useAuth } from "../../context/authContext";
import { getAllAdresses } from "../../api/user";
import Link from "next/link";

const CartPage = () => {


    const {isLoggedIn} = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const [addresses , setAddresses] = useState(null);
    const [showPromo , setShowPromo] = useState(false);
    const [reload , setReload] = useState(1);



    // get all user addresses
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllAdresses();
            setAddresses(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);



    // Function to retrieve cart items from local storage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        let totalPrice = storedCart.reduce((acc, currentItem) => {
            return acc + currentItem.quantity * currentItem.price;
        }, 0);
        setTotalPrice(totalPrice);

    }, [reload]);


    let cartnumber = 0
    cartItems?.map((item) => {
        cartnumber = cartnumber + item?.quantity;
    })


    


    return(
        <div className={styles.cart + " mt-20 max-md:mt-10"}>
            <div className={styles.wrapper + " w-11/12 container max-w-5xl mx-auto mb-20 max-md:mb-10 flex-col gap-10"}>
                <div className={styles.vector + " mb-20 max-md:mb-10"}>
                    {cartItems?.length >= 1 ? 
                        <p className="font-bold text-2xl max-md:text-lg text-center">
                            SHOPPING CART
                        </p> : 
                        <div className="flex items-center justify-center flex-col h-full my-20">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                                    <g opacity="0.3">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.2748 29.1667L41.1619 11.2796C46.0434 6.39809 53.958 6.39808 58.8395 11.2796L76.7266 29.1667H86.8631C89.3987 29.1667 91.3465 31.4125 90.9879 33.9226L84.8671 76.7678C83.9874 82.9259 78.7134 87.5 72.4928 87.5H27.5085C21.2878 87.5 16.0138 82.9259 15.1341 76.7678L9.01336 33.9226C8.65477 31.4125 10.6025 29.1667 13.1382 29.1667H23.2748ZM47.0544 17.1722C48.6816 15.545 51.3198 15.545 52.947 17.1722L64.9415 29.1667L35.0599 29.1667L47.0544 17.1722ZM17.9424 37.5L23.3837 75.5893C23.6769 77.642 25.4349 79.1667 27.5085 79.1667H72.4928C74.5663 79.1667 76.3243 77.642 76.6175 75.5893L82.0589 37.5H17.9424Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M33.3327 45.8333C35.6339 45.8333 37.4993 47.6988 37.4993 50V66.6667C37.4993 68.9678 35.6339 70.8333 33.3327 70.8333C31.0315 70.8333 29.166 68.9678 29.166 66.6667V50C29.166 47.6988 31.0315 45.8333 33.3327 45.8333Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M50.0007 45.8333C52.3018 45.8333 54.1673 47.6988 54.1673 50V66.6667C54.1673 68.9678 52.3018 70.8333 50.0007 70.8333C47.6995 70.8333 45.834 68.9678 45.834 66.6667V50C45.834 47.6988 47.6995 45.8333 50.0007 45.8333Z" fill="black" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M66.6667 45.8333C68.9679 45.8333 70.8333 47.6988 70.8333 50V66.6667C70.8333 68.9678 68.9679 70.8333 66.6667 70.8333C64.3655 70.8333 62.5 68.9678 62.5 66.6667V50C62.5 47.6988 64.3655 45.8333 66.6667 45.8333Z" fill="black" />
                                    </g>
                                </svg>
                            </div>
                            <div className="mt-3">
                                <p>
                                    Your Bag is Empty
                                </p>
                            </div>
                            <div className="mt-10">
                                <Link href={"/shop"} className="bg-[#27BDBE] text-white py-2 px-6">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.cart__container + " flex max-md:flex-col gap-2"}>
                    <div className={styles.items + " w-2/3 max-md:w-full pr-4 flex flex-col gap-6 border-r border-r-[#808080] max-md:border-r-0"}>
                        {cartItems?.length >= 1 ? 
                            <div className={styles.navbar + " flex border-b max-md:hidden border-b-[#808080] pb-3"}>
                                <div className={styles.item + " w-3/6 flex"}>
                                    <p className="text-center text-xs ml-10">
                                        Item
                                    </p>
                                </div>
                                <div className={styles.item + " w-1/6"}>
                                    <p className="text-center text-xs">
                                        Quantity
                                    </p>
                                </div>
                                <div className={styles.item + " w-2/6"}>
                                    <p className="text-center text-xs">
                                        Price
                                    </p>
                                </div>
                            </div> : ""
                        }
                        {cartItems?.map((item) => (
                            <CartItem reload={reload} setReload={setReload} color={item?.color} image={item?.image} price={item?.price} quantity={item?.quantity} size={item?.size} title={item?.title} id={item?.id} myId={item?.myId} maxQuantity={item?.maxQuantity} off_price={item?.off_price} />
                        ))}
                    </div>
                    {cartItems?.length >= 1  ? 
                        <div className={styles.total + " w-1/3 max-md:w-full p-2 flex flex-col gap-4"}>
                            <div className={styles.title + " mb-3 flex items-center justify-center gap-1"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M4.95841 1.4165H4.25008C2.12508 1.4165 1.41675 2.68442 1.41675 4.24984V4.95817V14.8748C1.41675 15.4628 2.08258 15.7957 2.55008 15.4415L3.76133 14.5348C4.04466 14.3223 4.44133 14.3507 4.69633 14.6057L5.87216 15.7886C6.14841 16.0648 6.60175 16.0648 6.878 15.7886L8.068 14.5986C8.31591 14.3507 8.71258 14.3223 8.98883 14.5348L10.2001 15.4415C10.6676 15.7886 11.3334 15.4557 11.3334 14.8748V2.83317C11.3334 2.054 11.9709 1.4165 12.7501 1.4165H4.95841ZM4.22883 9.92359C3.83925 9.92359 3.5205 9.60484 3.5205 9.21525C3.5205 8.82567 3.83925 8.50692 4.22883 8.50692C4.61841 8.50692 4.93716 8.82567 4.93716 9.21525C4.93716 9.60484 4.61841 9.92359 4.22883 9.92359ZM4.22883 7.09025C3.83925 7.09025 3.5205 6.7715 3.5205 6.38192C3.5205 5.99234 3.83925 5.67359 4.22883 5.67359C4.61841 5.67359 4.93716 5.99234 4.93716 6.38192C4.93716 6.7715 4.61841 7.09025 4.22883 7.09025ZM8.50008 9.7465H6.37508C6.08466 9.7465 5.84383 9.50567 5.84383 9.21525C5.84383 8.92484 6.08466 8.684 6.37508 8.684H8.50008C8.7905 8.684 9.03133 8.92484 9.03133 9.21525C9.03133 9.50567 8.7905 9.7465 8.50008 9.7465ZM8.50008 6.91317H6.37508C6.08466 6.91317 5.84383 6.67234 5.84383 6.38192C5.84383 6.0915 6.08466 5.85067 6.37508 5.85067H8.50008C8.7905 5.85067 9.03133 6.0915 9.03133 6.38192C9.03133 6.67234 8.7905 6.91317 8.50008 6.91317Z" fill="#292D32"/>
                                    <path d="M12.757 1.4165V2.479C13.2245 2.479 13.6708 2.67025 13.9966 2.989C14.3366 3.33609 14.5208 3.78234 14.5208 4.24984V5.964C14.5208 6.48817 14.287 6.729 13.7558 6.729H12.3958V2.84025C12.3958 2.64192 12.5587 2.479 12.757 2.479V1.4165ZM12.757 1.4165C11.9708 1.4165 11.3333 2.054 11.3333 2.84025V7.7915H13.7558C14.8749 7.7915 15.5833 7.08317 15.5833 5.964V4.24984C15.5833 3.47067 15.2645 2.76234 14.7545 2.24525C14.2374 1.73525 13.5362 1.42359 12.757 1.4165C12.7641 1.4165 12.757 1.4165 12.757 1.4165Z" fill="#292D32"/>
                                </svg>
                                <p className="font-bold text-sm">
                                    ORDER SUMMARY
                                </p>
                            </div>
                            <div className={styles.desc + " flex flex-col gap-2 max-md:w-full"}>
                                {cartnumber == 1 ?
                                    <div className={styles.number + " flex items-center justify-between"}>
                                        <p>item</p>
                                        <p>{cartnumber}</p>
                                    </div> : 
                                    <div className={styles.number + " flex items-center justify-between"}>
                                        <p>items</p>
                                        <p>{cartnumber}</p>
                                    </div>
                                }

                                <div className={styles.shipping + " flex items-center justify-between"}>
                                    <p>Shipping</p>
                                    <p>free</p>
                                </div>
                                <div className={styles.totalprice + " p-2 flex items-center justify-between"}>
                                    <p>Total (VAT incl.)</p>
                                    <p>{totalPrice} AED</p>
                                </div>
                            </div>
                            <div className={styles.promocode + " w-1/2 mx-auto mt-3 flex flex-col gap-2"}>
                                {showPromo == true ? 
                                    <div>
                                        <p className={styles.title + " text-xs text-center text-black cursor-pointer mb-2"} onClick={() => setShowPromo(!showPromo)}>Have a Promo Code?</p>
                                        <input className="w-full rounded-lg border border-[#A1A1A1]" type="text" />
                                    </div> : 
                                    <p className={styles.title + " text-xs text-center text-[#868686] cursor-pointer"} onClick={() => setShowPromo(!showPromo)}>Have a Promo Code?</p>
                                }
                            </div>
                            <div className={styles.cart__button + " flex items-center justify-center"}>
                                {isLoggedIn && addresses?.length > 0 ?
                                    <Link href="/address-list"><BluePrimaryButton>PROCEED TO CHECKOUT</BluePrimaryButton></Link> :
                                    isLoggedIn && addresses?.length === 0 ?
                                        <Link href="/add-address"><BluePrimaryButton>PROCEED TO CHECKOUT</BluePrimaryButton></Link> :
                                        !isLoggedIn ?
                                            <Link href="/login?redirect=/address-list"><SecondPrimaryButton>PROCEED TO CHECKOUT</SecondPrimaryButton></Link>
                                            :
                                            ""}
                            </div>
                            <div className={styles.payments + " flex mt-2 gap-1 items-center mx-auto"}>
                                <div className={styles.item}>
                                    <img src="../../images/lvisa.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/linter.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/lmaster.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/lapple.png" alt="image" /> 
                                </div>
                                <div className={styles.item}>
                                    <img src="../../images/lblue.png" alt="image" /> 
                                </div>
                            </div>
                        </div> : ""
                    }
                </div>
            </div>
             

            {/* <FooterBanner />

            <div className="mt-20">
                <Faq />
            </div>

            <Subscribe /> */}
        </div>
    )
}

export default CartPage;