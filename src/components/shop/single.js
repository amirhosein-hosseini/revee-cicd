import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { BluePrimaryButton, DeBluePrimaryButton, OutlineBlueButton } from "../button";
import Faq from "../faq";
import ShopItem from "./shopItem";
import Subscribe from "../index/subscribe";
import MyImageGallery from "../gallery/imageGallery";
import RecommendItem from "./recomendItem";
import { getAllAvaibleSizes, getAllProductImages, getAllProducts, getColorOfEachSize, getPopularProducts, getPriceOfEachSizeAndColor, getShowSingleShop } from "../../api/shop";
import CartPopUp from "./cartPopUp";
import { domain, image_url } from "../../api/domain";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import ProductItem from "../index/productItem";
import CustomImageGallery from "../gallery/customImageGallery";
import useCart from "@/hooks/useCart";

const SingleShop = () => {

    const router = useRouter();
    const { handleAddToCart } = useCart();
    const [reload , setReload] = useState(1);
    const [singleData , setSingleData] = useState(null);
    const [activeSize , setActiveSize] = useState(null);
    const [colors , setColors] = useState(null);
    const [rItms , setRItems] = useState(null);
    const [activeColor , setActiveColor] = useState(null);
    const [mquantity , setmQuantity] = useState(0);
    const [myPrice , setMyPrice] = useState(null);
    const [price , setPrice] = useState(null);
    const [title , setTitle] = useState(null);
    const [image , setImage] = useState(null);
    const [productId , setProductId] = useState(null); 
    const [clickAddButton , setClickAddButton] = useState(false);
    const [descLevel , setDescLevel] = useState(null);
    const [showPopUp , setShowPopUp] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const propUpRef = useRef(null);
    const [productImages , setProductImages] = useState(null);
    const [maxQuantity , setMaxQuantity] = useState(null);
    const [sizes , setSizes] = useState(null);
    const [avaibleSizes , setAvaibleSizes] = useState(null);
    const [showSelectSize , setShowSelectSize] = useState(null);
    const [offPrice , setOffPrice] = useState(null);
    const [cartItem , setCartItem] = useState({
        image : "",
        price: "",
        title: "",
        quantity: "",
        size: "",
        color: "",
        id: "",
        myId: "",
        maxQuantity: "",
    });


    const handleReload = () => {
        setReload(reload + 1)
    }

    // get all single shop data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getShowSingleShop(router.query.slug);
            setSingleData(data.data);
            setImage(data?.data?.cover_image);
            setTitle(data?.data?.product);
            setProductId(data?.data?.id);
            setSizes(data?.data?.all_size);
            setColors(data?.data?.colors);
            setMyPrice({
                price : data?.data?.price,
                percent_discount : data?.data?.percent_discount,
                off_price : data?.data?.off_price
            })
            setActiveColor(data?.data?.colors[0])
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [router.query.slug]);




    // function for set active size 
    const handleActiveSize = (size) => {
        setActiveSize(size);
        setmQuantity(0)
    }

    // function for set active color
    const handleActiveColor = (color) => {
        setActiveColor(color);
        setmQuantity(0);
        setActiveSize(null);
    }


    // Update the size of the cartItem when activeSize changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            size: activeSize // Update the size to activeSize
        }));
    }, [activeSize]);


    // Update the color of the cartItem when activecolor changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            color: activeColor // Update the size to activeSize
        }));
    }, [activeColor]);


    // Update the quantity of the cartItem when quantity changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            quantity: mquantity // Update the size to activeSize
        }));
    }, [mquantity]);

    // Update the quantity of the cartItem when quantity changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            maxQuantity: maxQuantity // Update the size to activeSize
        }));
    }, [mquantity]);


    // Update the prcie of the cartItem when price changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            price: price // Update the size to activeSize
        }));
    }, [price]);


    // Update the offprice of the cartItem when price changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            off_price: offPrice // Update the size to activeSize
        }));
    }, [offPrice]);

    // Update the image of the cartItem when image changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            image: image // Update the size to activeSize
        }));
    }, [image]);

    // Update the title of the cartItem when title changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            title: title // Update the size to activeSize
        }));
    }, [title]);

    // Update the id of the cartItem when id changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            id: productId // Update the size to activeSize
        }));
    }, [productId]);

    // Update the myId of the cartItem when myId changes
    useEffect(() => {
        setCartItem(prevCartItem => ({
            ...prevCartItem,
            myId: cartItems.length // Update the size to activeSize
        }));
    }, [cartItems]);



    // handle increasequantity
    const increaseQuantity = () => {
        if (mquantity < maxQuantity){
            setmQuantity(prevQuantity => prevQuantity + 1);
        }
    }

    // handle decreasequantity 
    const decreaseQuantity = () => {
        if (mquantity > 0) {
            setmQuantity(prevQuantity => prevQuantity - 1);
        }
    }


    // get price of each size and color
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getPriceOfEachSizeAndColor(singleData?.product , activeColor.color , activeSize);
            setMyPrice(data.data);
            setOffPrice(data?.data?.off_price)
            setPrice(data?.data?.price);
            setMaxQuantity(data?.data?.quantity)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [activeSize , activeColor]);



   const handleSizeGuide = (id) => {
    setDescLevel("size")
    document.querySelector(`#${id}`).scrollIntoView()
   }




    // get all recommend items 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllProducts(1,5,`subcategory=${singleData?.subcategory[0]}`);
            setRItems(data.data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [singleData]);



    // get all product images 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllProductImages(singleData?.product , activeColor?.color);
            setProductImages(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [activeColor]);


    // get all sizes from colors 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllAvaibleSizes(singleData?.product , activeColor?.color);
            setAvaibleSizes(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [activeColor]);



    const addToCart = () => {
        // Retrieve the current cart from localStorage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        // Append the new item to the existing cart array
        const updatedCart = [...existingCart, cartItem];
        // Store the updated cart back in localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setClickAddButton(true);
        setShowPopUp(true)
    }


    // funcotion for handeling show popup
    useEffect(() => {
        if (showPopUp) {
            // Disable scrolling
            document.body.classList.add("noScroll");
        } else {
            // Enable scrolling
            document.body.classList.remove("noScroll");
        }
    }, [showPopUp]);


    // Function to retrieve cart items from local storage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        let totalPrice = storedCart.reduce((acc, currentItem) => {
            return acc + currentItem.quantity * currentItem.price;
        }, 0);
        setTotalPrice(totalPrice);

    }, [clickAddButton]);

    // Function to handle the click event outside of the popup
    const handleClickOutside = (event) => {
        if (propUpRef.current && !propUpRef.current.contains(event.target)) {
            setShowPopUp(false);
        }
    };

    // Add event listener when the component mounts
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            // Cleanup: remove event listener when the component unmounts
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    

    let cartnumber = 0
    cartItems?.map((item) => {
        cartnumber = cartnumber + item?.quantity;
    })


    const handleClickPopUp = () => {
        window.location.reload();
        setShowPopUp(false);
    }


    const handleDescLevel = (level) => {
        if(descLevel === level){
            setDescLevel(null)
        } else{
            setDescLevel(level)
        }
    }


    const handleScrollSize = () => {
        setDescLevel("size");
        const targetElement = document.getElementById('size');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return(
        <>
        <Head>
                {
                    singleData?.follow === true && singleData?.index === true ? <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                        singleData?.follow === true && singleData?.index === false ? <meta name="robots" content="follow, noindex" /> :
                            singleData?.follow === false && singleData?.index === true ? <meta name="robots" content="nofollow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                                singleData?.follow === false && singleData?.index === false ? <meta name="robots" content="nofollow, noindex" /> : ""
                }
                <link rel="canonical" href={singleData?.canonical === "" ? "https://healfit.ae" : singleData?.canonical} />


            <title>{singleData?.meta_title}</title>
            <meta name="description" content={singleData?.meta_description} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: singleData?.schema_markup }}
                />
        </Head>
            {singleData?.colors[0]?.color === "not color" ? 
                <div className={styles.singleshop}>
                    {showPopUp === true ?
                        <div onClick={() => setShowPopUp(false)}>
                            <CartPopUp id={"popup"} image={image} title={title} size={activeSize} color={activeColor?.color} quantity={mquantity} price={price} total={totalPrice} cartNumber={cartnumber} />
                        </div>
                        : ""
                    }





                    <div className={styles.singleshop__info + " mt-10 pb-10"}>
                        <div className="container max-w-7xl w-11/12 mx-auto flex items-center gap-1 mb-10">
                            <Link className="text-[12px] text-[#A4A4A4] hover:underline" href={"/"}>
                                Home
                            </Link>
                            <span className="text-[12px] text-[#A4A4A4]">
                                /
                            </span>
                            <Link className="text-[12px] text-[#A4A4A4] hover:underline" href={"/gender/" + singleData?.gender_data?.gender_slug}>
                                {singleData?.gender_data?.gender_name}
                            </Link>
                            <span className="text-[12px] text-[#A4A4A4]">
                                /
                            </span>
                            <p className="text-[12px]">
                                {singleData?.product}
                            </p>
                        </div>
                        <div className={styles.wrapper + " w-11/12 container max-w-7xl mx-auto items-start flex max-md:flex-col gap-5"}>
                            <div className={styles.gallery + " max-md:w-full w-7/12"}>
                                <MyImageGallery data={[{"image" : image}]} />     
                                <div className="mt-10">
                                    <div className="border-t border-t-[#C5C5C5] py-3">
                                        <div className="w-full flex items-center justify-between cursor-pointer" onClick={() => handleDescLevel("desc")}>
                                            <p className={styles.title + " font-bold text-sm max-md:text-sm"}>Product Description</p>
                                            {descLevel === "desc" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214788 5.78266C0.501173 6.07245 0.965494 6.07245 1.25188 5.78266L5.5 1.48409L9.74812 5.78266C10.0345 6.07245 10.4988 6.07245 10.7852 5.78266C11.0716 5.49288 11.0716 5.02304 10.7852 4.73326L6.53709 0.434679C5.96432 -0.144893 5.03568 -0.144891 4.46291 0.434679L0.214789 4.73325C-0.071596 5.02304 -0.071596 5.49287 0.214788 5.78266Z" fill="#262626" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7852 0.217339C10.4988 -0.0724465 10.0345 -0.0724465 9.74812 0.217339L5.5 4.51591L1.25188 0.217338C0.965494 -0.0724473 0.501172 -0.0724474 0.214788 0.217338C-0.0715971 0.507124 -0.0715972 0.97696 0.214788 1.26675L4.46291 5.56532C5.03568 6.14489 5.96432 6.14489 6.53709 5.56532L10.7852 1.26675C11.0716 0.976961 11.0716 0.507125 10.7852 0.217339Z" fill="#262626" />
                                                </svg>
                                            }
                                        </div>
                                        {descLevel === "desc" ?
                                            <div className={styles.container + " flex flex-col gap-4"}>
                                                <div className={styles.items + " flex flex-col gap-3"}>
                                                    <div className={styles.item + " flex flex-col gap-2"}>
                                                        <div className={styles.desc + " font-normal text-lg max-md:text-xs"} dangerouslySetInnerHTML={{ __html: singleData?.description }} />
                                                    </div>
                                                </div>
                                                <div className={styles.image + " max-w-xl overflow-hidden mx-auto"}>
                                                    <img className="object-cover w-full" src={image_url + singleData?.description_image} alt={singleData?.description_image_alt} />
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                    <div className="border-t border-t-[#C5C5C5] py-3" id="size">
                                        <div className="w-full flex items-center justify-between cursor-pointer" onClick={() => handleDescLevel("size")}>
                                            <p className={styles.title + " font-bold text-sm max-md:text-sm"}>Size guide</p>
                                            {descLevel === "size" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214788 5.78266C0.501173 6.07245 0.965494 6.07245 1.25188 5.78266L5.5 1.48409L9.74812 5.78266C10.0345 6.07245 10.4988 6.07245 10.7852 5.78266C11.0716 5.49288 11.0716 5.02304 10.7852 4.73326L6.53709 0.434679C5.96432 -0.144893 5.03568 -0.144891 4.46291 0.434679L0.214789 4.73325C-0.071596 5.02304 -0.071596 5.49287 0.214788 5.78266Z" fill="#262626" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7852 0.217339C10.4988 -0.0724465 10.0345 -0.0724465 9.74812 0.217339L5.5 4.51591L1.25188 0.217338C0.965494 -0.0724473 0.501172 -0.0724474 0.214788 0.217338C-0.0715971 0.507124 -0.0715972 0.97696 0.214788 1.26675L4.46291 5.56532C5.03568 6.14489 5.96432 6.14489 6.53709 5.56532L10.7852 1.26675C11.0716 0.976961 11.0716 0.507125 10.7852 0.217339Z" fill="#262626" />
                                                </svg>
                                            }
                                        </div>
                                        {descLevel === "size" ?
                                            <div className={styles.singleshop__size + " mt-10 w-11/12 container mx-auto flex flex-col gap-4"}>
                                                <div className={styles.header + " flex flex-col gap-5"}>
                                                    <div className={styles.item + " flex flex-col gap-1"}>
                                                        <div className={styles.desc + " font-normal text-lg max-md:text-xs"} dangerouslySetInnerHTML={{ __html: singleData?.size_guide }} />
                                                    </div>
                                                </div>
                                                <div className={styles.image + " w-3/4 mx-auto overflow-hidden"}>
                                                    <img className="object-cover w-full" src={image_url + singleData?.size_table_image} alt={singleData?.size_table_image_alt} />
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                    
                                    <div className="border-t border-t-[#C5C5C5] py-3">
                                        <div className="w-full flex items-center justify-between cursor-pointer" onClick={() => handleDescLevel("detail")}>
                                            <p className={styles.title + " font-bold text-sm max-md:text-sm"}>Product Details</p>
                                            {descLevel === "detail" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214788 5.78266C0.501173 6.07245 0.965494 6.07245 1.25188 5.78266L5.5 1.48409L9.74812 5.78266C10.0345 6.07245 10.4988 6.07245 10.7852 5.78266C11.0716 5.49288 11.0716 5.02304 10.7852 4.73326L6.53709 0.434679C5.96432 -0.144893 5.03568 -0.144891 4.46291 0.434679L0.214789 4.73325C-0.071596 5.02304 -0.071596 5.49287 0.214788 5.78266Z" fill="#262626" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7852 0.217339C10.4988 -0.0724465 10.0345 -0.0724465 9.74812 0.217339L5.5 4.51591L1.25188 0.217338C0.965494 -0.0724473 0.501172 -0.0724474 0.214788 0.217338C-0.0715971 0.507124 -0.0715972 0.97696 0.214788 1.26675L4.46291 5.56532C5.03568 6.14489 5.96432 6.14489 6.53709 5.56532L10.7852 1.26675C11.0716 0.976961 11.0716 0.507125 10.7852 0.217339Z" fill="#262626" />
                                                </svg>
                                            }
                                        </div>
                                        {descLevel === "detail" ?
                                            <div className={styles.singleshop__size + " mt-10 w-11/12 container mx-auto flex flex-col gap-4"}>
                                                <div className={styles.header + " flex flex-col gap-5"}>
                                                    <div className={styles.item + " flex flex-col gap-1"}>
                                                        <div className={styles.desc + " font-normal text-lg max-md:text-xs"} dangerouslySetInnerHTML={{ __html: singleData?.details }} />
                                                    </div>
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.info + " max-md:w-full w-5/12 flex flex-col gap-4"}>
                                <div className={styles.title}>
                                    <p className="text-[16px] max-md:text-sm text-left text-[#27BDBE]">
                                        {singleData?.product}
                                    </p>
                                </div>
                                <div className={styles.title + " mt-[-10px]"}>
                                    <h1 className="text-[40px] leading-[45px] max-md:text-2xl font-noraml text-left text-black">
                                        {singleData?.name_product}
                                    </h1>
                                </div>
                                <div className={styles.price + " flex gap-3 items-center mb-4 mt-[-5px]"}>
                                    {myPrice?.percent_discount === 0 || myPrice?.percent_discount === "0" || myPrice?.percent_discount === null || myPrice?.percent_discount === undefined ?
                                        <>
                                            <p className={styles.realprice + " text-[22px] font-normal max-md:text-xs"}>{myPrice?.off_price}.00 AED</p>
                                            <p className={styles.vat + " font-normal text-xs text-[#9B9B9B]"}>VAT included</p>

                                        </>
                                        :
                                        <>
                                            <p className={styles.previousprice + " font-noraml text-xs text-[#9B9B9B] line-through"}>{myPrice?.price}.00 AED</p>
                                            <p className={styles.realprice + " text-[22px] font-normal max-md:text-xs"}>{myPrice?.off_price}.00 AED</p>
                                            <p className={styles.vat + " font-normal text-xs text-[#9B9B9B]"}>VAT included</p>
                                            <p className={styles.saveper + " font-normal px-3 py-0 text-sm bg-[#27BDBE] text-black"}>{myPrice?.percent_discount}% SAVE</p>
                                        </>
                                    }
                                </div>
                                <div className={styles.desc + " flex flex-col gap-1"}>
                                    <p className={styles.title + " font-bold text-lg max-md:text-sm"}>
                                        Application Fields
                                    </p>
                                    <p className={styles.desc + " font-light text-sm max-md:text-xs"}>
                                        {singleData?.application_fields}
                                    </p>
                                </div>


                                <div className={styles.size + " flex flex-col gap-2"}>
                                    <div className="flex gap-6 items-center">
                                        <p className={styles.title + " font-bold text-[12px] max-md:text-sm"}>Size</p>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className={styles.items + " max-w-[285px] grid grid-cols-5 gap-1"}>
                                            {sizes?.map((sizeItem) => (
                                                <p
                                                    key={sizeItem.id}  // Use the id as the key
                                                    className={`${styles.item} ${avaibleSizes?.includes(sizeItem.size) ? 'cursor-pointer' : ''} text-sm font-bold px-2 py-[4px] text-center rounded-sm ${avaibleSizes?.includes(sizeItem.size) && sizeItem.size === activeSize
                                                        ? 'bg-black border-black text-white border'
                                                        : avaibleSizes?.includes(sizeItem.size) && sizeItem.size !== activeSize
                                                            ? 'border-[#A4A4A4] text-black border hover:bg-[#D9D9D9]'
                                                            : 'bg-[#D9D9D9] text-[#b8b8b8] border border-[#D9D9D9]'
                                                        }`}
                                                    onClick={avaibleSizes?.includes(sizeItem.size) ? () => handleActiveSize(sizeItem.size) : undefined}
                                                >
                                                    {sizeItem.size}
                                                </p>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-xs underline hover:text-[#27BDBE] duration-300 cursor-pointer" onClick={handleScrollSize}>
                                                Size Guide
                                            </p>
                                        </div>
                                    </div>
                                </div>



                                <div className={styles.quantity + " flex flex-col gap-2"}>
                                    <p className={styles.title + " font-bold text-[12px] max-md:text-sm"}>Quantity</p>
                                    <div className={styles.wrapper + " flex items-center mr-auto gap-3 flex-row-reverse"}>
                                        {activeSize === null && showSelectSize === true ?
                                            <p className="text-xs text-[#E83B3B]">
                                                please select size
                                            </p> : ""
                                        }
                                        <div className="inline-flex items-center border border[#888] h-[30px]">
                                            {activeSize ?
                                                <div className={styles.prev + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={decreaseQuantity}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="#000000">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 4.5C1.875 4.29289 2.04289 4.125 2.25 4.125H6.75C6.95711 4.125 7.125 4.29289 7.125 4.5C7.125 4.70711 6.95711 4.875 6.75 4.875H2.25C2.04289 4.875 1.875 4.70711 1.875 4.5Z" fill="white" />
                                                    </svg>
                                                </div> :
                                                <div className={styles.prev + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={() => setShowSelectSize(true)}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="#000000">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 4.5C1.875 4.29289 2.04289 4.125 2.25 4.125H6.75C6.95711 4.125 7.125 4.29289 7.125 4.5C7.125 4.70711 6.95711 4.875 6.75 4.875H2.25C2.04289 4.875 1.875 4.70711 1.875 4.5Z" fill="white" />
                                                    </svg>
                                                </div>
                                            }
                                            <div className={styles.number + " border-r border-l px-6"}>{mquantity}</div>
                                            {activeSize ?
                                                <div className={styles.next + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={increaseQuantity}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="none">
                                                        <path d="M4.875 1.875C4.875 1.66789 4.70711 1.5 4.5 1.5C4.29289 1.5 4.125 1.66789 4.125 1.875V4.125H1.875C1.66789 4.125 1.5 4.29289 1.5 4.5C1.5 4.70711 1.66789 4.875 1.875 4.875H4.125V7.125C4.125 7.33211 4.29289 7.5 4.5 7.5C4.70711 7.5 4.875 7.33211 4.875 7.125V4.875H7.125C7.33211 4.875 7.5 4.70711 7.5 4.5C7.5 4.29289 7.33211 4.125 7.125 4.125H4.875V1.875Z" fill="white" />
                                                    </svg>
                                                </div> :
                                                <div className={styles.next + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={() => setShowSelectSize(true)}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="none">
                                                        <path d="M4.875 1.875C4.875 1.66789 4.70711 1.5 4.5 1.5C4.29289 1.5 4.125 1.66789 4.125 1.875V4.125H1.875C1.66789 4.125 1.5 4.29289 1.5 4.5C1.5 4.70711 1.66789 4.875 1.875 4.875H4.125V7.125C4.125 7.33211 4.29289 7.5 4.5 7.5C4.70711 7.5 4.875 7.33211 4.875 7.125V4.875H7.125C7.33211 4.875 7.5 4.70711 7.5 4.5C7.5 4.29289 7.33211 4.125 7.125 4.125H4.875V1.875Z" fill="white" />
                                                    </svg>
                                                </div>
                                            }
                                        </div>
                                        {activeColor?.quantity == 1 ?
                                            <div className={styles.lowstock + " flex items-center gap-1"}>
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                    <g clip-path="url(#clip0_227_5703)">
                                                        <path d="M1.47861 4.00243C1.47861 2.54492 2.66016 1.36338 4.11767 1.36338C4.948 1.36338 5.67762 1.74719 6.15708 2.35078L5.60311 2.34916C5.42092 2.34863 5.27279 2.49589 5.27226 2.67807C5.27172 2.86026 5.41898 3.00839 5.60117 3.00892L6.73691 3.01225C6.74958 3.01302 6.76233 3.01307 6.77511 3.01236L6.9207 3.01279C7.00836 3.01304 7.09251 2.9784 7.15459 2.91651C7.21666 2.85462 7.25155 2.77056 7.25155 2.68291L7.25155 1.36338C7.25155 1.18119 7.10386 1.0335 6.92167 1.0335C6.73948 1.0335 6.59178 1.18119 6.59178 1.36338L6.59178 1.84153C5.99386 1.14578 5.1149 0.703613 4.11767 0.703613C2.29578 0.703613 0.818848 2.18055 0.818848 4.00243C0.818848 5.82432 2.29578 7.30126 4.11767 7.30126C5.41607 7.30126 6.51398 6.55168 7.05214 5.46877C7.13322 5.30562 7.06669 5.10763 6.90353 5.02655C6.74038 4.94547 6.54239 5.012 6.46131 5.17515C6.02784 6.04741 5.15069 6.64149 4.11767 6.64149C2.66016 6.64149 1.47861 5.45995 1.47861 4.00243Z" fill="#F04444" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11748 2.35303C4.29967 2.35303 4.44736 2.50072 4.44736 2.68291V3.8658L5.01051 4.42894C5.13933 4.55777 5.13933 4.76664 5.01051 4.89546C4.88168 5.02429 4.67281 5.02429 4.54398 4.89546L3.98084 4.33232C3.85711 4.20859 3.7876 4.04078 3.7876 3.8658V2.68291C3.7876 2.50072 3.93529 2.35303 4.11748 2.35303Z" fill="#F04444" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_227_5703">
                                                            <rect width="7.91717" height="7.91717" fill="white" transform="translate(0.15918 0.0439453)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <p className="text-xs text-[#E83B3B]">Low in stock: only 1 left.</p>
                                            </div> : ""
                                        }
                                    </div>
                                </div>

                                <div className={styles.buttons + " flex flex-col gap-2 mt-4 items-center justify-center"}>
                                    {clickAddButton === true ?
                                        <div className={styles.singleaddtobag} disable="true">
                                            {maxQuantity == 0 ?
                                                <div className={styles.singleaddtobag}>
                                                    <DeBluePrimaryButton>
                                                        Out Of Stock
                                                    </DeBluePrimaryButton>
                                                </div>
                                                : activeColor === null || activeColor === undefined || activeSize === null || activeSize === undefined || mquantity == 0 ?
                                                    <div className={styles.singleaddtobag}>
                                                        <DeBluePrimaryButton>
                                                            Add To Bag
                                                        </DeBluePrimaryButton>
                                                    </div>
                                                    :
                                                    <div className={styles.singleaddtobag} onClick={addToCart}>
                                                        <BluePrimaryButton>Add to bag</BluePrimaryButton>
                                                    </div>
                                            }
                                        </div>
                                        :
                                        <>
                                            {maxQuantity == 0 ?
                                                <div className={styles.singleaddtobag}>
                                                    <DeBluePrimaryButton>
                                                        Out Of Stock
                                                    </DeBluePrimaryButton>
                                                </div>
                                                : activeColor === null || activeColor === undefined || activeSize === null || activeSize === undefined || mquantity == 0 ?
                                                    <div className={styles.singleaddtobag}>
                                                        <DeBluePrimaryButton>
                                                            Add To Bag
                                                        </DeBluePrimaryButton>
                                                    </div>
                                                    :
                                                    <div className={styles.singleaddtobag} onClick={addToCart}>
                                                        <BluePrimaryButton>Add to bag</BluePrimaryButton>
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>







                    <div className="border-t border-t-[#C5C5C5] mt-5">
                        <div className="py-20 container max-w-7xl w-11/12 mx-auto text-lg">
                            <p>
                                Related Products
                            </p>
                            <div className={styles.wrapper + " grid grid-cols-5 max-md:gap-x-5 gap-x-3 mt-10 max-md:grid-cols-2 max-md:gap-y-5"}>
                                {rItms?.map((item) => (
                                    <ProductItem alt={item?.cover_image_alt} percentDiscount={item?.percent_discount} offPrice={item?.off_price} name={item?.name_product} title={item?.product} image={item?.cover_image} price={item?.price} slug={item?.slug} fav={item?.fav} id={item?.id} onReload={handleReload} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 mb-10">
                        <Faq />
                    </div>


                </div>





                :





                <div className={styles.singleshop}>
                {showPopUp === true? 
                    <div onClick={() => setShowPopUp(false)}>
                        <CartPopUp id={"popup"} image={image} title={title} size={activeSize} color={activeColor?.color} quantity={mquantity} price={price} total={totalPrice} cartNumber={cartnumber} />
                    </div>
                    : ""
                }
    

    
    
    
                <div className={styles.singleshop__info + " mt-10 pb-10"}>
                    <div className="container max-w-7xl w-11/12 mx-auto flex items-center gap-1 mb-10">
                        <Link className="text-[12px] text-[#A4A4A4] hover:underline" href={"/"}>
                            Home
                        </Link>
                        <span className="text-[12px] text-[#A4A4A4]">
                            /
                        </span>
                        <Link className="text-[12px] text-[#A4A4A4] hover:underline" href={"/gender/" + singleData?.gender_data?.gender_slug}>
                            {singleData?.gender_data?.gender_name}
                        </Link>
                        <span className="text-[12px] text-[#A4A4A4]">
                            /
                        </span>
                        <p className="text-[12px]">
                            {singleData?.product}
                        </p>
                    </div>
                    <div className={styles.wrapper + " w-11/12 container max-w-7xl mx-auto items-start flex max-md:flex-col gap-5"}>
                        <div className={styles.gallery + " max-md:w-full w-7/12"}>
                            <MyImageGallery data={productImages} />     
                                <div className="mt-10">
                                    <div className="border-t border-t-[#C5C5C5] py-3">
                                        <div className="w-full flex items-center justify-between cursor-pointer" onClick={() => handleDescLevel("desc")}>
                                            <p className={styles.title + " font-bold text-sm max-md:text-sm"}>Product Description</p>
                                            {descLevel === "desc" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214788 5.78266C0.501173 6.07245 0.965494 6.07245 1.25188 5.78266L5.5 1.48409L9.74812 5.78266C10.0345 6.07245 10.4988 6.07245 10.7852 5.78266C11.0716 5.49288 11.0716 5.02304 10.7852 4.73326L6.53709 0.434679C5.96432 -0.144893 5.03568 -0.144891 4.46291 0.434679L0.214789 4.73325C-0.071596 5.02304 -0.071596 5.49287 0.214788 5.78266Z" fill="#262626" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7852 0.217339C10.4988 -0.0724465 10.0345 -0.0724465 9.74812 0.217339L5.5 4.51591L1.25188 0.217338C0.965494 -0.0724473 0.501172 -0.0724474 0.214788 0.217338C-0.0715971 0.507124 -0.0715972 0.97696 0.214788 1.26675L4.46291 5.56532C5.03568 6.14489 5.96432 6.14489 6.53709 5.56532L10.7852 1.26675C11.0716 0.976961 11.0716 0.507125 10.7852 0.217339Z" fill="#262626" />
                                                </svg>
                                            }
                                        </div>
                                        {descLevel === "desc" ?
                                            <div className={styles.container + " flex flex-col gap-4"}>
                                                <div className={styles.items + " flex flex-col gap-3"}>
                                                    <div className={styles.item + " flex flex-col gap-2"}>
                                                        <div className={styles.desc + " font-normal text-lg max-md:text-xs"}  dangerouslySetInnerHTML={{ __html: singleData?.description}}  />
                                                    </div>
                                                </div>
                                                <div className={styles.image + " max-w-xl overflow-hidden mx-auto"}>
                                                    <img className="object-cover w-full" src={image_url + singleData?.description_image} alt={singleData?.description_image_alt} />
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                    <div className="border-t border-t-[#C5C5C5] py-3" id="size">
                                        <div className="w-full flex items-center justify-between cursor-pointer" onClick={() => handleDescLevel("size")}>
                                            <p className={styles.title + " font-bold text-sm max-md:text-sm"}>Size guide</p>
                                            {descLevel === "size" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214788 5.78266C0.501173 6.07245 0.965494 6.07245 1.25188 5.78266L5.5 1.48409L9.74812 5.78266C10.0345 6.07245 10.4988 6.07245 10.7852 5.78266C11.0716 5.49288 11.0716 5.02304 10.7852 4.73326L6.53709 0.434679C5.96432 -0.144893 5.03568 -0.144891 4.46291 0.434679L0.214789 4.73325C-0.071596 5.02304 -0.071596 5.49287 0.214788 5.78266Z" fill="#262626" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7852 0.217339C10.4988 -0.0724465 10.0345 -0.0724465 9.74812 0.217339L5.5 4.51591L1.25188 0.217338C0.965494 -0.0724473 0.501172 -0.0724474 0.214788 0.217338C-0.0715971 0.507124 -0.0715972 0.97696 0.214788 1.26675L4.46291 5.56532C5.03568 6.14489 5.96432 6.14489 6.53709 5.56532L10.7852 1.26675C11.0716 0.976961 11.0716 0.507125 10.7852 0.217339Z" fill="#262626" />
                                                </svg>
                                            }
                                        </div>
                                        {descLevel === "size" ?
                                            <div className={styles.singleshop__size + " mt-10 w-11/12 container mx-auto flex flex-col gap-4"}>
                                                <div className={styles.header + " flex flex-col gap-5"}>
                                                    <div className={styles.item + " flex flex-col gap-1"}>
                                                        <div className={styles.desc + " font-normal text-lg max-md:text-xs"}  dangerouslySetInnerHTML={{ __html: singleData?.size_guide}} />
                                                    </div>
                                                </div>
                                                <div className={styles.image + " w-3/4 mx-auto overflow-hidden"}>
                                                    <img className="object-cover w-full" src={image_url + singleData?.size_table_image} alt={singleData?.size_table_image_alt} />
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                    <div className="border-t border-t-[#C5C5C5] py-3">
                                        <div className="w-full flex items-center justify-between cursor-pointer" onClick={() => handleDescLevel("detail")}>
                                            <p className={styles.title + " font-bold text-sm max-md:text-sm"}>Product Details</p>
                                            {descLevel === "detail" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.214788 5.78266C0.501173 6.07245 0.965494 6.07245 1.25188 5.78266L5.5 1.48409L9.74812 5.78266C10.0345 6.07245 10.4988 6.07245 10.7852 5.78266C11.0716 5.49288 11.0716 5.02304 10.7852 4.73326L6.53709 0.434679C5.96432 -0.144893 5.03568 -0.144891 4.46291 0.434679L0.214789 4.73325C-0.071596 5.02304 -0.071596 5.49287 0.214788 5.78266Z" fill="#262626" />
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7852 0.217339C10.4988 -0.0724465 10.0345 -0.0724465 9.74812 0.217339L5.5 4.51591L1.25188 0.217338C0.965494 -0.0724473 0.501172 -0.0724474 0.214788 0.217338C-0.0715971 0.507124 -0.0715972 0.97696 0.214788 1.26675L4.46291 5.56532C5.03568 6.14489 5.96432 6.14489 6.53709 5.56532L10.7852 1.26675C11.0716 0.976961 11.0716 0.507125 10.7852 0.217339Z" fill="#262626" />
                                                </svg>
                                            }
                                        </div>
                                        {descLevel === "detail" ?
                                            <div className={styles.singleshop__size + " mt-10 w-11/12 container mx-auto flex flex-col gap-4"}>
                                                <div className={styles.header + " flex flex-col gap-5"}>
                                                    <div className={styles.item + " flex flex-col gap-1"}>
                                                        <div className={styles.desc + " font-normal text-lg max-md:text-xs"} dangerouslySetInnerHTML={{ __html: singleData?.details }} />
                                                    </div>
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                </div>                   
                        </div>
                        <div className={styles.info + " max-md:w-full w-5/12 flex flex-col gap-4"}>
                            <div className={styles.title}>
                                <p className="text-[16px] max-md:text-sm text-left text-[#27BDBE]">
                                    {singleData?.product}
                                </p>
                            </div>
                            <div className={styles.title + " mt-[-10px]"}>
                                <h1 className="text-[40px] leading-[45px] max-md:text-2xl font-noraml text-left text-black">
                                    {singleData?.name_product}
                                </h1>
                            </div>
                            <div className={styles.price + " flex gap-3 items-center mb-4 mt-[-5px]"}>
                                {myPrice?.percent_discount === 0 || myPrice?.percent_discount === "0" || myPrice?.percent_discount === null || myPrice?.percent_discount === undefined ? 
                                <>
                                    <p className={styles.realprice + " text-[22px] font-normal max-md:text-xs"}>{myPrice?.off_price}.00 AED</p>
                                    <p className={styles.vat + " font-normal text-xs text-[#9B9B9B]"}>VAT included</p>
    
                                </>                                
                                :
                                <>
                                    <p className={styles.previousprice + " font-noraml text-xs text-[#9B9B9B] line-through"}>{myPrice?.price}.00 AED</p>
                                    <p className={styles.realprice + " text-[22px] font-normal max-md:text-xs"}>{myPrice?.off_price}.00 AED</p>
                                    <p className={styles.vat + " font-normal text-xs text-[#9B9B9B]"}>VAT included</p>
                                    <p className={styles.saveper + " font-normal px-3 py-0 text-sm bg-[#27BDBE] text-black"}>{myPrice?.percent_discount}% SAVE</p>
                                </>
                                }
                            </div>
                            <div className={styles.desc + " flex flex-col gap-1"}>
                                <p className={styles.title + " font-bold text-lg max-md:text-sm"}>
                                    Application Fields
                                </p>
                                <p className={styles.desc + " font-light text-sm max-md:text-xs"}>
                                    {singleData?.application_fields}
                                </p>
                            </div>


                                <div className={styles.size + " flex flex-col gap-2"}>
                                    <div className="flex gap-6 items-center">
                                        <p className={styles.title + " font-bold text-[12px] max-md:text-sm"}>Size</p>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className={styles.items + " max-w-[285px] grid grid-cols-5 gap-1"}>
                                            {sizes?.map((sizeItem) => (
                                                <p
                                                    key={sizeItem.id}  // Use the id as the key
                                                    className={`${styles.item} ${avaibleSizes?.includes(sizeItem.size) ? 'cursor-pointer' : ''} text-sm font-bold px-2 py-[4px] text-center rounded-sm ${avaibleSizes?.includes(sizeItem.size) && sizeItem.size === activeSize
                                                        ? 'bg-black border-black text-white border'
                                                        : avaibleSizes?.includes(sizeItem.size) && sizeItem.size !== activeSize
                                                            ? 'border-[#A4A4A4] text-black border hover:bg-[#D9D9D9]'
                                                            : 'bg-[#D9D9D9] text-[#b8b8b8] border border-[#D9D9D9]'
                                                        }`}
                                                    onClick={avaibleSizes?.includes(sizeItem.size) ? () => handleActiveSize(sizeItem.size) : undefined}
                                                >
                                                    {sizeItem.size}
                                                </p>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-xs underline hover:text-[#27BDBE] duration-300 cursor-pointer" onClick={handleScrollSize}>
                                                Size Guide
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            <div className={styles.color + " flex flex-col gap-2"}>
                                    <>
                                        <p className={styles.title + " font-bold text-[12px] max-md:text-sm"}>Color</p>
                                        <div className={styles.items + " flex items-center gap-3"}>
                                            {colors?.map((item) => (
                                                <>
                                                    {item === activeColor ?
                                                        <div className="flex items-center justify-center flex-col gap-1">
                                                            <div className={styles.item + ` w-[28px] h-[28px] border-2 border-[#27bdbe] rounded-full cursor-pointer`} style={{background: item?.code}} onClick={() => handleActiveColor(item)}></div>
                                                            <p className="text-[9px] text-center text-[#888]">{item?.color}</p>
                                                        </div>
                                                        :
                                                        <div className="flex items-center justify-center flex-col gap-1">
                                                            <div className={styles.item + ` w-[28px] h-[28px] rounded-full cursor-pointer`} style={{background: item?.code}} onClick={() => handleActiveColor(item)}></div>
                                                            <p className="text-[9px] text-center text-[#888]">{item?.color}</p>
                                                        </div>
                                                    }
                                                </>
                                            ))}
                                        </div>
                                    </>
                            </div>

                                <div className={styles.quantity + " flex flex-col gap-2"}>
                                    <p className={styles.title + " font-bold text-[12px] max-md:text-sm"}>Quantity</p>
                                    <div className={styles.wrapper + " flex items-center mr-auto gap-3 flex-row-reverse"}>
                                        {activeSize === null && showSelectSize === true ?
                                            <p className="text-xs text-[#E83B3B]">
                                                please select size
                                            </p> : ""
                                        }
                                        <div className="inline-flex items-center border border[#888] h-[30px]">
                                            {activeSize ? 
                                                <div className={styles.prev + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={decreaseQuantity}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="#000000">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 4.5C1.875 4.29289 2.04289 4.125 2.25 4.125H6.75C6.95711 4.125 7.125 4.29289 7.125 4.5C7.125 4.70711 6.95711 4.875 6.75 4.875H2.25C2.04289 4.875 1.875 4.70711 1.875 4.5Z" fill="white" />
                                                    </svg>
                                                </div> : 
                                                <div className={styles.prev + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={() => setShowSelectSize(true)}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="#000000">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 4.5C1.875 4.29289 2.04289 4.125 2.25 4.125H6.75C6.95711 4.125 7.125 4.29289 7.125 4.5C7.125 4.70711 6.95711 4.875 6.75 4.875H2.25C2.04289 4.875 1.875 4.70711 1.875 4.5Z" fill="white" />
                                                    </svg>
                                                </div>
                                            }
                                            <div className={styles.number + " border-r border-l px-6"}>{mquantity}</div>
                                            {activeSize ? 
                                                <div className={styles.next + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={increaseQuantity}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="none">
                                                        <path d="M4.875 1.875C4.875 1.66789 4.70711 1.5 4.5 1.5C4.29289 1.5 4.125 1.66789 4.125 1.875V4.125H1.875C1.66789 4.125 1.5 4.29289 1.5 4.5C1.5 4.70711 1.66789 4.875 1.875 4.875H4.125V7.125C4.125 7.33211 4.29289 7.5 4.5 7.5C4.70711 7.5 4.875 7.33211 4.875 7.125V4.875H7.125C7.33211 4.875 7.5 4.70711 7.5 4.5C7.5 4.29289 7.33211 4.125 7.125 4.125H4.875V1.875Z" fill="white" />
                                                    </svg>
                                                </div> : 
                                                <div className={styles.next + " px-3 cursor-pointer hover:bg-[#d9f4f3] h-full flex items-center justify-center duration-300"} onClick={() => setShowSelectSize(true)}>
                                                    <svg className="stroke-black" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 9 9" fill="none">
                                                        <path d="M4.875 1.875C4.875 1.66789 4.70711 1.5 4.5 1.5C4.29289 1.5 4.125 1.66789 4.125 1.875V4.125H1.875C1.66789 4.125 1.5 4.29289 1.5 4.5C1.5 4.70711 1.66789 4.875 1.875 4.875H4.125V7.125C4.125 7.33211 4.29289 7.5 4.5 7.5C4.70711 7.5 4.875 7.33211 4.875 7.125V4.875H7.125C7.33211 4.875 7.5 4.70711 7.5 4.5C7.5 4.29289 7.33211 4.125 7.125 4.125H4.875V1.875Z" fill="white" />
                                                    </svg>
                                                </div>
                                            }
                                        </div>
                                        {activeColor?.quantity == 1 ? 
                                                <div className={styles.lowstock + " flex items-center gap-1"}>
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="9" height="8" viewBox="0 0 9 8" fill="none">
                                                        <g clip-path="url(#clip0_227_5703)">
                                                        <path d="M1.47861 4.00243C1.47861 2.54492 2.66016 1.36338 4.11767 1.36338C4.948 1.36338 5.67762 1.74719 6.15708 2.35078L5.60311 2.34916C5.42092 2.34863 5.27279 2.49589 5.27226 2.67807C5.27172 2.86026 5.41898 3.00839 5.60117 3.00892L6.73691 3.01225C6.74958 3.01302 6.76233 3.01307 6.77511 3.01236L6.9207 3.01279C7.00836 3.01304 7.09251 2.9784 7.15459 2.91651C7.21666 2.85462 7.25155 2.77056 7.25155 2.68291L7.25155 1.36338C7.25155 1.18119 7.10386 1.0335 6.92167 1.0335C6.73948 1.0335 6.59178 1.18119 6.59178 1.36338L6.59178 1.84153C5.99386 1.14578 5.1149 0.703613 4.11767 0.703613C2.29578 0.703613 0.818848 2.18055 0.818848 4.00243C0.818848 5.82432 2.29578 7.30126 4.11767 7.30126C5.41607 7.30126 6.51398 6.55168 7.05214 5.46877C7.13322 5.30562 7.06669 5.10763 6.90353 5.02655C6.74038 4.94547 6.54239 5.012 6.46131 5.17515C6.02784 6.04741 5.15069 6.64149 4.11767 6.64149C2.66016 6.64149 1.47861 5.45995 1.47861 4.00243Z" fill="#F04444"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11748 2.35303C4.29967 2.35303 4.44736 2.50072 4.44736 2.68291V3.8658L5.01051 4.42894C5.13933 4.55777 5.13933 4.76664 5.01051 4.89546C4.88168 5.02429 4.67281 5.02429 4.54398 4.89546L3.98084 4.33232C3.85711 4.20859 3.7876 4.04078 3.7876 3.8658V2.68291C3.7876 2.50072 3.93529 2.35303 4.11748 2.35303Z" fill="#F04444"/>
                                                        </g>
                                                        <defs>
                                                        <clipPath id="clip0_227_5703">
                                                        <rect width="7.91717" height="7.91717" fill="white" transform="translate(0.15918 0.0439453)"/>
                                                        </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <p className="text-xs text-[#E83B3B]">Low in stock: only 1 left.</p>
                                                </div> : ""
                                            }
                                    </div>
                                </div>

                            <div className={styles.buttons + " flex flex-col gap-2 mt-4 items-center justify-center"}>
                                {clickAddButton === true ? 
                                    <div className={styles.singleaddtobag} disable="true">
                                        {maxQuantity == 0 ?
                                            <div className={styles.singleaddtobag}>
                                                <DeBluePrimaryButton>
                                                    Out Of Stock
                                                </DeBluePrimaryButton>
                                            </div>
                                            : activeColor === null || activeColor === undefined || activeSize === null || activeSize === undefined || mquantity == 0 ?
                                            <div className={styles.singleaddtobag}>
                                                <DeBluePrimaryButton>
                                                    Add To Bag
                                                </DeBluePrimaryButton> 
                                            </div>
                                            : 
                                            <div className={styles.singleaddtobag} onClick={addToCart}>
                                                <BluePrimaryButton>Add to bag</BluePrimaryButton>
                                            </div>
                                        }
                                    </div>
                                    :
                                    <>
                                        {maxQuantity == 0 ?
                                            <div className={styles.singleaddtobag}>
                                                <DeBluePrimaryButton>
                                                    Out Of Stock
                                                </DeBluePrimaryButton>
                                            </div>
                                            : activeColor === null || activeColor === undefined || activeSize === null || activeSize === undefined || mquantity == 0 ?
                                            <div className={styles.singleaddtobag}>
                                                <DeBluePrimaryButton>
                                                    Add To Bag
                                                </DeBluePrimaryButton> 
                                            </div>
                                            : 
                                            <div className={styles.singleaddtobag} onClick={addToCart}>
                                                <BluePrimaryButton>Add to bag</BluePrimaryButton>
                                            </div>
                                        }
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>

    
    
    
    
    
    
                <div className="border-t border-t-[#C5C5C5] mt-5">
                    <div className="py-20 container max-w-7xl w-11/12 mx-auto text-lg">
                        <p>
                            Related Products
                        </p>
                        <div className={styles.wrapper + " grid grid-cols-5 max-md:gap-x-5 gap-x-3 mt-10 max-md:grid-cols-2 max-md:gap-y-5"}>
                                {rItms?.map((item) => (
                                    <>
                                        {item?.id !== singleData?.id ?
                                            <ProductItem alt={item?.cover_image_alt} percentDiscount={item?.percent_discount} offPrice={item?.off_price} name={item?.name_product} title={item?.product} image={item?.cover_image} price={item?.price} slug={item?.slug} fav={item?.fav} id={item?.id} onReload={handleReload} /> : ""
                                        }
                                    </>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 mb-10">
                    <Faq />
                </div>
    
    
                </div>
            }
        </>
    )
}

export default SingleShop;