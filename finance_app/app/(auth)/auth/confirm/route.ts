import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  
  // Handle both 'code' (from signup) and 'token_hash' (from magic link)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Confirmation route called with:', {
    code: code ? 'present' : 'missing',
    token_hash: token_hash ? 'present' : 'missing',
    type,
    searchParams: Object.fromEntries(searchParams.entries()),
    url: request.url
  })

  if (code) {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        console.log('Successfully exchanged code for session')
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        console.error('Error exchanging code for session:', error.message)
      }
    } catch (err) {
      console.error('Unexpected error during confirmation:', err)
    }
  } else if (token_hash && type) {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any
      })
      
      if (!error) {
        console.log('Successfully verified OTP token')
        return NextResponse.redirect(`${origin}${next}`)
      } else {
        console.error('Error verifying OTP token:', error.message)
      }
    } catch (err) {
      console.error('Unexpected error during OTP verification:', err)
    }
  } else {
    console.error('No confirmation code or token_hash provided in URL parameters')
  }

  // Redirect to login page with error message if confirmation fails
  return NextResponse.redirect(`${origin}/login?error=confirmation_failed`)
}