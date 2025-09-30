import { sizes, variants } from "@/lib/variants";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export default function Button(props: ButtonProps) {
  return (<button {...props} className={`${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']} ${props.className}`}></button>)
}