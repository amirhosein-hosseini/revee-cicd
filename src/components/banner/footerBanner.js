// import React, { useEffect, useState } from "react";
// import styles from "./styles.module.scss";
// import { getAllHomeContents } from "../../api/index";
// import { domain } from "../../api/domain";


// const FooterBanner = () => {

//     const [footerBanner , setFooterBanner] = useState(null);



//     // get data for footer banner
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const data = await getAllHomeContents();
//             setFooterBanner(data.data?.home[0]?.footer_image);
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           }
//         };
    
//         fetchData();
//     }, []);



//     return(
//         <div className={styles.banner + " w-full overflow-hidden"}>
//             <img className="object-cover width-max" src={domain + footerBanner?.substring(1)} alt="image" />
//         </div>
//     )
// }

// export default FooterBanner;