import { getAllUserFavorites } from "@/api/user";
import { useEffect, useState } from "react";
import ProductItem from "../index/productItem";

const LikeProducts = () => {


    const [reload , setReload] = useState(1);
    const [favorites , setFavorites] = useState(null);


    const handleReload = () => {
        setReload(reload + 1)
    }
  

    // get all user favorites
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUserFavorites();
                setFavorites(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


        


    return(
        <div className="container max-w-5xl w-11/12 mx-auto">
            <div className="items grid grid-cols-4 gap-5 max-md:grid-cols-2">
                {favorites?.map((item) => (
                    <ProductItem alt={item?.user_fav?.cover_image_alt} percentDiscount={item?.user_fav?.percent_discount} offPrice={item?.user_fav?.off_price} name={item?.user_fav?.name_product} title={item?.user_fav?.product} image={item?.user_fav?.cover_image} price={item?.user_fav?.price} slug={item?.user_fav?.slug} fav={item?.user_fav?.fav} id={item?.user_fav?.id} onReload={handleReload} />
                ))}
            </div>
        </div>
    )
}

export default LikeProducts;