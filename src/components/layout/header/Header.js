import React from 'react';
import { Link } from "react-router-dom";

import './header.less';

export default (props) => {
    return (
        <header>
            <div className="header-block">
                <Link to="/">Главная</Link>
                <Link to="/companies">Компании</Link>
                <Link to="/currencies">Валюта</Link>
            </div>
        </header>
    );
};