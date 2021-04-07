import React from 'react'
import { OrderForm } from '../components/order/OrderForm'

export const NewOrderScreen = () => {

    return (
        <div className="order-wrapper">
            <OrderForm type="new" />
        </div>
    )
}
