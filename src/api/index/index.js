import React from "react";
import axios from "axios";
import { domain } from "../domain";


export const getAllBannerSliders = async () => {
    try {
        const response = await axios.get(domain + 'home/image_slider/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getLogoData = async () => {
    try {
        const response = await axios.get(domain + 'home/logo/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};





export const getAllGenders = async () => {
    try {
        const response = await axios.get(domain + 'product/gender_home/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getAllHomeBannerSliders = async () => {
    try {
        const response = await axios.get(domain + "api/" + 'home/banner_slider');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllTestimonial = async () => {
    try {
        const response = await axios.get(domain + 'home/comment/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getHomeVideo = async () => {
    try {
        const response = await axios.get(domain + 'home/video/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getHomeAboutData = async () => {
    try {
        const response = await axios.get(domain + 'home/content/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getHomeSeoFields = async () => {
    try {
        const response = await axios.get(domain + 'home/seo/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};