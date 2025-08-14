import React, { useState, useEffect } from 'react';
import './PopupModal.css';

type Props = {
  title: string;
  visible: boolean;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
  defaultValue?: string;
  showInput?: boolean;
};

const PopupModal: React.FC<Props> = ({
  title,
  visible,
  onConfirm,
  onCancel,
  defaultValue = '',
  showInput = true,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (visible) setValue(defaultValue);
  }, [visible, defaultValue]);

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>

        {showInput && (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            autoFocus
          />
        )}

        <div className="modal-actions">
          <button className="modal-btn" onClick={() => onConfirm(value)}>Confirm</button>
          <button className="modal-btn cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
