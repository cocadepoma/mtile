import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { OrderForm } from '../components/order/OrderForm';

import { LoadingPopup } from '../components/ui/LoadingPopup';
import { getOrderById } from '../helpers/getOrderById';


export const OrderScreen = () => {

    const { id } = useParams();

    const [isValid, setIsValid] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        checkOrder(id);
    }, [id]);

    const checkOrder = async (id) => {
        if (id) {
            const validation = await getOrderById(id);
            setIsValid(validation);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }



    return (

        <div className='order-wrapper animate__animated animate__fadeIn'>

            {isLoading
                ? <LoadingPopup type="no-animation" />

                : !isValid
                    ? <p>Orden no encontrada</p>
                    : <OrderForm type="update" />
            }

        </div>
    )

}
