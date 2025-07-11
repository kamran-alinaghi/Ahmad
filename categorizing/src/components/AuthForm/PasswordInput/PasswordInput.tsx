import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './PasswordInput.css';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
};

const PasswordInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="password-input">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Enter password'}
        required
      />
      <div
        className="eye-btn"
        onClick={() => setShowPassword(!showPassword)}
        aria-label="Toggle password visibility"
      >
        {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
      </div>
    </div>
  );
};

export default PasswordInput;
