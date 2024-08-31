import React from "react";
import axios from "axios";
import { domain } from "../domain";
import { getCookie } from "../auth";


export const getAllAdresses = async () => {

    const token = getCookie("token");
  
  
  
    try {
      const response = await axios.get(domain + 'accounts/address',{
        headers:{
          'Authorization' : 'Bearer ' + token,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
};



export const getAllPersonalInformation = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(domain + 'accounts/info',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const getAllOrderHistory = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(domain + 'order/history/',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllUserFavorites = async () => {

  const token = getCookie("token");



  try {
    const response = await axios.get(domain + 'product/user/fav/',{
      headers:{
        'Authorization' : 'Bearer ' + token,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



