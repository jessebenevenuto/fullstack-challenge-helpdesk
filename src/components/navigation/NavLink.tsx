import { Link } from "react-router";

type Props = React.ComponentProps<"a"> & {
  link: string;
  active?: boolean;
}

export function NavLink({link, active, children, ...rest }: Props) {
  return (
    <li className={`p-3 rounded-md text-gray-400 ${!active && "hover:text-gray-500 hover:bg-gray-200 transition"} ${active && "bg-blue-dark text-gray-600"}`}>
      <Link className="text-sm flex items-center gap-3" to={link} {...rest}>
        {children}
      </Link>
    </li>
  )
}
