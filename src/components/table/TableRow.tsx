import { classMerge } from "../../utils/classMerge";

type Props = React.ComponentProps<"tr">;

export function TableRow({ className, ...rest }: Props) {
  return (
    <tr
      className={classMerge([
        "h-16 border-t-1 border-gray-500 cursor-pointer hover:bg-gray-550 transition ease-in-out",
        className
      ])}
      {...rest}
    />
  )
}