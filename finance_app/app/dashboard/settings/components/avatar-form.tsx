'use client'
import AlertError from "@/components/alert-error"
import AlertSuccess from "@/components/alert-success"
import Input from "@/components/input"
import SubmitButton from "@/components/submit-button"
import { uploadAvatar } from "@/lib/actions"
import { useFormState } from 'react-dom'

interface FormState {
  message: string
  error: boolean
}

const initialState: FormState = {
  message: '',
  error: false
}

export default function AvatarForm() {
  const [state, formAction] = useFormState(uploadAvatar, initialState)
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && <AlertSuccess>{state?.message}</AlertSuccess>}
      <Input type="file" name="file" id="file" />
      <SubmitButton>Upload Avatar</SubmitButton>
    </form>
  )
}