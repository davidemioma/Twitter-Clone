import React from "react";

interface Props {
  value?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, type, placeholder, disabled, onChange }: Props) => {
  return (
    <input
      className="w-full bg-black border-2 border-neutral-800 p-4 rounded-md outline-none focus:border-sky-500 disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed transition"
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;
