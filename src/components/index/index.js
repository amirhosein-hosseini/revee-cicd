import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Category from "./category";
import { getAllBannerSliders, getAllGenders, getAllHomeBannerSliders, getAllTestimonial, getHomeAboutData, getHomeSeoFields, getHomeVideo } from "../../api/index";
import Loading from "../loading";
import Link from "next/link";
import HeroSlider from "../sliderConfig/heroSlider";
import TestimonialSlider from "../sliderConfig/testimonialSlider";
import { getAllProducts } from "@/api/shop";
import ShopItem from "../shop/shopItem";
import { getAllBlogs } from "@/api/blog";
import ProductItem from "./productItem";
import Head from "next/head";


const HomePage = () => {

    const [reload , setReload] = useState(1);
    const OPTIONS = { align: 'start', loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const [sliders , setSliders] = useState(null);
    const [genders ,setGenders] = useState(null);
    const [products , setProducts] = useState(null);
    const [testimonial , setTestimonial] = useState(null);
    const [video , setVideo] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [homeAbout , setHomeAbout] = useState(null);
    const [blogs , setBlogs] = useState(null);
    const [seoFields , setSeoFields] = useState(null);


    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };
    
        // Initial check on component mount
        handleResize();
    
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove the resize event listener
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllBlogs("4");
            setBlogs(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllBannerSliders();
            setSliders(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getHomeSeoFields();
            setSeoFields(data.data[0]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getHomeAboutData();
            setHomeAbout(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);




    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllGenders();
            setGenders(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllProducts(1 , 8 , "");
            setProducts(data.data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [reload]);

    const handleReload = () => {
        setReload(reload + 1)
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllTestimonial();
            setTestimonial(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getHomeVideo();
            setVideo(data.data[0]?.video);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);










    // if (isLoading) {
    //     // Render Loading component until 5 seconds have passed
    //     return <Loading />;
    // }





    return(
        <> 
            <Head>
                {
                    seoFields?.follow === true && seoFields?.index === true ? <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                        seoFields?.follow === true && seoFields?.index === false ? <meta name="robots" content="follow, noindex" /> :
                            seoFields?.follow === false && seoFields?.index === true ? <meta name="robots" content="nofollow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                                seoFields?.follow === false && seoFields?.index === false ? <meta name="robots" content="nofollow, noindex" /> : ""
                }
                <link rel="canonical" href={seoFields?.canonical === "" || seoFields?.canonical === null ? "https://healfit.ae" : seoFields?.canonical} />
                <meta name="description" content={seoFields?.meta_description} />
                <title>{seoFields?.meta_title}</title>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: seoFields?.schema_markup }}
                />
            </Head>
            <div className={styles.homepage}>
                <div className="container max-w-7xl mx-auto w-11/12">


                    {sliders?.length === 1 ?
                        <div className="w-full overflow-hidden">
                            <img className="object-cover w-full" src={sliders[0]?.banner} alt="image" />
                        </div>
                        :
                        sliders?.length > 1 ?
                            <HeroSlider data={sliders} /> : ""
                    }

                </div>

                <div className={styles.categories + " w-11/12 container max-w-7xl mx-auto grid grid-cols-2 gap-6 mb-20 mt-5 max-md:mt-1 max-md:gap-3"}>
                    {genders?.map((item) => (
                        <Category category={item?.gender} category_title={item?.gender_title} description={item?.description} id={item?.id} image={item?.image} slug={item?.slug} />
                    ))}
                </div>

                <div className="mt-10 container max-w-5xl mx-auto w-11/12">
                    {isMobile === false ?
                        <div className="grid grid-cols-4 gap-4" style={{ direction: "ltr" }}>
                            {products?.map((item) => (
                                <ProductItem alt={item?.cover_image_alt} percentDiscount={item?.percent_discount} offPrice={item?.off_price} name={item?.name_product} title={item?.product} image={item?.cover_image} price={item?.price} slug={item?.slug} fav={item?.fav} id={item?.id} onReload={handleReload} />
                            ))}
                        </div> :
                        <div className="grid grid-cols-2 gap-4" style={{ direction: "ltr" }}>
                            {products?.slice(0, 4)?.map((item) => (
                                <ProductItem alt={item?.cover_image_alt} percentDiscount={item?.percent_discount} offPrice={item?.off_price} name={item?.name_product} title={item?.product} image={item?.cover_image} price={item?.price} slug={item?.slug} fav={item?.fav} id={item?.id} onReload={handleReload} />
                            ))}
                        </div>
                    }

                    <div className="mb-20 mt-10 text-center">
                        <Link href={"/shop"} className="text-sm text-center max-md:text-xs hover:text-[#27BDBE] duration-300">
                            Visit All products
                        </Link>
                    </div>
                </div>




                <div className={styles.homepage__benefit + " max-md:py-10 py-20 bg-[#625E5E]"}>
                    <div className="flex flex-col justify-center items-center w-11/12 container mx-auto">
                        <p className={styles.title + " leading-[48px] max-md:text-sm text-4xl text-white text-center max-w-screen-md font-extrabold"}>
                            {homeAbout?.home_about_title}
                        </p>
                        <p className={styles.desc + " leading-[38px] max-md:text-xs max-md:leading-5 text-lg text-white max-md:mt-5 mt-20 text-center font-normal"}>
                            {homeAbout?.home_about_description}
                        </p>
                    </div>
                </div>






                <div className={styles.treatment + " w-11/12 max-w-5xl mx-auto flex flex-col mb-20"}>

                    <div className={styles.treatment__video + " mt-20 w-full overflow-hidden"}>
                        <div className="max-md:h-[200px]" dangerouslySetInnerHTML={{ __html: video }}></div>
                    </div>

                </div>


                <div className={styles.testimonial + " container max-w-5xl mx-auto w-11/12 mb-20 mt-10"}>
                    <TestimonialSlider data={testimonial} />
                </div>



                <div className={styles.blogs + " container max-w-5xl w-11/12 mx-auto flex flex-col gap-3 mb-20 max-md:gap-1"}>


                    <div className="grid grid-cols-2 gap-3 max-md:gap-1">
                        {blogs ?
                            <Link href={"/blog/" + blogs[0]?.slug}>
                                <div className={styles.indexBlogItem + " h-[500px] bg-[#343434] p-10 max-md:p-3 max-md:h-[190px]"}>
                                    <div className={styles.title}>
                                        <p className="text-white font-bold text-4xl max-md:text-sm">
                                            {blogs[0]?.title}
                                        </p>
                                    </div>
                                    <div className={styles.desc + " mt-6 max-md:mt-3"}>
                                        <p className="text-white w-8/12 max-md:text-xs">
                                            {blogs[0]?.short_description}
                                        </p>
                                    </div>
                                    <div className="mt-8 max-md:hidden">
                                        <button className="flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white">
                                            Reed More
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M4.7749 10.6001H17.0249" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link> : ""
                        }

                        {blogs ?
                            <Link href={"/blog/" + blogs[1]?.title}>
                                <div className={styles.indexBlogItem + " h-[500px] bg-[#27BDBE] p-10 max-md:p-3 max-md:h-[190px]"}>
                                    <div className={styles.title}>
                                        <p className="text-white font-bold text-4xl max-md:text-sm">
                                            {blogs[1]?.title}
                                        </p>
                                    </div>
                                    <div className={styles.desc + " mt-6 max-md:mt-3"}>
                                        <p className="text-white w-8/12 max-md:text-xs">
                                            {blogs[1]?.short_description}
                                        </p>
                                    </div>
                                    <div className="mt-8 max-md:hidden">
                                        <button className="flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white">
                                            Reed More
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                <path d="M4.7749 10.6001H17.0249" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link> : ""
                        }

                    </div>



                    <div>
                        {blogs ?
                            <Link href={"/blog/" + blogs[2]?.title}>
                                <div className="w-full bg-[#343434] p-10 max-md:p-3 h-[300px] flex items-center max-md:h-[120px]">
                                    <div className="w-5/12 max-md:w-8/12">
                                        <div className={styles.title}>
                                            <p className="text-white font-bold text-4xl max-md:text-sm">
                                                {blogs[2]?.title}
                                            </p>
                                        </div>
                                        <div className="mt-8 max-md:hidden">
                                            <button className="flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white">
                                                Reed More
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M4.7749 10.6001H17.0249" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link> : ""
                        }
                    </div>


                    <div>
                        {blogs ?
                            <Link href={"/blog/" + blogs[3]?.title}>
                                <div className="w-full bg-[#27BDBE] h-[300px] flex items-center max-md:h-[120px]">
                                    <div className="w-5/12 p-10 max-md:p-3">
                                        <div className={styles.title}>
                                            <p className="text-white font-bold text-4xl max-md:text-sm">
                                                {blogs[3]?.title}
                                            </p>
                                        </div>
                                        <div className="mt-8 max-md:hidden">
                                            <button className="flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white">
                                                Reed More
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M4.7749 10.6001H17.0249" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251" stroke="white" stroke-width="1.07692" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-7/12 h-full">
                                        <img className="object-cover w-full h-full" src={blogs[2]?.cover_image} alt="image" />
                                    </div>
                                </div>
                            </Link> : ""
                        }
                    </div>

                    <div className="flex items-center gap-1 ml-auto mt-3">
                        <p className="max-md:text-sm">
                            All the news
                        </p>
                        <svg className="max-md:w-5" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 38 38" fill="none">
                            <path d="M7.94727 19.4399H29.4723" stroke="#666666" stroke-width="1.89231" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.71 8.67725L29.4725 19.4397L18.71 30.2022" stroke="#666666" stroke-width="1.89231" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                </div>


            </div>
        </>

    )
}

export default HomePage;