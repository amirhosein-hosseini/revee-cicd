import React from "react";
import axios from "axios";
import { domain } from "../domain";



export const getSessionId = async () => {
    try {
        const response = await axios.get(domain + "api/" + 'home/session_id');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};




export const getCartProducts = async () => {
    try {
        const response = await axios.get(domain + "api/" + 'product/cart/');
        

        if (response.status === 200) {
            return response;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

