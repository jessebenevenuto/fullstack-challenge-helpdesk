import { classMerge } from "../../utils/classMerge";

type Props = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  className?: string;
}

export function FormLayout({ children, className }: Props) {
  return (
    <div className={classMerge(["border border-gray-500 p-6 rounded-[.625rem] lg:p-7", className])}>
      {children}
    </div>
  );
}
