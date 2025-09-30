'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validation'
import { redirect } from 'next/navigation'

interface Transaction {
  type: string
  category?: string
  amount: number
  description?: string
  created_at: string
}

interface ActionState {
  error?: boolean
  message: string
}

export async function createTransaction(formData: Transaction): Promise<void> {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const { error } = await createClient().from('transactions')
    .insert(formData)

  if (error) {
    throw new Error('Failed creating the transaction')
  }

  revalidatePath('/dashboard')
}

export async function updateTransaction(id: number, formData: Transaction): Promise<void> {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const { error } = await createClient().from('transactions')
    .update(formData)
    .eq('id', id)

  if (error) {
    throw new Error('Failed creating the transaction')
  }

  revalidatePath('/dashboard')
}

export async function fetchTransactions(range: string, offset: number = 0, limit: number = 10): Promise<any[]> {
  const supabase = createClient()
  let { data, error } = await supabase
    .rpc('fetch_transactions', {
      limit_arg: limit,
      offset_arg: offset,
      range_arg: range
    })
  if (error) throw new Error("We can't fetch transactions")
  return data
}

export async function deleteTransaction(id: number): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('transactions')
    .delete()
    .eq('id', id)
  if (error) throw new Error(`Could not delete the transaction ${id}`)
  revalidatePath('/dashboard')
}

export async function login(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const supabase = createClient()
  const email = formData.get('email') as string
  
  const result = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/confirm`
    }
  })
  
  if (result.error) {
    return {
      error: true,
      message: 'Error authenticating!'
    }
  }
  return {
    message: `Email sent to ${email}`
  }
}

export async function signOut(): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  redirect('/login')
}

export async function uploadAvatar(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  try {
    const supabase = createClient()
    const file = formData.get('file') as File
    
    if (!file || file.size === 0) {
      return {
        error: true,
        message: 'Please select a file to upload'
      }
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return {
        error: true,
        message: 'Please select an image file'
      }
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return {
        error: true,
        message: 'File size must be less than 5MB'
      }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    
    const { error } = await supabase.storage
      .from('avatar')
      .upload(fileName, file)
      
    if (error) {
      console.error('Storage upload error:', error)
      return {
        error: true,
        message: `Error uploading avatar: ${error.message}`
      }
    }

    // Removing the old file
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('User fetch error:', userError)
      return {
        error: true,
        message: 'Something went wrong, try again'
      }
    }

    const avatar = userData.user?.user_metadata.avatar
    if (avatar) {
      const { error } = await supabase.storage
        .from('avatar')
        .remove([avatar])

      if (error) {
        console.error('Old avatar removal error:', error)
        // Don't fail the upload if old avatar can't be removed
      }
    }

    const { error: dataUpdateError } = await supabase.auth
      .updateUser({
        data: {
          avatar: fileName
        }
      })
      
    if (dataUpdateError) {
      console.error('User metadata update error:', dataUpdateError)
      return {
        error: true,
        message: 'Error associating the avatar with the user'
      }
    }

    return {
      message: 'Updated the user avatar'
    }
  } catch (error) {
    console.error('Unexpected error in uploadAvatar:', error)
    return {
      error: true,
      message: 'An unexpected error occurred'
    }
  }
}

export async function updateSettings(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const supabase = createClient()
  const {error} = await supabase.auth
    .updateUser({
      data: {
        fullName: formData.get('fullName') as string,
        defaultView: formData.get('defaultView') as string
      }
    })
    
  if (error) {
    return{
      error: true,
      message: 'Failed updating setting'
    }
  }

  return {
    message: 'Updated user settings'
  }
}