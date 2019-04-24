import React from 'react';
import Header from "../../layout/header";


import './layout.less';

export const withLayoutWrapper = () => (WrappedComponent) => {
    return (props) => {
        return (
            <div className="container">
                <Header/>
                <main>
                    <WrappedComponent {...props}/>
                </main>
            </div>
        )
    }
};
