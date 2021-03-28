import React from 'react';
import { useDispatch } from 'react-redux';
import { clearActiveTechnician } from '../../actions/technician';
import { uiOpenModal } from '../../actions/ui';

export const ButtonNew = ({ iconData }) => {

    const dispatch = useDispatch();

    const handleClick = () => {

        dispatch(clearActiveTechnician());
        dispatch(uiOpenModal());

    }

    return (
        <div className={iconData.className} onClick={handleClick}>
            {iconData.icon}
        </div>
    )
}


