import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  styleVariant?: "base" | "icon" | "iconSmall" | "small" | "link" | "buttonIcon";
};

const styleVariants = {
  button: {
    base: "h-[2.5rem]",
    icon: "h-[2.5rem] w-[2.5rem]",
    small: "h-7",
    iconSmall: "h-7 w-7 flex items-center justify-center hover:bg-gray-400",
    link: "h-[2.5rem] bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100",
    buttonIcon: "flex items-center justify-center gap-2 h-[2.5rem] text-sm bg-gray-500 text-gray-200 hover:bg-gray-400",
  },
};

export function Button({
  children,
  isLoading,
  className,
  type = "button",
  styleVariant = "base",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={classMerge([
        "w-full bg-gray-200 text-gray-600 rounded-md font-bold hover:bg-gray-300 transition hover:cursor-pointer disabled:cursor-progress disabled:opacity-50",
        styleVariants.button[styleVariant],
        className,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}
