import { domain, image_url } from "@/api/domain";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { getCookie } from "@/api/auth";
import axios from "axios";

const ProductItem = ({image , title , price , slug , fav , id , onReload , name , offPrice , percentDiscount , alt}) => {

    const { isLoggedIn } = useAuth();
    const token = getCookie('token');




    const handleAddToFav = (e) => {
        e.preventDefault();


        axios.post(domain + 'product/fav/', {product: id, fav: true} , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                toast.success("added to favorite")
                onReload();
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
            .finally(() => {
                console.log("final");
            });
    }


    const handleRemoveFromFav = (e) => {
        e.preventDefault();


        axios.delete(domain + 'product/fav/' + id + "/" , {
            headers : {
                'Authorization' : 'Bearer ' + token,
            }
        })
            .then((response) => {
                toast.success("deleted from favorite")
                onReload();
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
            .finally(() => {
                console.log("final");
            });
    }


    console.log(alt)



    return(
        <div className="relative">
            <Link href={"/shop/" + slug }>
                <div className="w-full overflow-hidden max-h-[300px]">
                    <img className="object-cover w-full h-full hover:scale-125 duration-300" src={image_url + image} alt={alt} />
                </div>
                <div className="mt-2">
                    <p className="text-[10px]">
                        {title}
                    </p>
                    <p className="text-[11px]">
                        {name}
                    </p>
                    {percentDiscount === 0 || percentDiscount === "0" || percentDiscount === null || percentDiscount === undefined ?
                        <p className="text-[14px] text-[#27BDBE] mt-1 font-bold">
                            {price} AED
                        </p> : 
                        <div className="flex items-center gap-1">
                            <p className="text-[14px] text-black mt-1 font-bold line-through">
                                {price} AED
                            </p>
                            <p className="text-[14px] text-[#27BDBE] mt-1 font-bold">
                                {offPrice} AED
                            </p>
                        </div>
                    }

                </div>
            </Link>
            {isLoggedIn === true ?
                <>
                    {fav === false ? 
                        <svg className="absolute top-2 right-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 22 22" fill="none" onClick={handleAddToFav}>
                            <path d="M11.1883 5.13026C16.8949 -0.67221 26.6775 10.1038 11.1884 18.8067C-4.30077 10.1039 5.4818 -0.672211 11.1883 5.13026Z" stroke="black" stroke-width="1.3516" stroke-linejoin="round" />
                        </svg> : 
                        fav === true ?
                        <svg className="absolute top-2 right-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 22 22" fill="#EB0E23" onClick={handleRemoveFromFav}>
                            <path d="M11.1883 5.13026C16.8949 -0.67221 26.6775 10.1038 11.1884 18.8067C-4.30077 10.1039 5.4818 -0.672211 11.1883 5.13026Z" stroke="#EB0E23" stroke-width="1.3516" stroke-linejoin="round" />
                        </svg> : ""
                    }
                </>
                : ""
            }
        </div>

    )
}

export default ProductItem;