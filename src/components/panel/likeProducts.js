import { getAllUserFavorites } from "@/api/user";
import { useEffect, useState } from "react";

const LikeProducts = () => {

    const [favorites , setFavorites] = useState(null);

    // get all user favorites
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllUserFavorites();
                setFavorites(data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    console.log(favorites)

        


    return(
        <div className="container max-w-7xl w-11/12 mx-auto">
            <div className="items grid grid-cols-4 gap-5">
                
            </div>
        </div>
    )
}

export default LikeProducts;