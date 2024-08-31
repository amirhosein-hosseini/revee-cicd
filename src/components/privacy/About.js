import React from "react";
import styles from "./styles.module.scss";
import Map from "../map";

const About = () => {
    return(
        <div className={styles.privacy}>
            <div className={styles.privacywrapper + " container mx-auto w-11/12"}>
                <div className={styles.privacy__header + " w-full p-2 mb-5 rounded-lg"}>
                    <p className="font-bold">
                        About
                    </p>
                </div>
                <div className={styles.privacy__desc + " p-4 rounded-lg mb-10"}>
                    <div className="flex-col gap-10">
                        <p>
                            At healfit we are committed to empowering post surgery care and recovery procedures. Our plan is enhancing comfort with high-quality products such as medical compression garments designed to meet the needs of individuals post-surgery and compression therapy mainly used after plastic surgeries such as liposuction, breast augmentation or reconstruction, tummy tuck, facelift, etc.
                        </p>
                        <br/>
                        <p>
                            Founded on the principles of excellence, compassion, and innovation, healfit has established itself as a trusted partner to the individuals patients and plastic surgery clinics in the journey to recovery. We are the official distributor of Revee post-operative compression garments in the United Arab Emirates. Our collaboration with Revee, a leading Italian brand renowned for its dedication to research, technology, quality and design in the creation of post-surgery compression garments, enables us to offer products that set the new standard for quality and effectiveness.
                        </p>
                        <br/>
                        <p>
                            Our mission at Healfit is to provide support, comfort, and confidence to our customers in Dubai, Abu Dhabi, Sharjah, and other UAE cities, through products that embody the highest standards of 100% Italian craftsmanship and superior care. Each product we offer is a testament to commitment to innovation, combining medical efficacy with unparalleled comfort and style.
                        </p>
                        <br/>
                        <p>
                            Located in the heart of Dubai, UAE, Healfit is more than just a distributor. We are a team of dedicated professionals passionate about making a difference in the lives of those we serve. Our expertise and understanding of the unique needs of post-surgery recovery, allow us to offer personalized recommendations and support, ensuring that each customer finds the perfect solution for their recovery journey.
                        </p>
                        <br/>
                        <p>
                            At Healfit, we believe in building lasting relationships based on trust, quality, and a shared commitment to excellence. Whether you are in the early stages of planning your surgery or are on the path to recovery, we are here to support you every step of the way.
                        </p>
                    </div>
                </div>
                <div className={styles.privacy__image + " max-w-xl mx-auto overflow-hidden mb-10"}>
                    <img className="object-cover w-full" src="../../images/aboutimage.png" alt="image" />
                </div>
                <div className={styles.privacy__map}>
                    
                </div>
            </div>
        </div>
    )
}

export default About