import React from "react";
import styles from "./styles.module.scss";
import { domain } from "../../api/domain";


const Banner = ({src}) => {
    return(
        <div className={styles.banner + " w-full overflow-hidden"}>
            <img className="object-cover width-max" src={domain + src?.substring(1)} alt="image" />
        </div>
    )
}

export default Banner;