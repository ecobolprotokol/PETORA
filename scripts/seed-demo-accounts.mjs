import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const accountsJson = process.env.DEMO_ACCOUNTS_JSON

if (!supabaseUrl || !serviceRoleKey || !accountsJson) {
  throw new Error('SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and DEMO_ACCOUNTS_JSON are required')
}

const accounts = JSON.parse(accountsJson)
if (!Array.isArray(accounts) || accounts.length === 0) {
  throw new Error('DEMO_ACCOUNTS_JSON must contain a non-empty array')
}

const requiredFields = ['email', 'password', 'role', 'full_name']
for (const account of accounts) {
  for (const field of requiredFields) {
    if (typeof account?.[field] !== 'string' || account[field].trim() === '') {
      throw new Error(`Each demo account requires a non-empty ${field}`)
    }
  }
  if (account.branch_id !== undefined && account.branch_id !== null && typeof account.branch_id !== 'string') {
    throw new Error('branch_id must be a UUID string or null')
  }
}

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
    branch_id: account.branch_id ?? null,
  }, { onConflict: 'id' })
  if (profileError) throw profileError

  return { email: account.email, role: account.role, userId }
}

const results = []
for (const account of accounts) results.push(await ensureAccount(account))
console.table(results)
console.log(`Seeded ${results.length} demo accounts.`)
