import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { getAllBlogs, getAllBlogsRelated, getSingleBlogData } from "../../api/blog";
import Link from "next/link";

const SingleBlog = ({slug}) => {


    const [data , setData] = useState(null);
    const [related , setRelated] = useState(null);
    const [recent , setRecent] = useState(null);


    // get data for single blog
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getSingleBlogData(slug);
            setData(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [slug]);


    // get data for single blog
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllBlogsRelated("cat");
            setRelated(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllBlogs("4");
            setRecent(data?.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, []);



    return(
        <div className={styles.singleBlog + " bg-[#f5f5f5] pb-5 mt-[-20px]"}>
            <div className="w-full overflow-hidden">
                <img className="object-cover w-full" src={data?.banner} alt="image" />
            </div>
            <div className="container mt-[-30%] w-11/12 max-w-7xl mx-auto flex items-start gap-6 max-md:flex-col-reverse">
                <div className={styles.left + " w-9/12 bg-white p-20 max-md:w-full max-md:p-5"}>
                    <div className={styles.content}>
                        <div className="flex items-end mb-20 mt-1 gap-3">
                            <div>
                                <p className="text-[#27BDBE] text-[100px] max-md:text-[60px]" style={{fontFamily: "Wittgenstein"}}>
                                    {data?.title?.substring(0,1)}
                                </p>
                            </div>
                            <div>
                                <p className="max-w-[500px] text-[30px] leading-[40px] font-bold max-md:text-[14px]">
                                    {data?.title?.substring(1)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-8 max-md:flex-col max-md:items-center max-md:justify-center">
                            <div className="w-2/6 overflow-hidden max-md:w-full">
                                <img className="object-cover w-full" src={data?.title_image} alt="image" />
                            </div>
                            <div className="w-4/6 max-md:w-full">
                                <p className="text-xl max-md:text-center max-md:text-sm">
                                    {data?.description}
                                </p>
                            </div>
                        </div>
                        <div className="w-[90%] mt-14 ml-auto mt-8 text-xl max-md:text-sm" dangerouslySetInnerHTML={{ __html: data?.body}} />





                        <div className="mt-10">
                            <p className="font-bold">
                                {data?.author}
                            </p>
                            <p>
                                {data?.role}
                            </p>
                        </div>


                        <div className="mt-10">
                            <p className="font-bold mb-1">
                                Related Posts
                            </p>
                            <div className="flex gap-3 p-5">
                                {related?.map((item) => (
                                    <div className={styles.relatedblog + " h-[300px] w-1/3 p-4"}>
                                        <div className={styles.backgroundLayer}></div>
                                        <div className={styles.desc}>
                                            <p className="font-bold text-lg text-white mb-1">
                                                {item?.title}
                                            </p>
                                            <p className="text-white text-xs mb-3">
                                                {item?.short_description} 
                                            </p>
                                            <button className="bg-[#515151] text-xs px-3 py-2 flex items-center gap-2 text-white">
                                                Read More
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 9 8" fill="none">
                                                    <path d="M2.25879 4.14917H6.73707" stroke="white" stroke-width="0.393695" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M4.49805 1.90991L6.73719 4.14905L4.49805 6.38819" stroke="white" stroke-width="0.393695" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>


                <div className={styles.right + " w-3/12 flex flex-col gap-4 max-md:w-full"}>
                    <div className="w-full flex gap-2 mb-3">
                        <input type="text" placeholder="Enter any key to search ...." className="p-2 text-xs w-9/12" />
                        <button className="bg-[#27BDBE] text-white text-[14px] w-3/12 py-[5px]">
                            Search
                        </button>
                    </div>
                    <div>
                        <p className="bg-black text-white text-xl py-1 text-center mb-3">
                            Recent Post
                        </p>
                        <div className="flex flex-col gap-4">
                            {recent?.map((item) => (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M5.8125 1.5C6.12316 1.5 6.375 1.75184 6.375 2.0625V3H11.625V2.0625C11.625 1.75184 11.8768 1.5 12.1875 1.5C12.4982 1.5 12.75 1.75184 12.75 2.0625V3H15.1875C15.4982 3 15.75 3.25184 15.75 3.5625V7.9926C14.2587 7.05384 12.3503 6.82828 10.598 7.55415C7.7282 8.7429 6.36593 12.0328 7.55388 14.9018C7.67797 15.2013 7.82495 15.4845 7.99195 15.75H2.8125C2.50184 15.75 2.25 15.4982 2.25 15.1875V3.5625C2.25 3.25184 2.50184 3 2.8125 3H5.25V2.0625C5.25 1.75184 5.50184 1.5 5.8125 1.5Z" fill="#7A7A7A" />
                                            <path d="M12.75 10.5C13.0607 10.5 13.3125 10.7518 13.3125 11.0625V12.5167L14.4603 13.6648C14.6799 13.8845 14.6799 14.2406 14.4602 14.4603C14.2405 14.6799 13.8844 14.6799 13.6647 14.4602L12.3522 13.1474C12.2467 13.0419 12.1875 12.8989 12.1875 12.7497V11.0625C12.1875 10.7518 12.4393 10.5 12.75 10.5Z" fill="#7A7A7A" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 8.4375C10.3683 8.4375 8.4375 10.3683 8.4375 12.75C8.4375 15.1317 10.3683 17.0625 12.75 17.0625C15.1317 17.0625 17.0625 15.1317 17.0625 12.75C17.0625 10.3683 15.1317 8.4375 12.75 8.4375ZM9.5625 12.75C9.5625 10.9896 10.9896 9.5625 12.75 9.5625C14.5104 9.5625 15.9375 10.9896 15.9375 12.75C15.9375 14.5104 14.5104 15.9375 12.75 15.9375C10.9896 15.9375 9.5625 14.5104 9.5625 12.75Z" fill="#7A7A7A" />
                                        </svg>
                                        <time className="text-[12px]" dateTime={item?.created}>
                                            {item?.created}
                                        </time>
                                    </div>
                                    <Link href={"/blog/" + item?.slug}>
                                        {item?.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-[#E8E8E8] mt-10 py-20 max-md:py-10">
                <div className="container w-11/12 max-w-7xl mx-auto">
                    <p className="text-2xl font-bold mb-1 max-md:text-lg">
                        Our news is good news
                    </p>
                    <p className="mb-2 text-2xl max-md:text-sm">
                        Be the first to know about new arrivals, promotions and more when you sign up to receive our newsletter
                    </p>
                    <div className="mb-2 relative">
                        <input placeholder="Enter Email Address " type="text" className="w-1/2 py-2 px-2 bg-[#464646] text-white max-md:text-xs" />
                        <button className="bg-[#27BDBE] py-2 px-10 text-white max-md:text-xs">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs max-md:text-[10px]">
                        By subscribing, I accept the Privacy Policy and give my consent to receive emails from Level Shoes unsubscribe at any time.
                    </p>
                </div>
            </div>

            <div className="container w-11/12 max-w-7xl mx-auto mt-20 mb-20">
                <p className="font-bold">
                    Latest Products
                </p>
            </div>
        </div>
    )
}

export default SingleBlog;