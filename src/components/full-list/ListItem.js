import React from 'react';
import {NavLink} from "react-router-dom";

export default ({item, currencies}) => {

    return (
        <>
            <div  className="editable-list__item-col">
                <NavLink to={`/company/view/${item.id}`}>{item.name}</NavLink>
            </div>
            {
                currencies.map(currency => {
                    const currencyData = item.currencyData.find(companyCurrency => companyCurrency.key === currency.id);

                    return (
                        <div key={currency.id} className="editable-list__item-col">{currencyData && currencyData.value || '--'}</div>
                    )
                })
            }
        </>
    )
}