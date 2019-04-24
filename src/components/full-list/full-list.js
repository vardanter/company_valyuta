import React from 'react';
import ListItem from './ListItem';

export default ({data}) => {
    if (data) {
        const {currencies, companies} = data;
        const currenciesPart = currencies.slice(0, 4);

        return (
            <ul className="editable-list">
                <li className="editable-list__item">
                    <div className="editable-list__item-col">Компания</div>
                    {
                        currenciesPart.map(currency => {
                            return (
                                <div key={currency.id} className="editable-list__item-col">{currency.name}</div>
                            )
                        })
                    }
                </li>
                {
                    companies.map((item) => {
                        return (
                            <li key={item.id} className="editable-list__item">
                                <ListItem item={item} currencies={currenciesPart}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    
    return '';    
}