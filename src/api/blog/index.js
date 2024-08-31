import React from "react";
import axios from "axios";
import { domain } from "../domain";


export const getSingleBlogData = async (slug) => {
    try {
        const response = await axios.get(domain + 'blog/item/' + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getAllBlogs = async (limit) => {
    try {
        const response = await axios.get(domain + 'blog/' + "list/?limit=" + limit);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};



export const getAllBlogsRelated = async (cat) => {
    try {
        const response = await axios.get(domain + 'blog/' + "related?category=" + cat +"&limit=3");
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};