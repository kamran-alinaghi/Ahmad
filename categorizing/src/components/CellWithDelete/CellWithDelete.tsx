import React from 'react';
import './CellWithDelete.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
};

const CellWithDelete: React.FC<Props> = ({ value, onChange, onDelete }) => {
  return (
    <div className="cell-with-delete">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="delete-btn" onClick={onDelete}>×</button>
    </div>
  );
};

export default CellWithDelete;