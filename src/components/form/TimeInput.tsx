type Props = React.ComponentProps<"input"> & {
  label: string;
  value: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export function TimeInput({ label, value, onChange, checked, ...rest }: Props) {
  return (
    <li className="relative border-1 text-gray-200 border-gray-400 w-[3.375rem] h-7 text-center rounded-4xl has-checked:bg-blue-base has-checked:border-blue-base has-checked:text-gray-600 focus-within:border-blue-base">
      <input
        id={label}
        className="appearance-none outline-none cursor-pointer absolute inset-0"
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
        {...rest}
      />
      <label className="text-xs font-bold px-1.5" htmlFor={label}>{label}</label>
    </li>
  )
}
