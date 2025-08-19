import React from 'react';
import './EditableCell.css';

type EditableCellProps = {
  value: string;
  onChange: (value: string) => void;
};

const EditableCell: React.FC<EditableCellProps> = ({ value, onChange }) => {
  return (
    <input
      className="editable-cell-input"
      value={value}
      type='number'
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default EditableCell;
