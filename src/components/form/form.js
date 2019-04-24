import React from 'react';

import './form.less';

const Form = ({children, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
};

export default Form;