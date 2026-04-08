type Props = React.ComponentProps<"h1">;

import { classMerge } from "../utils/classMerge";

export function Title({ className, children, ...rest }: Props) {
  return (
    <h1 className={classMerge([
       "text-blue-dark text-2xl font-bold mb-4 lg:mb-6",
        className
      ])}
      {...rest}
    >
      {children}
    </h1>
  )
}
