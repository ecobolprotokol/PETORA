import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
}

const allowedRoles = new Set(['OWNER', 'ADMIN', 'MANAGER', 'DOKTER', 'KASIR', 'GROOMER', 'COURIER', 'CUSTOMER'])
const seedAccounts = process.env.DEMO_ACCOUNTS

if (!seedAccounts?.trim()) {
  throw new Error('DEMO_ACCOUNTS is required')
}

const accounts = seedAccounts.split(';').map((entry, index) => {
  const [role, email, password, full_name, branch_id = ''] = entry.split('|').map((value) => value.trim())
  if (!allowedRoles.has(role) || !email || !password || !full_name) {
    throw new Error(`Invalid DEMO_ACCOUNTS entry at position ${index + 1}. Expected ROLE|EMAIL|PASSWORD|FULL_NAME|BRANCH_ID`)
  }

  return { role, email, password, full_name, branch_id: branch_id || null }
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
