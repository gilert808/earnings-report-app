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

## Run
Open:
`/Users/gilbertomoreno/Documents/earnings-report-app/index.html`

No backend required yet; all data is stored in browser `localStorage`.
