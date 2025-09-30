import LoginForm from "./components/login-form";

interface PageProps {
  searchParams: { error?: string }
}

export default function Page({ searchParams }: PageProps) {
  const hasError = searchParams.error === 'confirmation_failed'
  
  return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-40">
    <div className="flex flex-col space-y-8 text-center">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter your email to sign in/create your account. No password is required.
      </p>
    </div>
    {hasError && (
      <div className="p-3 rounded-md bg-red-50 border border-red-200">
        <p className="text-sm text-red-800">
          Email confirmation failed. Please try signing in again.
        </p>
      </div>
    )}
    <LoginForm />
  </div>
}