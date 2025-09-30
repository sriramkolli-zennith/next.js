interface FormErrorProps {
  error?: { message?: string } | Error | null
}

export default function FormError({ error }: FormErrorProps) {
  const message = error instanceof Error ? error.message : error?.message
  return message && <p className="mt-1 text-red-500">{message}</p>
}