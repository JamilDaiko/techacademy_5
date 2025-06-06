import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
  errorMessage?: string; 
}

export const Input: React.FC<InputProps> = ({ label, errorMessage, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        {...props}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          props.className || ""
        }`}
      />
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
    </div>
  );
};
