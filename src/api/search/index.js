import React from "react";
import axios from "axios";
import { domain } from "../domain";


export const getSearchItems = async (name) => {
    try {
        const response = await axios.get(domain  + 'product/search_product/?search=' + name);
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
