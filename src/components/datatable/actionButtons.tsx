import React from 'react';

interface ActionButtonsProps {
    rowData: any;
    onEdit: (data: any) => void;
    onDelete: (id: any) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ rowData, onEdit, onDelete }) => {
    return (
        <div>
            <button onClick={() => onEdit(rowData)} className="btn btn-success mr-2">
                <i className="fas fa-edit"></i>
            </button>
            &nbsp;
            <button onClick={() => onDelete(rowData._id)} className="btn btn-danger">
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
    );
};

export default ActionButtons;
