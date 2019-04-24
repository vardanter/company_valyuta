import React from 'react';
import {NavLink} from "react-router-dom";

const EditableListItem = ({name, id, editUrl, onDelete}) => {
    return (
        <>
            <div className="editable-list__item-col">{name}</div>
            <div className="editable-list__item-col action-col">
                <NavLink to={`${editUrl}/${id}`}>Редактировать</NavLink>
            </div>
            <div className="editable-list__item-col action-col">
                <NavLink to="#" onClick={() => onDelete(id)}>Удалить</NavLink>
            </div>
        </>
    )
};

export default EditableListItem;