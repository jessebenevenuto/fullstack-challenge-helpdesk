import { CircleCheckBig, CircleHelp, Clock2 } from "lucide-react";
import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"span"> & {
  styleVariant: TicketAPIStatus;
}

const Icons: Record<Props["styleVariant"], React.ReactNode> = {
  aberto: <CircleHelp size={16} color="#CC3D6A" />,
  emAtendimento: <Clock2 size={16} color="#355EC5" />,
  encerrado: <CircleCheckBig size={16} color="#508B26" />,
};

const styleVariants = {
  aberto: "text-feedback-open bg-feedback-open-20",
  emAtendimento: "text-feedback-progress bg-feedback-progress-20",
  encerrado: "text-feedback-done bg-feedback-done-20",
}

const labels = {
  aberto: "Aberto",
  emAtendimento: "Em atendimento",
  encerrado: "Encerrado",
}

export function TicketStatus({ styleVariant = "aberto", children, ...rest }: Props) {
  return (
    <span className={classMerge([
        "w-fit py-1.5 pl-2 pr-3 flex items-center gap-1.5 text-xs font-bold rounded-4xl",
        styleVariants[styleVariant]
      ])} 
      {...rest}
    >
      {Icons[styleVariant]}
      {labels[styleVariant]}
    </span>
  )
}
