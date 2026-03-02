# Vintage Store Earnings Report App

Web app for a vintage store with shared reporting categories: sales, vendors, trends, expenses, and settings.

## Tabs
- `Sales`: add/import sales, run date-range reports, and export PDF/Excel reports
- `Vendors`: manage commission vendors, vendor payments, and owed balances
- `Trends`: visualize sales over time with filters and period comparisons
- `Expenses`: log expenses, filter by period, and project upcoming expense totals
- `Settings`: customize title, background color, font size, currency, and default behaviors

## Tax-season helpers
- Separate `Store Revenue` and `Vendor Payout` tracking on each sale
- Vendor balance accounting (`earned`, `paid`, `owed`)
- Expense ledger with recurring flags
- Expense projections by month count
- Currency setting for consistent report formatting
- PDF export of the active sales report window
- Excel export with separate sheets for sales, vendor balances/payments, expenses, and trend summary

## CSV import
- In `Sales`, use `Import Existing Sheet`
- CSV columns supported:
  - Required: `Date`, `Employee`, `Item`, `Vendor`, `Price`, `Payment Method`, `Store Commision Rate`
  - Optional: `Time`, `Category`
- Import replaces current `sales` and `vendors`

## Settings controls
- Page title
- Background color
- Base font size
- Currency
- Default commission rate
- Require time on sales (on/off)

## Cloud Login + Shared Storage (Supabase)
The app now supports:
- Email/password login
- Shared cloud dataset for all users on the same `Store ID`
- Local fallback when not signed in

### 1) Create Supabase project
1. Create a project at [https://supabase.com](https://supabase.com)
2. In Supabase dashboard, copy:
   - `Project URL`
   - `anon public key`

### 2) Run this SQL in Supabase SQL editor
```sql
create table if not exists public.app_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_by text,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;

create policy "authenticated read app_state"
on public.app_state
for select
to authenticated
using (true);

create policy "authenticated write app_state"
on public.app_state
for insert
to authenticated
with check (true);

create policy "authenticated update app_state"
on public.app_state
for update
to authenticated
using (true)
with check (true);
```

### 3) Configure app
In `Settings` tab, under `Cloud Storage`, enter:
- Supabase URL
- Supabase Anon Key
- Store ID (shared key for your store, e.g. `miss-revival-main`)

### 4) Login
Use `Cloud Login` card at top:
- `Create Account` (first time)
- `Sign In`
- `Sync Now`

When signed in, all users with same `Store ID` share one live dataset.

## Run
Open:
`/Users/gilbertomoreno/Documents/earnings-report-app/index.html`
