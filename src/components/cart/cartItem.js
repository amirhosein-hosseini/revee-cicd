import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { domain } from "../../api/domain";

const CartItem = ({image , off_price , quantity , price , title , color , size , id , myId , maxQuantity , reload , setReload }) => {

    const [mQuantity , setMQuantity] = useState(quantity);

    const deleteProductFromCart = (productId) => {
        // Retrieve the current cart from local storage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        // Filter out the product to be deleted
        const updatedCart = existingCart.filter(item => item.myId !== productId);
    
        // Update the local storage with the updated cart
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    
        // Optionally, update the state to trigger a re-render of the cart component
        // setCart(updatedCart);
        window.location.reload();
    };

    const handleDeleteClick = (productId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteProductFromCart(productId);
            setReload(reload + 1)
        }
    };

    // handle increase quantity
    const increaseQuantity = () => {
        if (mQuantity < maxQuantity){
            setMQuantity(prevQuantity => prevQuantity + 1);
            setReload(reload + 1)
        }
    };

    // handle decrease quantity 
    const decreaseQuantity = () => {
        if (mQuantity > 1) {
            setMQuantity(prevQuantity => prevQuantity - 1);
            setReload(reload + 1)
        }
    };

    useEffect(() => {
        // Update the quantity in localStorage when mQuantity changes
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = existingCart.map(item => {
            if (item.myId === myId) {
                return { ...item, quantity: mQuantity };
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }, [mQuantity, myId]);



    
    return(
        <div className={styles.cartitem + " flex max-md:flex-col justify-between gap-4 border-b border-b-[#808080] py-4"}>
            <div className={styles.image + " max-md:w-full w-1/6 overflow-hidden"}>
                <img className="object-cover w-full" src={image} alt="image" />
            </div>
            <div className={styles.info + " w-3/6 flex flex-col gap-2"}>
                <div className={styles.title}>
                    <p className="text-sm max-md:text-sm font-bold text-left text-[#303030]">
                        {title}
                    </p>
                </div>
                <div className="flex gap-5">
                    <div className={styles.size + " flex gap-1 mt-2"}>
                        <p className={styles.title + " text-sm"}>Size: </p>
                        <div className={styles.items + " flex items-center gap-1"}>
                            <p className={styles.item + " font-bold text-sm"}>
                                {size}
                            </p>
                        </div>
                    </div>
                    <div className={styles.color + " flex gap-1 mt-2"}>
                        <p className={styles.title + " text-sm"}>Color</p>
                        <p className="font-bold text-sm">{color?.color}</p>
                    </div>
                </div>

                <div className={styles.trash + " mt-2 cursor-pointer"} onClick={() => handleDeleteClick(myId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M15.122 3.92066C13.9801 3.80718 12.8381 3.72206 11.689 3.65822V3.65113L11.533 2.72904C11.4266 2.07649 11.2705 1.09766 9.61079 1.09766H7.75243C6.09976 1.09766 5.94372 2.03393 5.83023 2.72195L5.68128 3.62985C5.02163 3.67241 4.36198 3.71497 3.70234 3.7788L2.25537 3.92066C1.95746 3.94904 1.74467 4.21148 1.77304 4.50229C1.80142 4.7931 2.05676 5.00589 2.35467 4.97752L3.80164 4.83566C7.51836 4.46682 11.2635 4.60868 15.0227 4.98461C15.044 4.98461 15.0582 4.98461 15.0795 4.98461C15.349 4.98461 15.5831 4.77891 15.6115 4.50229C15.6327 4.21148 15.4199 3.94904 15.122 3.92066Z" fill="#292D32"/>
                        <path d="M13.8164 5.98463C13.6462 5.80731 13.4121 5.70801 13.171 5.70801H4.20544C3.96427 5.70801 3.72311 5.80731 3.55997 5.98463C3.39684 6.16196 3.30463 6.40312 3.31881 6.65137L3.75858 13.9288C3.8366 15.0069 3.9359 16.3546 6.41135 16.3546H10.965C13.4405 16.3546 13.5398 15.014 13.6178 13.9288L14.0576 6.65847C14.0718 6.40312 13.9796 6.16196 13.8164 5.98463ZM9.86564 12.801H7.50367C7.21286 12.801 6.9717 12.5598 6.9717 12.269C6.9717 11.9782 7.21286 11.737 7.50367 11.737H9.86564C10.1564 11.737 10.3976 11.9782 10.3976 12.269C10.3976 12.5598 10.1564 12.801 9.86564 12.801ZM10.4614 9.9638H6.91495C6.62414 9.9638 6.38298 9.72264 6.38298 9.43182C6.38298 9.14101 6.62414 8.89985 6.91495 8.89985H10.4614C10.7523 8.89985 10.9934 9.14101 10.9934 9.43182C10.9934 9.72264 10.7523 9.9638 10.4614 9.9638Z" fill="#292D32"/>
                    </svg>
                </div>
            </div>
            <div className="w-2/6 mx-auto text-center">
                <div className="inline-flex mx-auto items-center border border[#888] rounded-lg">
                    <div className={styles.prev + " px-1 cursor-pointer"} onClick={decreaseQuantity}>
                        <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 9 9" fill="#000000">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 4.5C1.875 4.29289 2.04289 4.125 2.25 4.125H6.75C6.95711 4.125 7.125 4.29289 7.125 4.5C7.125 4.70711 6.95711 4.875 6.75 4.875H2.25C2.04289 4.875 1.875 4.70711 1.875 4.5Z" fill="white"/>
                        </svg>
                    </div>
                    <div className={styles.number + " border-r border-l px-2"}>{mQuantity}</div>
                    <div className={styles.next + " px-1 cursor-pointer"} onClick={increaseQuantity}>
                        <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 9 9" fill="none">
                            <path d="M4.875 1.875C4.875 1.66789 4.70711 1.5 4.5 1.5C4.29289 1.5 4.125 1.66789 4.125 1.875V4.125H1.875C1.66789 4.125 1.5 4.29289 1.5 4.5C1.5 4.70711 1.66789 4.875 1.875 4.875H4.125V7.125C4.125 7.33211 4.29289 7.5 4.5 7.5C4.70711 7.5 4.875 7.33211 4.875 7.125V4.875H7.125C7.33211 4.875 7.5 4.70711 7.5 4.5C7.5 4.29289 7.33211 4.125 7.125 4.125H4.875V1.875Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-2/6 text-center">
                {off_price === price ?
                    <div className={styles.price + " flex gap-2 items-center text-right justify-end"}>
                        <p className={styles.realprice + " font-normal text-sm max-md:text-xs text-right"}>{price * mQuantity} AED</p>
                    </div> :
                    <div className={styles.price + " flex gap-2 items-center text-right justify-end"}>
                        <p className={styles.realprice + " font-normal text-sm max-md:text-xs text-right line-through"}>{price * mQuantity} AED</p>
                        <p className={styles.realprice + " font-normal text-sm max-md:text-xs text-right"}>{off_price * mQuantity} AED</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default CartItem;
