import React from "react";
import axios from "axios";
import { domain } from "../domain";
import { getCookie } from "../auth";
import { useAuth } from "@/context/authContext";


export const getAllProducts = async (page , perPage , filter) => {

    const token = getCookie('token');



    if(token){
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&" + filter, {
                headers : {
                    'Authorization' : 'Bearer ' + token,
                }
            });
            
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }else{
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&" + filter);
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

};


export const getAllGenderProducts = async (page , perPage , filter , gender) => {


    const token = getCookie('token');



    if(token){
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&gender=" + gender + "&" + filter, {
                headers : {
                    'Authorization' : 'Bearer ' + token,
                }
            });
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }else{
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&gender=" + gender + "&" + filter);
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

};

export const getAllCategoryProduct = async (page , perPage , filter , category) => {

    const token = getCookie('token');


    if(token){
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&category=" + category + "&" + filter, {
                headers : {
                    'Authorization' : 'Bearer ' + token,
                }
            });
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }else{
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&category=" + category + "&" + filter);
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

};


export const getAllSubCategoryProduct = async (page , perPage , filter , subcategory) => {
    
    const token = getCookie('token');

    if(token){
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&subcategory=" + subcategory + "&" + filter, {
                headers : {
                    'Authorization' : 'Bearer ' + token,
                }
            });
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }else{
        try {
            const response = await axios.get(domain + 'product/all/?limit=' + perPage +'&page_number=' + page + "&subcategory=" + subcategory + "&" + filter);
            
    
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

};





export const getAllShopList = async (slug , pageNumber) => {
    try {
        const response = await axios.get(domain + "api/" + 'product/list?' + "slug=" + slug + "&page_number=" + pageNumber);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllShopBanners = async () => {
    try {
        const response = await axios.get(domain + 'home/banner_shop');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getShowSingleShop = async (slug) => {
    try {
        const response = await axios.get(domain + "product/items/" + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getColorOfEachSize = async (slug , size) => {
    try {
        const response = await axios.get(domain + 'product/color_size?' + "slug=" + slug + "&size=" + size);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getPopularProducts = async () => {
    try {
        const response = await axios.get(domain + 'product/popular_product/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};




export const getPriceOfEachSizeAndColor = async (product , color , size) => {
    try {
        const response = await axios.get(domain + 'product/variant?product=' + product + "&size=" + size + "&color=" + color);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllProductImages = async (product , color) => {
    try {
        const response = await axios.get(domain + 'product/colorimage?color=' + color + "&product=" + product);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllAvaibleSizes = async (product , color) => {
    try {
        const response = await axios.get(domain + 'product/sizeofcolor?product=' + product + "&color=" + color);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};