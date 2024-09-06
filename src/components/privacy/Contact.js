import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styles from "./styles.module.scss";
import { BluePrimaryButton } from '../button';
import { useAuth } from '../../context/authContext';
import { getCookie } from '../../api/auth';
import axios from 'axios';
import { domain } from '../../api/domain';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const libraries = ['places'];
const mapContainerStyle = {
  width: '60%',
  height: '500px',
  margin: "0 auto",
  borderRadius: "20px",
};
const center = {
  lat: 25.188872893087318, // default latitude
  lng: 55.26969257020473, // default longitude
};

const Contact = () => {


  const router = useRouter();
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);
  const token = getCookie("token")
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      message: "",
  });





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {

    setLoading(true)
    e.preventDefault();

    // if (isLoggedIn == true){
      axios.post(domain + 'api/home/contact_submit/', formData)
      .then((response) => {
          setError(response.data);
          if(response?.data?.message == "Done"){
            toast.success("your message has been recieved")
          }
          setLoading(false)
          if(response?.data?.message == "successfully submitted"){
            toast.success(response?.data?.message)
          }
      })
      .catch((error) => {
          setError(error.response.data);
          setLoading(false)
      })
      .finally(() => {
          console.log("final");
          setLoading(false)
      });
    // }
    // else{
    //   navigate("/login")
    // }
  };



  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyClTLjoaN8ZAh6sTmKpGmvXmexkSEVDHG0',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }


  return (
    <div className={styles.contact + " mt-20"}>
      <div className={styles.contactwrapper + " container w-11/12 max-w-5xl mx-auto flex max-md:flex-col justify-between items-start gap-10 mb-10"}>
        <div className={styles.contact__desc + " w-1/2 max-md:w-full flex flex-col gap-8"}>
          <p>Contact</p>
          <div className={styles.item + " w-full flex items-center gap-5"}>
            <div className='flex items-center gap-2 w-3/12'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 31 31" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5862 17.8324C22.6564 16.4974 23.2948 14.8077 23.2948 12.9618C23.2948 8.65674 19.8049 5.16683 15.4998 5.16683C11.1948 5.16683 7.70492 8.65674 7.70492 12.9618C7.70492 14.8075 8.3432 16.4971 9.41318 17.832L9.42088 17.8416C9.64741 18.1238 9.85714 18.421 10.075 18.7099C10.4535 19.2116 10.9871 19.9162 11.6072 20.7265C12.7626 22.2366 14.206 24.0982 15.5008 25.6964C16.7996 24.0947 18.2463 22.2303 19.404 20.7182C20.0251 19.907 20.5596 19.2017 20.9386 18.6995C21.1554 18.4123 21.3611 18.1131 21.5862 17.8324ZM23.6056 19.4512C23.6056 19.4512 23.6034 19.4541 23.6019 19.4562C23.5357 19.5447 22.9283 20.3562 22.0481 21.5121C20.7424 23.2268 18.8364 25.6993 17.2068 27.6926C16.3153 28.783 14.6847 28.7825 13.7938 27.6917C11.0085 24.2815 7.40623 19.4586 7.40623 19.4586L7.39783 19.4482C5.97353 17.6714 5.12158 15.4161 5.12158 12.9618C5.12158 7.23 9.76809 2.5835 15.4998 2.5835C21.2316 2.5835 25.8781 7.23 25.8781 12.9618C25.8781 14.4888 25.5483 15.9389 24.956 17.2445C24.5977 18.0344 24.1434 18.7714 23.6079 19.4407L23.6041 19.4454L23.6019 19.4482H23.6079L23.6056 19.4512Z" fill="#35383F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 14.2082C16.2134 14.2082 16.7917 13.6299 16.7917 12.9165C16.7917 12.2031 16.2134 11.6248 15.5 11.6248C14.7866 11.6248 14.2083 12.2031 14.2083 12.9165C14.2083 13.6299 14.7866 14.2082 15.5 14.2082ZM19.375 12.9165C19.375 15.0566 17.6401 16.7915 15.5 16.7915C13.3599 16.7915 11.625 15.0566 11.625 12.9165C11.625 10.7764 13.3599 9.0415 15.5 9.0415C17.6401 9.0415 19.375 10.7764 19.375 12.9165Z" fill="#35383F"/>
              </svg>
              <p>Address</p>
            </div>
            <div>
              <p className='text-xs'>
                610 Clover Bay Tower, Business Bay 
              </p>
              <p className='text-xs'>
                Dubai, United Arab Emirates
              </p>
            </div>
          </div>
          <div className={styles.item + " w-full flex items-center gap-5"}>
            <div className='flex items-center gap-2 w-3/12'>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 23 23" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4998 3.83317C7.26565 3.83317 3.83317 7.26565 3.83317 11.4998C3.83317 15.734 7.26565 19.1665 11.4998 19.1665C12.7255 19.1665 13.8815 18.8796 14.9067 18.3701C15.3807 18.1346 15.9558 18.3278 16.1914 18.8018C16.4269 19.2758 16.2336 19.851 15.7597 20.0865C14.4754 20.7247 13.0281 21.0832 11.4998 21.0832C6.20711 21.0832 1.9165 16.7926 1.9165 11.4998C1.9165 6.20711 6.20711 1.9165 11.4998 1.9165C16.7926 1.9165 21.0832 6.20711 21.0832 11.4998V12.4582C21.0832 13.8085 20.7452 14.8878 20.1124 15.6472C19.47 16.418 18.5946 16.7707 17.729 16.7707C16.5532 16.7707 15.3642 16.1084 14.7678 15.0042C13.9118 15.8028 12.7629 16.2915 11.4998 16.2915C8.85347 16.2915 6.70817 14.1462 6.70817 11.4998C6.70817 8.85347 8.85347 6.70817 11.4998 6.70817C12.5785 6.70817 13.574 7.06462 14.3748 7.66615C14.375 7.13704 14.804 6.70817 15.3332 6.70817C15.8624 6.70817 16.2915 7.13723 16.2915 7.6665V11.4998V13.4165C16.2915 14.2635 16.997 14.854 17.729 14.854C18.0613 14.854 18.3838 14.7275 18.6399 14.4202C18.9055 14.1015 19.1665 13.5037 19.1665 12.4582V11.4998C19.1665 7.26565 15.734 3.83317 11.4998 3.83317ZM14.3748 11.4998C14.3748 9.91202 13.0877 8.62484 11.4998 8.62484C9.91202 8.62484 8.62484 9.91202 8.62484 11.4998C8.62484 13.0877 9.91202 14.3748 11.4998 14.3748C13.0877 14.3748 14.3748 13.0877 14.3748 11.4998Z" fill="#35383F"/>
              </svg>
              <p>Email</p>
            </div>
            <div>
              <p className='text-xs'>
                info@healfit.ae              
              </p>
            </div>
          </div>
          <div className={styles.item + " w-full flex items-center gap-5"}>
            <div className='flex items-center gap-2 w-3/12'>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 21 21" fill="none">
                <g clip-path="url(#clip0_363_1119)">
                  <path d="M19.2498 14.8051V17.4301C19.2507 17.6738 19.2008 17.915 19.1032 18.1383C19.0056 18.3615 18.8624 18.562 18.6828 18.7267C18.5033 18.8915 18.2913 19.0169 18.0604 19.095C17.8296 19.173 17.585 19.202 17.3423 19.1801C14.6497 18.8875 12.0634 17.9675 9.79101 16.4938C7.67686 15.1504 5.88443 13.358 4.54101 11.2438C3.06224 8.96114 2.14197 6.3622 1.85476 3.65758C1.83289 3.41562 1.86165 3.17175 1.9392 2.94151C2.01674 2.71126 2.14138 2.49969 2.30518 2.32025C2.46897 2.14082 2.66834 1.99746 2.89058 1.89929C3.11281 1.80113 3.35306 1.75031 3.59601 1.75008H6.22101C6.64565 1.74591 7.05733 1.89628 7.3793 2.17318C7.70127 2.45007 7.91158 2.8346 7.97101 3.25508C8.0818 4.09514 8.28728 4.91997 8.58351 5.71383C8.70123 6.02702 8.72671 6.36738 8.65693 6.6946C8.58714 7.02182 8.42501 7.32218 8.18976 7.56008L7.07851 8.67133C8.32412 10.8619 10.1379 12.6757 12.3285 13.9213L13.4398 12.8101C13.6777 12.5748 13.978 12.4127 14.3052 12.3429C14.6325 12.2731 14.9728 12.2986 15.286 12.4163C16.0799 12.7126 16.9047 12.918 17.7448 13.0288C18.1698 13.0888 18.558 13.3029 18.8355 13.6304C19.113 13.9579 19.2604 14.376 19.2498 14.8051Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_363_1119">
                    <rect width="21" height="21" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <p>Phone</p>
            </div>
            <div>
              <p className='text-xs'>
                +971 44495097
                
              </p>
            </div>
          </div>
          <div className={styles.item + " w-full flex items-center gap-5"}>
            <div className='flex items-center gap-2 w-3/12'>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 22 22" fill="none">
                <g clip-path="url(#clip0_363_1144)">
                  <path d="M19.14 12.4024C18.5808 15.8307 16.0233 18.4524 12.6225 19.0941C10.7525 19.4516 8.9833 19.1674 7.45247 18.4524C7.1958 18.3241 6.79245 18.2782 6.51745 18.3332C5.94912 18.4707 4.97747 18.7091 4.16164 18.8924C3.3733 19.0849 2.88746 18.5991 3.08913 17.8199L3.64831 15.4732C3.71247 15.1982 3.6483 14.7857 3.52914 14.5291C2.83247 13.0716 2.55747 11.3757 2.84164 9.5974C3.39164 6.1874 6.15997 3.41906 9.57914 2.85072C15.2258 1.94322 20.0383 6.74656 19.1125 12.3932L19.14 12.4024Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.93772 7.78247C8.69939 7.78247 8.47021 7.88332 8.26855 8.08499C8.09438 8.24999 7.97522 8.42415 7.90189 8.62582C7.82855 8.81832 7.78271 9.02914 7.78271 9.24914C7.78271 9.58831 7.85605 9.93664 8.01188 10.3033C8.16771 10.67 8.37855 11.0366 8.64438 11.4033C8.91022 11.77 9.21273 12.1183 9.54273 12.4575C9.88189 12.7875 10.2302 13.09 10.5969 13.3558C10.9636 13.6217 11.3394 13.8325 11.706 13.9975C12.0727 14.1625 12.4302 14.2358 12.7602 14.2358C12.9894 14.2358 13.191 14.19 13.3927 14.1166C13.5852 14.0341 13.7594 13.915 13.9244 13.7408C14.0161 13.64 14.0894 13.53 14.1444 13.4108C14.1994 13.2917 14.2269 13.1725 14.2269 13.0625C14.2269 12.9708 14.2085 12.8883 14.1719 12.815C14.1352 12.7325 14.0802 12.6683 13.9977 12.6133L12.9344 11.8525C12.8519 11.7975 12.7785 11.7517 12.7052 11.7242C12.6319 11.6967 12.5677 11.6783 12.5127 11.6783C12.4302 11.6783 12.3569 11.6966 12.2836 11.7425C12.2102 11.7791 12.1277 11.8433 12.0544 11.9258L11.8069 12.1641C11.8069 12.1641 11.7335 12.2191 11.6785 12.2191C11.651 12.2191 11.6236 12.2192 11.5961 12.21C11.5777 12.2008 11.5502 12.1917 11.5411 12.1825C11.4311 12.1275 11.2936 12.0266 11.1286 11.8891C10.9544 11.7425 10.7894 11.5867 10.6152 11.4125C10.4502 11.2383 10.2944 11.0733 10.1477 10.8992C10.0102 10.7342 9.90938 10.5966 9.84521 10.4866C9.84521 10.4683 9.82688 10.45 9.81772 10.4225C9.81772 10.395 9.80857 10.3767 9.80857 10.3492C9.80857 10.2942 9.8269 10.2575 9.86357 10.2208L10.1111 9.96414C10.1844 9.89081 10.2486 9.80831 10.2944 9.73498C10.3402 9.66164 10.3585 9.57914 10.3585 9.50581C10.3585 9.44164 10.3402 9.37748 10.3127 9.31332C10.2852 9.23998 10.2394 9.16665 10.1844 9.08415L9.43273 8.02999C9.37773 7.94749 9.30438 7.89248 9.21271 7.84664C9.13021 7.80998 9.03855 7.79165 8.95605 7.79165L8.93772 7.78247Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_363_1144">
                    <rect width="22" height="22" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <p>WhatsApp</p>
            </div>
            <div>
              <p className='text-xs'>
                +971 52 9745838
              </p>
            </div>
          </div>
          <div className={styles.social + " flex gap-2 items-center"}>
            <a target="_blank" href="https://www.instagram.com/revee.uae">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_16_178)">
                  <path d="M14.7293 2.65242C18.6648 2.65242 19.1308 2.66968 20.6785 2.73873C22.1169 2.80202 22.8937 3.04367 23.4115 3.24505C24.0962 3.50971 24.591 3.83191 25.1031 4.34399C25.6209 4.86181 25.9373 5.35087 26.202 6.03555C26.4034 6.55338 26.645 7.33587 26.7083 8.76852C26.7774 10.322 26.7946 10.788 26.7946 14.7178C26.7946 18.6533 26.7774 19.1193 26.7083 20.667C26.645 22.1054 26.4034 22.8822 26.202 23.4C25.9373 24.0847 25.6151 24.5795 25.1031 25.0916C24.5852 25.6094 24.0962 25.9258 23.4115 26.1905C22.8937 26.3919 22.1112 26.6335 20.6785 26.6968C19.1251 26.7659 18.659 26.7831 14.7293 26.7831C10.7938 26.7831 10.3278 26.7659 8.78003 26.6968C7.34163 26.6335 6.56489 26.3919 6.04706 26.1905C5.36238 25.9258 4.86757 25.6036 4.35549 25.0916C3.83767 24.5737 3.52122 24.0847 3.25655 23.4C3.05518 22.8822 2.81352 22.0997 2.75023 20.667C2.68119 19.1135 2.66393 18.6475 2.66393 14.7178C2.66393 10.7823 2.68119 10.3163 2.75023 8.76852C2.81352 7.33012 3.05518 6.55338 3.25655 6.03555C3.52122 5.35087 3.84342 4.85606 4.35549 4.34399C4.87332 3.82616 5.36238 3.50971 6.04706 3.24505C6.56489 3.04367 7.34738 2.80202 8.78003 2.73873C10.3278 2.66968 10.7938 2.65242 14.7293 2.65242ZM14.7293 0C10.7305 0 10.2299 0.0172609 8.65921 0.0863044C7.09422 0.155348 6.01829 0.408507 5.08621 0.770986C4.11384 1.15073 3.29107 1.65129 2.47406 2.47406C1.65129 3.29107 1.15073 4.11384 0.770986 5.08045C0.408507 6.01829 0.155348 7.08847 0.0863044 8.65345C0.0172609 10.2299 0 10.7305 0 14.7293C0 18.7281 0.0172609 19.2286 0.0863044 20.7994C0.155348 22.3643 0.408507 23.4403 0.770986 24.3724C1.15073 25.3447 1.65129 26.1675 2.47406 26.9845C3.29107 27.8015 4.11384 28.3078 5.08045 28.6818C6.01829 29.0443 7.08847 29.2975 8.65345 29.3665C10.2242 29.4355 10.7248 29.4528 14.7235 29.4528C18.7223 29.4528 19.2229 29.4355 20.7936 29.3665C22.3586 29.2975 23.4345 29.0443 24.3666 28.6818C25.3332 28.3078 26.156 27.8015 26.973 26.9845C27.79 26.1675 28.2963 25.3447 28.6703 24.3781C29.0328 23.4403 29.286 22.3701 29.355 20.8051C29.424 19.2344 29.4413 18.7338 29.4413 14.735C29.4413 10.7363 29.424 10.2357 29.355 8.66496C29.286 7.09997 29.0328 6.02405 28.6703 5.09196C28.3078 4.11384 27.8073 3.29107 26.9845 2.47406C26.1675 1.65704 25.3447 1.15073 24.3781 0.776739C23.4403 0.414261 22.3701 0.161102 20.8051 0.092058C19.2286 0.0172609 18.7281 0 14.7293 0Z" fill="black" />
                  <path d="M14.7293 7.16327C10.5522 7.16327 7.16333 10.5522 7.16333 14.7293C7.16333 18.9064 10.5522 22.2953 14.7293 22.2953C18.9065 22.2953 22.2954 18.9064 22.2954 14.7293C22.2954 10.5522 18.9065 7.16327 14.7293 7.16327ZM14.7293 19.6371C12.0194 19.6371 9.82151 17.4392 9.82151 14.7293C9.82151 12.0193 12.0194 9.82144 14.7293 9.82144C17.4393 9.82144 19.6372 12.0193 19.6372 14.7293C19.6372 17.4392 17.4393 19.6371 14.7293 19.6371Z" fill="black" />
                  <path d="M24.3608 6.86402C24.3608 7.84214 23.5669 8.63039 22.5945 8.63039C21.6164 8.63039 20.8281 7.83639 20.8281 6.86402C20.8281 5.8859 21.6221 5.09766 22.5945 5.09766C23.5669 5.09766 24.3608 5.89166 24.3608 6.86402Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_16_178">
                    <rect width="29.4586" height="29.4586" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/healfit-ae/">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.7421 0H2.63898C1.43647 0 0.464111 0.949348 0.464111 2.12309V27.3297C0.464111 28.5035 1.43647 29.4586 2.63898 29.4586H27.7421C28.9446 29.4586 29.9227 28.5035 29.9227 27.3355V2.12309C29.9227 0.949348 28.9446 0 27.7421 0ZM9.20387 25.1031H4.83111V11.0412H9.20387V25.1031ZM7.01749 9.12525C5.61361 9.12525 4.48014 7.99179 4.48014 6.59365C4.48014 5.19552 5.61361 4.06206 7.01749 4.06206C8.41562 4.06206 9.54909 5.19552 9.54909 6.59365C9.54909 7.98603 8.41562 9.12525 7.01749 9.12525ZM25.5672 25.1031H21.2002V18.2678C21.2002 16.6395 21.1714 14.5394 18.9275 14.5394C16.6548 14.5394 16.3096 16.3173 16.3096 18.1527V25.1031H11.9483V11.0412H16.137V12.9629H16.1945C16.7756 11.8582 18.2025 10.6902 20.3256 10.6902C24.7502 10.6902 25.5672 13.6016 25.5672 17.3875V25.1031V25.1031Z" fill="black" />
              </svg>
            </a>
          </div>
        </div>


        <div className={styles.form + " w-1/2 max-md:w-full"}>
          <p className='text-xs mb-5'>
            To get in touch with us, kindly provide your details in the spaces provided below.
          </p>
          <form className='w-full flex flex-col gap-5'>
            <div className={styles.formgroup + " w-full"}>
              {error?.first_name ? 
                <input 
                  className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="First Name" 
                  name='first_name'
                  value={formData.first_name}
                  onChange={handleChange}
                /> : 
                <input 
                  className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="First Name" 
                  name='first_name'
                  value={formData.first_name}
                  onChange={handleChange}
                />
              }
              {error?.first_name && <p className="text-xs text-[#ff0000] mt-1">{error?.first_name}</p>}
            </div>
            <div className={styles.formgroup + " w-full"}>
              {error?.last_name ? 
                <input 
                  className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="Last Name" 
                  name='last_name'
                  value={formData.last_name}
                  onChange={handleChange}
                /> : 
                <input 
                  className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="Last Name" 
                  name='last_name'
                  value={formData.last_name}
                  onChange={handleChange}
                />
              }
              {error?.last_name && <p className="text-xs text-[#ff0000] mt-1">{error?.last_name}</p>}
            </div>
            <div className={styles.formgroup + " w-full"}>
              {error?.email ? 
                <input 
                  className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="Email" 
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                /> : 
                <input 
                  className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="Email" 
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              }
              {error?.email && <p className="text-xs text-[#ff0000] mt-1">{error?.email}</p>}
            </div>
            <div className={styles.formgroup + " w-full"}>
              {error?.mobile ? 
                <input 
                  className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="Mobile" 
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleChange}
                /> : 
                <input 
                  className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  type="text" 
                  placeholder="Mobile" 
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleChange}
                />
              }
              {error?.mobile && <p className="text-xs text-[#ff0000] mt-1">{error?.mobile}</p>}
            </div>
            <div className={styles.formgroup + " w-full"}>
              {error?.message && error?.message != "successfully submitted" ?
                <textarea 
                  className="redinput placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  rows={10} 
                  placeholder="Message" 
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                /> : 
                <textarea 
                  className="placeholder-opacity-25 w-full py-4 px-5 text-xs tracking-widest" 
                  rows={10} 
                  placeholder="Message" 
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                />
              }
              {error?.message && error?.message != "successfully submitted" ? <p className="text-xs text-[#ff0000] mt-1">{error?.message}</p> : ""}
            </div>
            <div className={styles.button} onClick={handleSubmit}>
              {loading == true? 
                <BluePrimaryButton>                                
                  <svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="transparent" stroke-dasharray="31.42 31.42" stroke-dashoffset="10"></circle>
                  </svg>
                  Processing...
                </BluePrimaryButton>
                  :
                <BluePrimaryButton>
                  SUBMIT
                </BluePrimaryButton>
              }
            </div>
          </form>
        </div>
      </div>
      <div className='max-md:w-full overflow-hidden mx-auto mb-20 rounded-lg mt-20'>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Contact;