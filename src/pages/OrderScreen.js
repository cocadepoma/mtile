import React, { useEffect, useState } from 'react';
import { OrderForm } from '../components/order/OrderForm';
import { LoadingPopup } from '../components/ui/LoadingPopup';

export const OrderScreen = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        showLoading();
    }, []);

    const showLoading = () => {

        setTimeout(() => {
            setIsLoading(false);
        }, 300);

    }

    return (

        <div className='order-wrapper'>
            {isLoading
                ? <LoadingPopup type="no-animation" />

                : <OrderForm />
            }
        </div>
    )

}
