type Props = React.ComponentProps<"select"> & {
  id: string;
  label: string;
  defaultOption: string;
}

export function SelectInput({ id, label, children, defaultOption, ...rest}: Props) {
  return (
    <div className="w-full flex flex-col text-gray-300 focus-within:text-blue-base">
      <label className="text-xs uppercase font-bold text-inherit tracking-wider" htmlFor={id}>
        {label}
      </label>

      <select
        className="w-full h-[2.5rem] border-b border-gray-500 text-base text-gray-400 placeholder:text-base placeholder:text-gray-400 focus:outline-none focus:border-blue-base"
        id={id}
        {...rest}
      >
        <option className="text-base font-bold text-gray-400" value="" disabled hidden>
          {defaultOption}
        </option>
        {children}
      </select>
    </div>
  )
}