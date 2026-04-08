type Props = React.ComponentProps<"textarea"> & {
  id: string;
  label: string;
}

export function TextArea({ id, label, ...rest}: Props) {
  return (
    <div className="w-full flex flex-col text-gray-300 focus-within:text-blue-base">
      <label className="mb-2 text-xs uppercase font-bold text-inherit tracking-wider" htmlFor={id}>
        {label}
      </label>

      <textarea
        className="w-full h-[9.625rem] min-h-[9.625rem] max-w-inherit border-b border-gray-500 text-base text-gray-200 placeholder:text-base placeholder:text-gray-400 focus:outline-none focus:border-blue-base"
        id={id}
        {...rest}
      />
    </div>
  );
}
