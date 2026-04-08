import React from "react";

type Props = React.ComponentProps<"input"> & {
  label?: string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, type = "text", ...rest}, ref) => {
    return (
      <div className="w-full flex flex-col text-gray-300 focus-within:text-blue-base">
        {label && (
          <label
            className="text-xs uppercase font-bold text-inherit tracking-wider"
            htmlFor={label}
          >
            {label}
          </label>
        )}

        <input
          className="w-full h-[2.5rem] border-b border-gray-500 text-base text-gray-200 placeholder:text-base placeholder:text-gray-400 focus:outline-none focus:border-blue-base"
          id={label}
          type={type}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
