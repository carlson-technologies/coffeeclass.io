// Logs the user in using GitHub.

import { supabase } from '../supabaseClient'

export async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
    })
}