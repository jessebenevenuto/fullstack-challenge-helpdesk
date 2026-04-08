import { classMerge } from "../../utils/classMerge";

type Props = React.ComponentProps<"th">;

export function TableHeader({ className, ...rest }: Props) {
  return (
    <th 
      className={classMerge([
        "text-left px-3 text-sm text-gray-400",
        className
      ])}
      {...rest}
    />
  )
}