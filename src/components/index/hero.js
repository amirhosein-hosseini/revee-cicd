import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { GrayPrimaryBtn } from "../button";
import { getAllHeroSliderImages } from "../../api/index";
import { domain } from "../../api/domain";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import Link from "next/link";

const Hero = ({data}) => {


    const [heroSlider , setHeroSlider] = useState(null);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [backgrounds , setBackgrounds] = useState([])


    // get all hero slider images
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllHeroSliderImages();
            setHeroSlider(data.data?.home_slider);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       if (heroSlider) {
    //         const newBackgrounds = heroSlider.map((item) => {
    //           return domain + item?.image?.substring(1);
    //         });
    //         setBackgrounds(newBackgrounds);
      
    //         setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % newBackgrounds.length);
    //       }
    //     }, 2000);
      
    //     return () => clearInterval(interval);
    // }, [heroSlider]);




    

    return(
      <>
        {heroSlider && (
          <div className={styles.hero + " flex items-center justify-center max-md:h-[60vh] h-[100vh]"} style={{ backgroundImage: `url(${domain + heroSlider[1]?.image?.substring(1)})` }}>
              <div className={styles.hero__desc + " w-11/12 max-md:py-6 py-20 max-md:px-4 px-10 max-w-5xl mx-auto mt-20 max-md:mt-10"}>
                  <p className={styles.title + " max-md:text-xl text-4xl text-[#565656] font-extrabold"}>
                      {data?.top_title}
                  </p>
                  <p className={styles.desc + " max-md:text-xs text-lg max-w-lg max-md:mt-4 mt-8 font-normal"}>
                      {data?.top_description}
                  </p>
                  <div className={styles.button + " flex justify-end max-md:mt-8 mt-16"}>
                      <Link href={"/contact"}>
                          <GrayPrimaryBtn>
                              Contact Us
                          </GrayPrimaryBtn>
                      </Link>
                  </div>
              </div>
          </div>
        )}
      </>
    )
}
export default Hero;