import React, { useEffect, useState } from "react";
import Subscribe from "../index/subscribe";
import RecommendItem from "./recomendItem";
import ShopItem from "./shopItem";
import styles from "./styles.module.scss";
import { getAllShopList, getPopularProducts } from "../../api/shop";
import { domain } from "../../api/domain";
import ScrollToTop from "../../context/scrollToTop";
import Loading from "../loading";
import { useRouter } from "next/router";

const ShopPage = () => {

    const router = useRouter();

    const [products , setProducts] = useState(null);
    const [rItms , setRItems] = useState(null);
    const [numberOfPages , setNumberOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading , setLoading] = useState(false);
  


    // get all shop products list
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
          try {
            const data = await getAllShopList(router.query.slug , currentPage);
            setProducts(data.data);
            setLoading(false)
            setNumberOfPages(data?.data?.number_of_pages);
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
          }
        };
    
        fetchData();
    }, [currentPage]);


    // get all recommend items 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getPopularProducts();
            setRItems(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);


    // This useEffect ensures that if numberOfPages changes, it resets currentPage to 1
    useEffect(() => {
      setCurrentPage(1);
    }, [numberOfPages]);
  
    const nextPage = () => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, numberOfPages));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    const prevPage = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };


    return(
        <ScrollToTop>
            <div className={styles.shop + " max-md:mt-20 mt-20"}>
                <div className={styles.shop__title + " w-11/12 text-center container mx-auto flex justify-center items-center max-md:mb-20 mb-20"}>
                    <p className="max-md:text-xl text-4xl">
                        {products?.title}
                    </p>
                </div>



                {loading === true ? 
                    <div className="flex items-center justify-center mt-10 mb-10">
                        <Loading />
                    </div> 
                    : 
                    <div className={styles.shop__wrapper + " w-11/12 container max-w-5xl mx-auto grid max-md:grid-cols-3 grid-cols-4 max-md:gap-x-5 gap-x-10 gap-y-[150px] max-md:mb-20 mb-40"}>
                        {products?.data?.map((item) => (
                            <ShopItem subtitle={item?.subtitle} category={item?.category} image1={domain + item?.cover_image?.substring(1)} off_price={item?.off_price} percent_discount={item?.percent_discount} price={item?.price} product={item?.product} product_code={item?.product_code} slug={item?.slug} />
                        ))}
                    </div>
                }
                <div className={styles.pagination + " flex container w-11/12 gap-4 justify-center items-center mb-20 mx-auto"}>
                        <div className={styles.items + " flex gap-1"}>
                            {numberOfPages && Array.from({ length: numberOfPages }, (_, index) => (
                                <p
                                    key={index}
                                    className={`w-6 h-6 cursor-pointer flex items-center justify-center ${currentPage === index + 1 ? 'text-white bg-[#27BDBC]' : 'text-black'}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </p>
                            ))}
                        </div>
                        <div className={styles.next}>
                            {/* <button onClick={prevPage} disabled={currentPage === 1}>Previous</button> */}
                            <button className="flex gap-2 items-center" onClick={nextPage} disabled={currentPage === numberOfPages}>
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                    <path d="M5.19873 10.8292L8.51421 7.51372L5.19873 4.19824" stroke="#25282B" stroke-width="1.10516" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                </div>





                <div className={styles.shop__latest + " mb-20"}>
                    <div className={styles.title + " text-center max-md:py-6 py-12 bg-[#27BDBE]"}>
                        <p className="max-md:text-xl text-5xl text-white">
                            LATEST PRODUCT
                        </p>
                    </div>
                    <div className={styles.wrapper + " w-11/12 container max-w-5xl mx-auto grid grid-cols-3 max-md:gap-x-5 gap-x-10 mt-20"}>
                        {rItms?.map((item) => (
                            <RecommendItem desc={item?.popular?.product} image={item?.popular?.image1} slug={item?.popular?.slug} />                  
                        ))}
                    </div>
                </div>



                <Subscribe />
            </div>
        </ScrollToTop>
    )
}

export default ShopPage;