import React from 'react';
import Main from '../layout/main';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { StoreServiceProvider } from '../store-service-context'
import StoreService from '../../service';
import store from '../../store';

import './app.less';

const storeService = new StoreService();

const App = (props) => {
    return (
        <Provider store={store}>
            <StoreServiceProvider value={storeService}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </StoreServiceProvider>
        </Provider>
    )
};

export default App;