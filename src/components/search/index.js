import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ShopItem from "../shop/shopItem";
import { BluePrimaryButton } from "../button";
import { getSearchItems } from "../../api/search";
import { domain } from "../../api/domain";
import ProductItem from "../index/productItem";

const Search = ({slug}) => {


    const [reload , setReload] = useState(1);
    const [searchInput , setSearchInput] = useState("")
    const [items , setItems] = useState(null);
    const [loading , setLoading] = useState(false);


    // Update searchInput state when input value changes
    const handleChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleReload = () => {
        setReload(reload + 1)
    }
  


    

    // get search items
    const handleSearch = () => {
        setLoading(true)
        const fetchData = async () => {
            try {
              const data = await getSearchItems(searchInput);
              setItems(data.data);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching data:", error);
              setLoading(false);
            }
        };
        fetchData();
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getSearchItems(slug);
            setItems(data.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [slug , reload]);


    

    



    return(
        <div className={styles.search + " mb-20"}>
            <div className={styles.search__gradient}></div>
            <div className={styles.searchwrapper + " w-11/12 container mx-auto"}>
                {/* <div className={styles.search__input + " relative flex gap-1 my-10 w-3/4 max-w-3xl mx-auto"}>
                    <input
                        className="w-full px-10 py-1 text-xs bg-[#f1f1f1]" 
                        type="text" 
                        value={searchInput}
                        onChange={handleChange}
                    />
                    <svg className="absolute left-2 top-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 10.6565C18 14.4018 14.866 17.438 11 17.438C7.13401 17.438 4 14.4018 4 10.6565C4 6.91122 7.13401 3.87506 11 3.87506C14.866 3.87506 18 6.91122 18 10.6565ZM18.0319 16.0988C19.2635 14.6072 20 12.7152 20 10.6565C20 5.84114 15.9706 1.9375 11 1.9375C6.02944 1.9375 2 5.84114 2 10.6565C2 15.4719 6.02944 19.3755 11 19.3755C13.125 19.3755 15.078 18.6621 16.6177 17.4689L19.2929 20.0606C19.6834 20.4389 20.3166 20.4389 20.7071 20.0606C21.0976 19.6822 21.0976 19.0688 20.7071 18.6905L18.0319 16.0988Z" fill="black" fillOpacity={0.6}/>
                    </svg>
                    <div className={styles.button} onClick={handleSearch}>
                        {loading == true? 
                            <BluePrimaryButton>                                
                                <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                                </svg>
                                Processing...
                            </BluePrimaryButton>
                                :
                            <BluePrimaryButton>
                                SEARCH
                            </BluePrimaryButton>
                        }
                    </div>
                </div> */}
                <div className={styles.search__items + " max-w-5xl mx-auto grid grid-cols-4 max-md:grid-cols-3 gap-x-10 max-md:gap-x-5 gap-y-10 max-md:gap-y-5"}>
                    {items?.map((item) => (
                        <ProductItem alt={item?.cover_image_alt} percentDiscount={item?.percent_discount} offPrice={item?.off_price} name={item?.name_product} title={item?.product} image={item?.cover_image} price={item?.price} slug={item?.slug} fav={item?.fav} id={item?.id} onReload={handleReload} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;