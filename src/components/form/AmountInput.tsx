import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { Input } from "./Input";

type Props = NumericFormatProps & {
  label?: string
};

export function AmountInput({ label, ...props }: Props) {
  return (
    <div className="w-full flex flex-col text-gray-300 focus-within:text-blue-base">
      {label && (
        <label
          className="text-xs uppercase font-bold text-inherit tracking-wider"
          htmlFor={label}
        >
          {label}
        </label>
      )}

      <NumericFormat
        customInput={Input}
        id={label}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        {...props}
      />
    </div>
  );
}