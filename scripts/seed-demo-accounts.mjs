import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
}

const roles = ['OWNER', 'ADMIN', 'MANAGER', 'DOKTER', 'KASIR', 'GROOMER', 'COURIER', 'CUSTOMER']
const accounts = roles.map((role) => {
  const prefix = `DEMO_${role}`
  const account = {
    email: process.env[`${prefix}_EMAIL`],
    password: process.env[`${prefix}_PASSWORD`],
    role,
    full_name: process.env[`${prefix}_FULL_NAME`],
    branch_id: process.env[`${prefix}_BRANCH_ID`] ?? null,
  }

  for (const field of ['email', 'password', 'full_name']) {
    if (!account[field]?.trim()) {
      throw new Error(`${prefix}_${field.toUpperCase()} is required`)
    }
  }

  return account
})

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function findUserByEmail(email) {
  for (let page = 1; page <= 100; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) throw error
    const match = data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase())
    if (match) return match
    if (data.users.length < 1000) return null
  }
  return null
}

async function ensureAccount(account) {
  const existing = await findUserByEmail(account.email)
  const metadata = { full_name: account.full_name }
  const appMetadata = { role: account.role }
  let userId = existing?.id

  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, {
      password: account.password,
      email_confirm: true,
      user_metadata: metadata,
      app_metadata: appMetadata,
    })
    if (error) throw error
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: account.email,
      password: account.password,
      email_confirm: true,
      user_metadata: metadata,
      app_metadata: appMetadata,
    })
    if (error) throw error
    userId = data.user.id
  }

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    full_name: account.full_name,
    role: account.role,
    branch_id: account.branch_id,
  }, { onConflict: 'id' })
  if (profileError) throw profileError

  return { email: account.email, role: account.role, userId }
}

const results = []
for (const account of accounts) results.push(await ensureAccount(account))
console.table(results)
console.log(`Seeded ${results.length} demo accounts directly in Supabase.`)
