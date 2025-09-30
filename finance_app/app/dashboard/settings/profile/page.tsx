import { createClient } from "@/lib/supabase/server"
import Separator from "@/components/separator"
import SettingsForm from "../components/settings-form"

export const metadata = {
  title: "Profile Settings"
}

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const defaults = user?.user_metadata
  return <>
    <h1 className="text-4xl font-semibold mb-8">
      Profile Settings
    </h1>
    <SettingsForm defaults={defaults} />
  </>
}