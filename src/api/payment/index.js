import React from "react";
import axios from "axios";
import { domain } from "../domain";
import { getCookie } from "../auth";


export const getSuccessPay = async () => {

    const token = getCookie("token");
  
  
  
    try {
      const response = await axios.get(domain + 'order/authorised/',{
        headers:{
          'Authorization' : 'Bearer ' + token,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
};


export const getCancelPay = async () => {

    const token = getCookie("token");
  
  
  
    try {
      const response = await axios.get(domain + 'order/cancelled/',{
        headers:{
          'Authorization' : 'Bearer ' + token,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
};


export const getUnSuccessPay = async () => {

    const token = getCookie("token");
  
  
  
    try {
      const response = await axios.get(domain + 'order/declined/',{
        headers:{
          'Authorization' : 'Bearer ' + token,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
};