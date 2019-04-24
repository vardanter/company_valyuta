import React from 'react';
import EditableListItem from "./editable-list-item";

import './editable-list.less';

const EditableList = ({data, editUrl, onDelete}) => {
    return (
        <ul className="editable-list">
            {
                data.map(item => {
                    return (
                        <li key={item.id} className="editable-list__item">
                            <EditableListItem {...item} editUrl={editUrl} onDelete={onDelete} />
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default EditableList;