import Button from "./button"
import { useFormStatus } from "react-dom"
import { Loader } from "lucide-react"
import { ReactNode, ButtonHTMLAttributes } from "react"
import { sizes, variants } from "@/lib/variants"

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return <Button {...props} className={`${props.className} flex items-center justify-center space-x-1`} disabled={pending}>
    {pending && <Loader className="animate-spin w-4 h-4" />}
    <span>{props.children}</span>
  </Button>
}