import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Magic link route called with:', {
    token_hash: token_hash ? 'present' : 'missing',
    type,
    searchParams: Object.fromEntries(searchParams.entries()),
    url: request.url
  })

  if (token_hash && type) {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any
      })
      
      if (!error) {
        console.log('Successfully verified magic link token')
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        console.error('Error verifying magic link token:', error.message)
      }
    } catch (err) {
      console.error('Unexpected error during magic link verification:', err)
    }
  } else {
    console.error('No token_hash or type provided for magic link')
  }

  // Redirect to login page with error message if verification fails
  return NextResponse.redirect(`${origin}/login?error=confirmation_failed`)
}