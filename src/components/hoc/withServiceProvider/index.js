import React from 'react';
import { StoreServiceConsumer } from "../../store-service-context";

const withServiceProvider = () => (WrappedComponent) => {
    return (props) => {
        return (
            <StoreServiceConsumer>
                {
                    (storeService) => {
                        return (
                            <WrappedComponent {...props} storeService={storeService}/>
                        )
                    }
                }
            </StoreServiceConsumer>
        )
    }
};

export { withServiceProvider };