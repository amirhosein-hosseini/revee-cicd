import React from "react";
import styles from "./styles.module.scss";

const Shipping = () => {
    return(
        <div className={styles.privacy}>
            <div className={styles.privacywrapper + "  w-11/12 container mx-auto"}>
                <div className={styles.privacy__header + " w-full p-2 mb-5 rounded-lg"}>
                    <p className="font-bold">
                        SHIPPING & DELIVERY
                    </p>
                </div>
                <div className={styles.privacy__desc + " p-4 rounded-lg mb-10"}>
                    <div className="flex-col gap-10">
                        <p>
                            Order Delivery
                            <br/>
                            healfit delivers across the UAE, with different delivery methods based on your location, and We're working constantly on improving our delivery methods and channels. Deliveries take place between 8:00 am to 9:00 pm.
                            <br/>
                            Dubai orders above 500 AED are qualified for free delivery, within the same-day or maximum one working day. For other cities there will be delivery charges and it will be delivered maximum up to 3 working days. 
                            <br/>
                            If the order is placed after the working hours 8:30 am to 5:00 pm, or during public holidays, it  will be deemed placed on the first working day following the order submission. Deliveries may face delays during sales promotions, and official/bank holidays. Cash on Delivery orders attract an extra 30 AED delivery fee (Only for dubai orders)
                            <br/>
                            Pre-Order Delivery
                            <br/>
                            Please check with our sales team via info@healfit.ae 
                            <br/>
                            Delivery Times
                            <br/>
                            We're dedicated to meeting the delivery times on our website, but these times are just estimates, not guarantees. The clock starts ticking from when you get your order confirmation. If we haven't delivered your order within 30 days of confirming it, we'll give you a full refund. Sometimes things happen that are out of our control, and if we can't deliver because of those reasons, like if you're not there to receive your order or if you ask to delay delivery, we won't be held responsible.
                            <br/>
                            We deliver orders every day except on UAE public holidays. You need to make sure we can get to you for delivery, especially on Fridays, by ensuring your availability.
                            <br/>
                            All orders are final and non-returnable. When your Order is ready for delivery, we will contact you to confirm the delivery date. Once you confirm, you will be responsible for accepting delivery on that date. It is your responsibility to ensure that our delivery team has access to the delivery address.
                            <br/>
                            If on the delivery date our delivery team is unable to find you or obtain access to the delivery address, a reasonable re-delivery charge may be applied. We will pre-inform you of this charge. In the absence of negligence, we will not be liable for loss or damage to the goods or your property, including were caused by: (a) us following your specific instructions; (b) limited or no access to your nominated address.
                            <br/>
                            Address Changes & Tracking
                            <br/>
                            Our sales team will be happy to assist with changing your preferred delivery date and location if it is needed. However, if you have received a message or call or an email informing you that your order has been dispatched from our inventory, we would not be able to change your delivery address and the changes may be subject to change on the delivery time and/or extra charges. 
                            <br/>
                            The order number will be provided to you once your order is confirmed. You will then be able to track your order by contacting our sales team from 9:00 am to 5:00 pm on 044495097 or 0email info@healfit.ae                        
                            <br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shipping;