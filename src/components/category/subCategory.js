import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Category from "../index/category";
import { getAllCategories, getAllSubCategories, getCategoryById, getSubCategoryById } from "../../api/category";
import Loading from "../loading";
import { useRouter } from "next/router";
import { image_url } from "@/api/domain";
import { getAllProducts, getAllSubCategoryProduct } from "@/api/shop";
import ProductItem from "../index/productItem";
import Link from "next/link";
import Head from "next/head";

const SubCategory = ({secslug}) => {


    const [reload , setReload] = useState(1);
    const [subCategoryData , setSubCategoryData] = useState(null)
    const [products , setProducts] = useState(null);
    const [paramsFilter , setParamsFilter] = useState("gender=&color=&size=&category=&available=");
    const [openFilter , setOpenFilter] = useState(false);
    const [sizeList , setSizeList] = useState([]);
    const [colorList , setColorList] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [numberOfPages , setNumberOfPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter , setFilter] = useState({
      gender: "",
      color: "",
      size: "",
      available: "",
      category: "",
    })


    const handleReload = () => {
      setReload(reload + 1)
    }


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
      if(subCategoryData){
        setParamsFilter("gender=" + filter?.gender + "&color=" + filter?.color + "&size=" + filter?.size + "&category=" + filter?.category + "&available=" + filter?.available)
      }
    } , [filter , subCategoryData])



  const handleAvaibleBoxChange = (event) => {
    const isChecked = event.target.checked;
    const newFilter = { ...filter, available: isChecked ? "true" : "" };
    setFilter(newFilter);
  };



  const handleColorChange = (value) => {
    if (colorList?.includes(value)) {
      setColorList(prevList => prevList.filter(item => item !== value));
    } else {
      setColorList(prevList => [...prevList, value]);
    }
  }
  useEffect(() => {
    const colorString = colorList.join(',');

    setFilter((prevFilterData) => ({
      ...prevFilterData,
      ["color"]: colorString,
    }))

  }, [colorList]);

  
  const handleSizeChange = (value) => {
    if (sizeList?.includes(value)) {
      setSizeList(prevList => prevList.filter(item => item !== value));
    } else {
      setSizeList(prevList => [...prevList, value]);
    }
  }
  useEffect(() => {
      const arrayString = sizeList.join(',');


      setFilter((prevFilterData) => ({
        ...prevFilterData,
        ["size"]: arrayString,
      }))

  }, [sizeList]);


  
  const handleGenderChange = (value) => {
    if(filter?.gender === value){
      setFilter((prevFilterData) => ({
        ...prevFilterData,
        ["gender"]: "",
      }))
    }else{
      setFilter((prevFilterData) => ({
        ...prevFilterData,
        ["gender"]: value,
      }))
    }
  }

  const handleResetFilters = () => {
    setFilter({
      gender: "",
      color: "",
      size: "",
      available: "",
      subcategory: secslug,
      category: "",
    })
  }



    // get data for categories
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getSubCategoryById(secslug);
            setSubCategoryData(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [secslug]);



  useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllSubCategoryProduct(currentPage,15,paramsFilter , secslug);
          setProducts(data.data?.data);
          setNumberOfPages(data?.data?.number_of_pages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
  }, [paramsFilter , secslug , reload , currentPage]);


    // This useEffect ensures that if numberOfPages changes, it resets currentPage to 1
    useEffect(() => {
      setCurrentPage(1);
    }, [numberOfPages]);
  
  
    const nextPage = () => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, numberOfPages));
    };
  
    const prevPage = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    

    return(
          <>
            <Head>
              {
                subCategoryData?.follow === true && subCategoryData?.index === true ? <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                  subCategoryData?.follow === true && subCategoryData?.index === false ? <meta name="robots" content="follow, noindex" /> :
                    subCategoryData?.follow === false && subCategoryData?.index === true ? <meta name="robots" content="nofollow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> :
                      subCategoryData?.follow === false && subCategoryData?.index === false ? <meta name="robots" content="nofollow, noindex" /> : ""
              }
              <link rel="canonical" href={subCategoryData?.canonical === "" || subCategoryData?.canonical === null ? `https://healfit.ae/category/${subCategoryData?.category_slug}/${subCategoryData?.slug}` : subCategoryData?.canonical} />
              <meta name="description" content={subCategoryData?.meta_description} />
              <title>{subCategoryData?.meta_title}</title>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: subCategoryData?.schema_markup }}
              />
            </Head>
            <div className={styles.categoryPage + " container max-w-7xl mx-auto mb-20"}>

              <div className="flex items-center gap-1 mb-10">
                <Link className="text-[12px] text-[#A4A4A4] hover:underline" href={"/"}>
                  Home
                </Link>
                <span className="text-[12px] text-[#A4A4A4]">
                  /
                </span>
                <Link className="text-[12px] text-[#A4A4A4] hover:underline" href={"/category/" + subCategoryData?.category_slug}>
                  {subCategoryData?.category_name}
                </Link>
                <span className="text-[12px] text-[#A4A4A4]">
                  /
                </span>
                <p className="text-[12px]">
                  {subCategoryData?.subcategory_title}
                </p>
              </div>

              <div className="flex items-center justify-center flex-col gap-5">
                <p className="text-[28px] font-bold">
                  {subCategoryData?.subcategory_title}
                </p>
              </div>


              <p className="text-[20px] text-center mt-5">
                {subCategoryData?.description}
              </p>



              <div className="container max-w-7xl mx-auto w-11/12 flex items-start gap-10 mt-20">


                <div style={openFilter === true && isMobile === true ? { transform: "translate(-50% , 0)" } : openFilter === false && isMobile === true ? { transform: "translateY(100%)" } : {}} className={styles.mobileFilter + " w-1/4 border-2 border-[#E1E1E1] rounded-lg max-md:fixed max-md:w-full max-md:bottom-0 max-md:z-20 max-md:bg-white max-md:duration-300 max-md:left-[50%] max-md:border-none max-md:rounded-bl-[0px] max-md:rounded-br-[0px]"}>

                  <div className="hidden max-md:flex justify-end m-3">
                    <span onClick={() => setOpenFilter(false)}>
                      X
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-4">
                    {filter?.gender === "women" ? <button className="text-[#27BDBE] font-bold" onClick={() => handleGenderChange("women")}>WOMEN</button> : <button onClick={() => handleGenderChange("women")}>WOMEN</button>}

                    {filter?.gender === "men" ? <button className="text-[#27BDBE] font-bold" onClick={() => handleGenderChange("men")}>MEN</button> : <button onClick={() => handleGenderChange("men")}>MEN</button>}

                  </div>


                  <div className="p-4 flex flex-col gap-3 border-t border-t-[#EAEAEA]">
                    <p className="text-[14px] font-bold">
                      SIZE
                    </p>
                    <div className="grid grid-cols-4 gap-1 mx-auto" style={{ width: 'max-content' }}>

                      {sizeList?.includes("XS") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("XS")}>
                          <p className="text-[14px]">
                            XS
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("XS")}>
                          <p className="text-[14px]">
                            XS
                          </p>
                        </div>
                      }


                      {sizeList?.includes("S") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("S")}>
                          <p className="text-[14px]">
                            S
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("S")}>
                          <p className="text-[14px]">
                            S
                          </p>
                        </div>
                      }

                      {sizeList?.includes("M") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("M")}>
                          <p className="text-[14px]">
                            M
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("M")}>
                          <p className="text-[14px]">
                            M
                          </p>
                        </div>
                      }

                      {sizeList?.includes("L") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("L")}>
                          <p className="text-[14px]">
                            L
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("L")}>
                          <p className="text-[14px]">
                            L
                          </p>
                        </div>
                      }



                      {sizeList?.includes("XL") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("XL")}>
                          <p className="text-[14px]">
                            XL
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("XL")}>
                          <p className="text-[14px]">
                            XL
                          </p>
                        </div>
                      }

                      {sizeList?.includes("2XL") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("2XL")}>
                          <p className="text-[14px]">
                            2XL
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("2XL")}>
                          <p className="text-[14px]">
                            2XL
                          </p>
                        </div>
                      }

                      {sizeList?.includes("3XL") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("3XL")}>
                          <p className="text-[14px]">
                            3XL
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("3XL")}>
                          <p className="text-[14px]">
                            3XL
                          </p>
                        </div>
                      }

                      {sizeList?.includes("4XL") ?
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center bg-black text-white" onClick={() => handleSizeChange("4XL")}>
                          <p className="text-[14px]">
                            4XL
                          </p>
                        </div> :
                        <div className="w-[45px] h-[25px] border border-[#A4A4A4] cursor-pointer rounded-[1.7px] flex items-center justify-center" onClick={() => handleSizeChange("4XL")}>
                          <p className="text-[14px]">
                            4XL
                          </p>
                        </div>
                      }
                    </div>
                  </div>


                  <div className="p-4 flex flex-col gap-3 border-t border-t-[#EAEAEA]">
                    <div className="flex items-center justify-between w-9/12 mr-auto">
                      <p className="text-[14px] font-bold">
                        AVAIBLE
                      </p>
                      <label class="switch">
                        <input type="checkbox" checked={filter.available === "true"} onChange={handleAvaibleBoxChange} />
                        <span class="slider round" />
                      </label>
                    </div>
                    {/* <div className="flex items-center justify-between w-9/12 mr-auto">
              <p className="text-[14px] font-bold">
                SALE
              </p>
              <label class="switch">
                <input type="checkbox" checked={filter.sale === "1"} onChange={handleSuggestkboxChange} />
                <span class="slider round" />
              </label>
            </div> */}
                  </div>

                  <div className="p-4 flex flex-col gap-3 border-t border-t-[#EAEAEA]">
                    <p className="text-[14px] font-bold">
                      COLOR
                    </p>
                    <div className="flex flex-col gap-2">

                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleColorChange("Skin")}>
                        {colorList?.includes("Skin") ? <div className="w-[15px] h-[15px] border border-black bg-[#27BDBE]" /> : <div className="w-[15px] h-[15px] border border-black" />}
                        <div className="bg-[#fde1bf] h-[25px] w-[25px] rounded-full"></div>
                        <p className="text-[10px] text-[#888888]">
                          Skin
                        </p>
                      </div>

                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleColorChange("Fuchsia")}>
                        {colorList?.includes("Fuchsia") ? <div className="w-[15px] h-[15px] border border-black bg-[#27BDBE]" /> : <div className="w-[15px] h-[15px] border border-black" />}
                        <div className="bg-[#fd3f92] h-[25px] w-[25px] rounded-full"></div>
                        <p className="text-[10px] text-[#888888]">
                          Fuchsia
                        </p>
                      </div>

                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleColorChange("White")}>
                        {colorList?.includes("White") ? <div className="w-[15px] h-[15px] border border-black bg-[#27BDBE]" /> : <div className="w-[15px] h-[15px] border border-black" />}
                        <div className="bg-[#f7f7f7] h-[25px] w-[25px] border border-black rounded-full"></div>
                        <p className="text-[10px] text-[#888888]">
                          White
                        </p>
                      </div>

                      <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleColorChange("Black")}>
                        {colorList?.includes("Black") ? <div className="w-[15px] h-[15px] border border-black bg-[#27BDBE]" /> : <div className="w-[15px] h-[15px] border border-black" />}
                        <div className="bg-[#000000] h-[25px] w-[25px] rounded-full"></div>
                        <p className="text-[10px] text-[#888888]">
                          Black
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-center underline mb-4 cursor-pointer mt-3" onClick={handleResetFilters}>
                      Reset all filters
                    </p>
                  </div>
                </div>


                <div className="w-3/4 max-md:w-full">
                  <div className="mb-6 justify-end hidden max-md:flex">
                    <div className="flex items-center gap-2 flex-row-reverse border border-[#717171] py-[1px] px-2 rounded-[10px]" onClick={() => setOpenFilter(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M6.30208 3.20833H1.71875M6.30208 3.20833C6.30208 2.38534 6.96867 1.71875 7.79167 1.71875C8.61466 1.71875 9.28125 2.38534 9.28125 3.20833C9.28125 4.03133 8.61466 4.69792 7.79167 4.69792C6.96867 4.69792 6.30208 4.03133 6.30208 3.20833ZM9.28125 7.79167H5.61458M5.61458 7.79167C5.61458 8.61466 4.948 9.28125 4.125 9.28125C3.30201 9.28125 2.63542 8.61466 2.63542 7.79167M5.61458 7.79167C5.61458 6.96867 4.948 6.30208 4.125 6.30208C3.30201 6.30208 2.63542 6.96867 2.63542 7.79167M2.63542 7.79167H1.71875" stroke="#3F3F3F" stroke-width="0.625" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p className="text-xs min-md:text-xl">
                        Filter
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
                      {products?.map((item) => (
                        <ProductItem alt={item?.cover_image_alt} percentDiscount={item?.percent_discount} offPrice={item?.off_price} name={item?.name_product} title={item?.product} image={item?.cover_image} price={item?.price} slug={item?.slug} fav={item?.fav} id={item?.id} onReload={handleReload} />
                      ))}
                    </div>
                    <div className={styles.pagination + " flex container w-11/12 gap-4 justify-center items-center mb-20 mx-auto mt-10"}>
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
                            <path d="M5.19873 10.8292L8.51421 7.51372L5.19873 4.19824" stroke="#25282B" stroke-width="1.10516" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

    )
}


export default SubCategory;