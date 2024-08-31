import React from "react";
import axios from "axios";
import { domain } from "../domain";


export const getAllCategories = async () => {
    try {
        const response = await axios.get(domain + 'product/categories');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getCategoryById = async (slug) => {
    try {
        const response = await axios.get(domain + 'product/category/' + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getAllSubCategories = async (slug) => {
    try {
        const response = await axios.get(domain + 'product/category/subcategories/' + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getSubCategoryById = async (slug) => {
    try {
        const response = await axios.get(domain + 'product/subcategory/' + slug);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};