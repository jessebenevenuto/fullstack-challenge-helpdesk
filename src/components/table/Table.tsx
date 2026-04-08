type Props = React.ComponentProps<"table">;

export function Table({ ...rest }: Props) {
  return (
    <div className="w-full overflow-auto rounded-[.625rem] border-1 border-gray-500">
      <table className="w-full whitespace-nowrap xl:whitespace-normal" {...rest} />
    </div>
  )
}
