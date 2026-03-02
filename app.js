const STORAGE_KEYS = {
  sales: "vintage_store_sales_v3",
  vendors: "vintage_store_vendors_v1",
  vendorPayments: "vintage_store_vendor_payments_v1",
  expenses: "vintage_store_expenses_v1",
  settings: "vintage_store_settings_v1",
};

const INTERNAL_SELLERS = new Set(["ren", "steisy"]);
const REPORT_BOX_COUNT = 10;
const REPORT_BOX_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const DEFAULT_REPORT_CARD_METRICS = [
  "totalRevenue",
  "storeRevenue",
  "vendorPayouts",
  "salesCount",
  "averageSale",
  "topVendor",
  "topPayment",
  "renSales",
  "steisySales",
  "highestSale",
];

const REPORT_METRIC_OPTIONS = [
  { key: "totalRevenue", label: "Total Revenue", type: "money" },
  { key: "storeRevenue", label: "Store Revenue", type: "money" },
  { key: "vendorPayouts", label: "Vendor Payouts", type: "money" },
  { key: "monthSalesToDate", label: "Month Sales To Date", type: "money" },
  { key: "projectedMonthSales", label: "Projected Month Sales", type: "money" },
  { key: "salesCount", label: "Sales Count", type: "count" },
  { key: "averageSale", label: "Average Sale", type: "money" },
  { key: "topVendor", label: "Top External Vendor", type: "text" },
  { key: "topPayment", label: "Top Payment Method", type: "text" },
  { key: "renSales", label: "Ren Sales", type: "money" },
  { key: "steisySales", label: "Steisy Sales", type: "money" },
  { key: "highestSale", label: "Highest Sale", type: "money" },
  { key: "lowestSale", label: "Lowest Sale", type: "money" },
  { key: "externalVendorCount", label: "Active External Vendors", type: "count" },
];

const DEFAULT_SETTINGS = {
  pageTitle: "Vintage Store Earnings Report",
  bgColor: "#ffdbe8",
  panelColor: "#fff3f8",
  dataBoxColor: "#fff8fb",
  borderColor: "#efbdd2",
  fontSize: 14,
  currency: "USD",
  defaultCommission: 30,
  requireTime: true,
  reportCardMetrics: DEFAULT_REPORT_CARD_METRICS,
};

const el = {
  pageTitleHeading: document.getElementById("pageTitleHeading"),
  tabSales: document.getElementById("tabSales"),
  tabVendors: document.getElementById("tabVendors"),
  tabTrends: document.getElementById("tabTrends"),
  tabExpenses: document.getElementById("tabExpenses"),
  tabSettings: document.getElementById("tabSettings"),
  salesTab: document.getElementById("salesTab"),
  vendorsTab: document.getElementById("vendorsTab"),
  trendsTab: document.getElementById("trendsTab"),
  expensesTab: document.getElementById("expensesTab"),
  settingsTab: document.getElementById("settingsTab"),

  saleForm: document.getElementById("sale-form"),
  vendorForm: document.getElementById("vendor-form"),
  vendorPaymentForm: document.getElementById("vendor-payment-form"),
  expenseForm: document.getElementById("expense-form"),
  settingsForm: document.getElementById("settings-form"),

  addVendorBtn: document.getElementById("addVendorBtn"),
  addVendorPaymentBtn: document.getElementById("addVendorPaymentBtn"),

  csvFileInput: document.getElementById("csvFile"),
  importCsvBtn: document.getElementById("importCsvBtn"),
  runReportBtn: document.getElementById("runReportBtn"),
  showAllBtn: document.getElementById("showAllBtn"),
  downloadPdfBtn: document.getElementById("downloadPdfBtn"),
  downloadExcelBtn: document.getElementById("downloadExcelBtn"),

  reportStartDateInput: document.getElementById("reportStartDate"),
  reportEndDateInput: document.getElementById("reportEndDate"),
  reportRangeLabel: document.getElementById("reportRangeLabel"),

  dateInput: document.getElementById("date"),
  timeInput: document.getElementById("time"),
  itemNameInput: document.getElementById("itemName"),
  vendorSelect: document.getElementById("vendorSelect"),
  vendorNameInput: document.getElementById("vendorName"),
  commissionInput: document.getElementById("commissionRate"),

  paymentVendorSelect: document.getElementById("paymentVendorId"),
  paymentDateInput: document.getElementById("paymentDate"),

  salesBody: document.getElementById("salesBody"),
  vendorsBody: document.getElementById("vendorsBody"),
  vendorBalancesBody: document.getElementById("vendorBalancesBody"),
  vendorPaymentsBody: document.getElementById("vendorPaymentsBody"),
  clearAllBtn: document.getElementById("clearAll"),
  reportGrid: document.getElementById("salesReportGrid"),

  trendStartDateInput: document.getElementById("trendStartDate"),
  trendEndDateInput: document.getElementById("trendEndDate"),
  trendGranularityInput: document.getElementById("trendGranularity"),
  trendMetricInput: document.getElementById("trendMetric"),
  trendCategoryInput: document.getElementById("trendCategory"),
  trendWeekdayInput: document.getElementById("trendWeekday"),
  trendVendorInput: document.getElementById("trendVendor"),
  trendItemSelect: document.getElementById("trendItemSelect"),
  trendItemSummary: document.getElementById("trendItemSummary"),
  trendItemPriceBody: document.getElementById("trendItemPriceBody"),
  trendItemPriceChartEl: document.getElementById("trendItemPriceChart"),
  trendComparePrevInput: document.getElementById("trendComparePrev"),
  applyTrendFiltersBtn: document.getElementById("applyTrendFiltersBtn"),
  resetTrendFiltersBtn: document.getElementById("resetTrendFiltersBtn"),
  trendMonthTimeInput: document.getElementById("trendMonthTime"),
  trendMonthItemBreakdownInput: document.getElementById("trendMonthItemBreakdown"),
  trendMonthCategoryInput: document.getElementById("trendMonthCategory"),
  trendMonthWeekdayInput: document.getElementById("trendMonthWeekday"),
  trendMonthFrequencyInput: document.getElementById("trendMonthFrequency"),
  trendMonthEmployeeInput: document.getElementById("trendMonthEmployee"),
  timeTrendChartEl: document.getElementById("timeTrendChart"),
  categoryTrendChartEl: document.getElementById("categoryTrendChart"),
  weekdayTrendChartEl: document.getElementById("weekdayTrendChart"),
  timeFrequencyWeekdayInput: document.getElementById("timeFrequencyWeekday"),
  timeFrequencyBars: document.getElementById("timeFrequencyBars"),
  timeFrequencyInsights: document.getElementById("timeFrequencyInsights"),
  employeeRevenueChartEl: document.getElementById("employeeRevenueChart"),
  employeeRevenueSummary: document.getElementById("employeeRevenueSummary"),

  expenseStartDateInput: document.getElementById("expenseStartDate"),
  expenseEndDateInput: document.getElementById("expenseEndDate"),
  expenseProjectionMonthsInput: document.getElementById("expenseProjectionMonths"),
  applyExpenseFiltersBtn: document.getElementById("applyExpenseFiltersBtn"),
  resetExpenseFiltersBtn: document.getElementById("resetExpenseFiltersBtn"),
  clearExpensesBtn: document.getElementById("clearExpenses"),
  expenseRangeLabel: document.getElementById("expenseRangeLabel"),
  expensesBody: document.getElementById("expensesBody"),
  totalExpensesEl: document.getElementById("totalExpenses"),
  recurringMonthlyEl: document.getElementById("recurringMonthly"),
  avgMonthlyExpensesEl: document.getElementById("avgMonthlyExpenses"),
  projectedExpensesEl: document.getElementById("projectedExpenses"),

  settingsPageTitle: document.getElementById("settingsPageTitle"),
  settingsBgColor: document.getElementById("settingsBgColor"),
  settingsPanelColor: document.getElementById("settingsPanelColor"),
  settingsDataBoxColor: document.getElementById("settingsDataBoxColor"),
  settingsBorderColor: document.getElementById("settingsBorderColor"),
  settingsFontSize: document.getElementById("settingsFontSize"),
  settingsCurrency: document.getElementById("settingsCurrency"),
  settingsDefaultCommission: document.getElementById("settingsDefaultCommission"),
  settingsRequireTime: document.getElementById("settingsRequireTime"),
  settingsReportCardsConfig: document.getElementById("settingsReportCardsConfig"),
  resetSettingsBtn: document.getElementById("resetSettingsBtn"),
};

let settings = { ...DEFAULT_SETTINGS, ...loadList(STORAGE_KEYS.settings, {}) };
let sales = loadList(STORAGE_KEYS.sales, []).map(normalizeSaleShape);
let vendors = loadList(STORAGE_KEYS.vendors, []);
let vendorPayments = loadList(STORAGE_KEYS.vendorPayments, []);
let expenses = loadList(STORAGE_KEYS.expenses, []).map(normalizeExpenseShape);
settings.reportCardMetrics = sanitizeReportCardMetrics(settings.reportCardMetrics);

let currentRange = { start: "", end: "" };
let currentTrendFilters = {
  start: "",
  end: "",
  granularity: "daily",
  metric: "total",
  category: "",
  weekday: "",
  vendor: "",
  comparePrevious: false,
};
let currentExpenseFilters = { start: "", end: "", months: 6 };
let currentTrendPanel = "trendPanelTime";

let trendCharts = { time: null, category: null, weekday: null, itemPrice: null, employee: null };

function loadList(key, fallback = []) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getReportMetricOption(key) {
  const options = getReportMetricOptions();
  const found = options.find((option) => option.key === key);
  if (found) return found;
  if ((key || "").toString().startsWith("paymentTotal::")) {
    const paymentKey = key.toString().replace("paymentTotal::", "");
    return {
      key,
      label: `Payment Total: ${paymentKey || "Unknown"}`,
      type: "money",
    };
  }
  return options[0];
}

function normalizePaymentMethodKey(value) {
  return (value || "").toString().trim().toLowerCase();
}

function buildPaymentMethodMetricOptions(seedMetrics = []) {
  const methodMap = new Map();
  sales.forEach((entry) => {
    const raw = (entry.paymentMethod || "").toString().trim();
    if (!raw) return;
    const key = normalizePaymentMethodKey(raw);
    if (!methodMap.has(key)) methodMap.set(key, raw);
  });

  seedMetrics
    .filter((metricKey) => (metricKey || "").toString().startsWith("paymentTotal::"))
    .forEach((metricKey) => {
      const key = metricKey.toString().replace("paymentTotal::", "");
      if (key && !methodMap.has(key)) methodMap.set(key, key);
    });

  return Array.from(methodMap.entries())
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([key, label]) => ({
      key: `paymentTotal::${key}`,
      label: `Payment Total: ${label}`,
      type: "money",
    }));
}

function getReportMetricOptions(seedMetrics = settings.reportCardMetrics || []) {
  return [...REPORT_METRIC_OPTIONS, ...buildPaymentMethodMetricOptions(seedMetrics)];
}

function sanitizeReportCardMetrics(metrics) {
  const fallback = DEFAULT_REPORT_CARD_METRICS.slice(0, REPORT_BOX_COUNT);
  const values = Array.isArray(metrics) ? metrics.slice(0, REPORT_BOX_COUNT) : [];
  while (values.length < REPORT_BOX_COUNT) {
    values.push(fallback[values.length % fallback.length]);
  }
  return values.map((value, index) => {
    const key = (value || "").toString();
    return getReportMetricOption(key)?.key || fallback[index % fallback.length];
  });
}

function normalizeName(value) {
  return (value || "").toString().trim().toLowerCase();
}

function normalizeVendorKey(name) {
  return normalizeName(name);
}

function normalizeCategoryKey(value) {
  return (value || "").toString().trim().toLowerCase();
}

function normalizeCategoryLabel(value) {
  const raw = (value || "").toString().trim();
  if (!raw) return "Uncategorized";
  const cleaned = raw.replace(/\s+/g, " ").toLowerCase();
  return cleaned.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

function isInternalSeller(name) {
  return INTERNAL_SELLERS.has(normalizeName(name));
}

function formatForFile(value) {
  return String(value).padStart(2, "0");
}

function getNowTimeString() {
  const now = new Date();
  return `${formatForFile(now.getHours())}:${formatForFile(now.getMinutes())}`;
}

function normalizeDateForInput(value) {
  const raw = (value || "").toString().trim();
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parts = raw.split("/");
  if (parts.length !== 3) return "";
  const [month, day, year] = parts.map((p) => Number(p));
  if (!month || !day || !year) return "";
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseCurrency(value) {
  const normalized = (value || "").toString().replace(/[$,\s]/g, "");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

function parsePercent(value) {
  const normalized = (value || "").toString().replace(/[%\s]/g, "");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: settings.currency || "USD",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function formatTimeDisplay(timeValue) {
  const value = (timeValue || "").toString().trim();
  if (!value) return "--";
  const [hourText, minuteText] = value.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function getDateParts(dateIso) {
  const parsed = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return { month: "", year: "", day: "" };
  return {
    month: parsed.toLocaleDateString("en-US", { month: "long" }),
    year: String(parsed.getFullYear()),
    day: parsed.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

function calculateSaleMetrics(entry) {
  const saleAmount = Number(entry.saleAmount) || 0;
  const commissionRate = Number(entry.commissionRate) || 0;
  if (isInternalSeller(entry.vendorName)) {
    return { storeEarned: saleAmount, vendorPayout: 0 };
  }
  const storeEarned = commissionRate > 0 ? (saleAmount * commissionRate) / 100 : 0;
  return { storeEarned, vendorPayout: saleAmount - storeEarned };
}

function normalizeSaleShape(raw) {
  const date = normalizeDateForInput(raw.date);
  const saleAmount = Number(raw.saleAmount) || 0;
  const commissionRate = Number(raw.commissionRate) || 0;
  const vendorName = raw.vendorName || "";
  const category = normalizeCategoryLabel(raw.category || raw.itemName || "Uncategorized");
  const metrics = calculateSaleMetrics({ saleAmount, commissionRate, vendorName });
  const internal = isInternalSeller(vendorName);
  return {
    id: raw.id || crypto.randomUUID(),
    date,
    time: (raw.time || "").toString(),
    category,
    employee: (raw.employee || "").toString(),
    itemName: (raw.itemName || "").toString(),
    vendorName,
    paymentMethod: (raw.paymentMethod || "").toString(),
    commissionRate,
    saleAmount,
    storeRevenue: internal ? metrics.storeEarned : Number(raw.storeRevenue) || metrics.storeEarned,
    vendorRevenue: internal ? 0 : Number(raw.vendorRevenue) || metrics.vendorPayout,
  };
}

function normalizeStoredSalesCategories() {
  let changed = false;
  sales = sales.map((entry) => {
    const normalized = normalizeSaleShape(entry);
    if ((entry.category || "") !== normalized.category) changed = true;
    return normalized;
  });
  if (changed) saveKey(STORAGE_KEYS.sales, sales);
}

function normalizeExpenseShape(raw) {
  return {
    id: raw.id || crypto.randomUUID(),
    date: normalizeDateForInput(raw.date),
    category: (raw.category || "General").toString(),
    vendorName: (raw.vendorName || "").toString(),
    amount: Number(raw.amount) || 0,
    method: (raw.method || "").toString(),
    notes: (raw.notes || "").toString(),
    recurring: Boolean(raw.recurring),
  };
}

function parseCsvLine(line) {
  const output = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      output.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  output.push(current);
  return output;
}

function switchTab(name) {
  const active = {
    sales: name === "sales",
    vendors: name === "vendors",
    trends: name === "trends",
    expenses: name === "expenses",
    settings: name === "settings",
  };
  el.tabSales.classList.toggle("active", active.sales);
  el.tabVendors.classList.toggle("active", active.vendors);
  el.tabTrends.classList.toggle("active", active.trends);
  el.tabExpenses.classList.toggle("active", active.expenses);
  el.tabSettings.classList.toggle("active", active.settings);

  el.salesTab.classList.toggle("hidden", !active.sales);
  el.vendorsTab.classList.toggle("hidden", !active.vendors);
  el.trendsTab.classList.toggle("hidden", !active.trends);
  el.expensesTab.classList.toggle("hidden", !active.expenses);
  el.settingsTab.classList.toggle("hidden", !active.settings);

  if (active.trends) renderTrends();
  if (active.expenses) renderExpensesView();
}

function setActiveTrendPanel(panelId) {
  const panels = Array.from(document.querySelectorAll(".trend-report-panel"));
  const navButtons = Array.from(document.querySelectorAll(".trend-nav-btn"));
  const panelExists = panels.some((panel) => panel.id === panelId);
  currentTrendPanel = panelExists ? panelId : "trendPanelTime";

  panels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== currentTrendPanel);
  });

  navButtons.forEach((button) => {
    const target = button.getAttribute("data-trend-target");
    button.classList.toggle("active", target === currentTrendPanel);
  });
}

function getExternalVendors() {
  return vendors.filter((v) => !isInternalSeller(v.name));
}

function renderVendorOptions() {
  const current = el.vendorSelect.value;
  el.vendorSelect.innerHTML = '<option value="">Select vendor</option>';
  getExternalVendors().forEach((vendor) => {
    const option = document.createElement("option");
    option.value = vendor.id;
    option.textContent = `${vendor.name} (${Number(vendor.commissionRate)}%)`;
    el.vendorSelect.appendChild(option);
  });
  const exists = getExternalVendors().some((v) => v.id === current);
  el.vendorSelect.value = exists ? current : "";
}

function renderVendorPaymentOptions() {
  const current = el.paymentVendorSelect.value;
  el.paymentVendorSelect.innerHTML = '<option value="">Select vendor</option>';
  getExternalVendors().forEach((vendor) => {
    const option = document.createElement("option");
    option.value = vendor.name;
    option.textContent = vendor.name;
    el.paymentVendorSelect.appendChild(option);
  });
  const exists = getExternalVendors().some((v) => v.name === current);
  el.paymentVendorSelect.value = exists ? current : "";
}

function findTopLabel(entries, key) {
  const totals = new Map();
  entries.forEach((entry) => {
    const label = (entry[key] || "").toString().trim();
    if (!label) return;
    totals.set(label, (totals.get(label) || 0) + (Number(entry.saleAmount) || 0));
  });
  let top = "-";
  let max = 0;
  totals.forEach((value, label) => {
    if (value > max) {
      max = value;
      top = label;
    }
  });
  return top;
}

function getCurrentSalesEntries() {
  if (!currentRange.start || !currentRange.end) return sales;
  return sales.filter((entry) => entry.date >= currentRange.start && entry.date <= currentRange.end);
}

function getSalesSummary(entries) {
  let totalRevenue = 0;
  let storeRevenue = 0;
  let vendorPayouts = 0;
  let renSales = 0;
  let steisySales = 0;
  let highestSale = 0;
  let lowestSale = 0;
  const vendorSet = new Set();
  const paymentTotals = new Map();

  entries.forEach((entry) => {
    const saleAmount = Number(entry.saleAmount) || 0;
    const metrics = calculateSaleMetrics(entry);
    const internal = isInternalSeller(entry.vendorName);
    totalRevenue += saleAmount;
    storeRevenue += internal ? metrics.storeEarned : Number(entry.storeRevenue) || metrics.storeEarned;
    vendorPayouts += internal ? 0 : Number(entry.vendorRevenue) || metrics.vendorPayout;

    const vendorKey = normalizeVendorKey(entry.vendorName);
    if (vendorKey === "ren") renSales += saleAmount;
    if (vendorKey === "steisy") steisySales += saleAmount;
    if (!internal && entry.vendorName) vendorSet.add(vendorKey);
    const paymentKey = normalizePaymentMethodKey(entry.paymentMethod);
    if (paymentKey) paymentTotals.set(paymentKey, (paymentTotals.get(paymentKey) || 0) + saleAmount);

    if (entries.length === 1) {
      highestSale = saleAmount;
      lowestSale = saleAmount;
    } else {
      highestSale = Math.max(highestSale, saleAmount);
      lowestSale = lowestSale === 0 ? saleAmount : Math.min(lowestSale, saleAmount);
    }
  });

  const avg = entries.length ? totalRevenue / entries.length : 0;
  const datedSales = sales
    .map((entry) => entry.date || "")
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date));
  const latestDataDateIso = datedSales.length ? datedSales.reduce((max, date) => (date > max ? date : max), datedSales[0]) : "";

  const referenceDate = latestDataDateIso ? new Date(`${latestDataDateIso}T00:00:00`) : new Date();
  const referenceYear = referenceDate.getFullYear();
  const referenceMonth = referenceDate.getMonth() + 1;
  const referenceDay = referenceDate.getDate();
  const referenceDateIso = `${referenceYear}-${formatForFile(referenceMonth)}-${formatForFile(referenceDay)}`;
  const monthPrefix = `${referenceYear}-${formatForFile(referenceMonth)}-`;

  const currentMonthEntries = sales.filter((entry) => (entry.date || "").startsWith(monthPrefix));
  const monthEntriesToDate = currentMonthEntries.filter((entry) => (entry.date || "") <= referenceDateIso);
  const monthSalesToDate = monthEntriesToDate.reduce((acc, entry) => acc + (Number(entry.saleAmount) || 0), 0);
  const elapsedSales = monthSalesToDate;
  const dailySalesMap = new Map();
  monthEntriesToDate.forEach((entry) => {
    const dateKey = entry.date || "";
    if (!dateKey) return;
    dailySalesMap.set(dateKey, (dailySalesMap.get(dateKey) || 0) + (Number(entry.saleAmount) || 0));
  });

  const daysInMonth = new Date(referenceYear, referenceMonth, 0).getDate();
  const elapsedDays = referenceDay;
  const weekdayTotals = Array.from({ length: 7 }, () => 0);
  const weekdayCounts = Array.from({ length: 7 }, () => 0);

  for (let day = 1; day <= elapsedDays; day += 1) {
    const dateIso = `${referenceYear}-${formatForFile(referenceMonth)}-${formatForFile(day)}`;
    const weekday = parseWeekday(dateIso);
    if (weekday === null) continue;
    weekdayTotals[weekday] += dailySalesMap.get(dateIso) || 0;
    weekdayCounts[weekday] += 1;
  }

  const overallDayAverage = elapsedDays > 0 ? elapsedSales / elapsedDays : 0;
  let projectedRemainder = 0;
  for (let day = elapsedDays + 1; day <= daysInMonth; day += 1) {
    const dateIso = `${referenceYear}-${formatForFile(referenceMonth)}-${formatForFile(day)}`;
    const weekday = parseWeekday(dateIso);
    if (weekday === null) continue;
    const weekdayAverage = weekdayCounts[weekday] > 0 ? weekdayTotals[weekday] / weekdayCounts[weekday] : overallDayAverage;
    projectedRemainder += weekdayAverage;
  }

  const projectedMonthSales = elapsedSales + projectedRemainder;

  return {
    totalRevenue,
    storeRevenue,
    vendorPayouts,
    monthSalesToDate,
    projectedMonthSales,
    salesCount: entries.length,
    averageSale: avg,
    topVendor: findTopLabel(entries.filter((e) => !isInternalSeller(e.vendorName)), "vendorName"),
    topPayment: findTopLabel(entries, "paymentMethod"),
    renSales,
    steisySales,
    highestSale,
    lowestSale: entries.length ? lowestSale : 0,
    externalVendorCount: vendorSet.size,
    paymentTotals,
  };
}

function formatReportMetricValue(metricKey, summary) {
  if ((metricKey || "").toString().startsWith("paymentTotal::")) {
    const paymentKey = metricKey.toString().replace("paymentTotal::", "");
    return formatMoney(summary.paymentTotals.get(paymentKey) || 0);
  }
  const option = getReportMetricOption(metricKey);
  const value = summary[option.key];
  if (option.type === "money") return formatMoney(value);
  if (option.type === "count") return String(Number(value) || 0);
  return value || "-";
}

function renderTotals(entries) {
  if (!el.reportGrid) return;
  const summary = getSalesSummary(entries);
  const reportMetrics = sanitizeReportCardMetrics(settings.reportCardMetrics);
  el.reportGrid.innerHTML = "";

  for (let i = 0; i < REPORT_BOX_COUNT; i += 1) {
    const metricKey = reportMetrics[i];
    const option = getReportMetricOption(metricKey);
    const article = document.createElement("article");
    const boxLetter = REPORT_BOX_LETTERS[i] || String(i + 1);
    article.innerHTML = `<p>${formatReportMetricValue(metricKey, summary)}</p><p class="metric-label">${option.label}</p><span class="box-marker">${boxLetter}</span>`;
    el.reportGrid.appendChild(article);
  }
}

function renderSales(entries) {
  el.salesBody.innerHTML = "";
  entries.forEach((entry) => {
    const tr = document.createElement("tr");
    const dateParts = getDateParts(entry.date);
    const metrics = calculateSaleMetrics(entry);
    const internal = isInternalSeller(entry.vendorName);
    const storeEarned = internal ? metrics.storeEarned : Number(entry.storeRevenue) || metrics.storeEarned;
    const vendorPayout = internal ? 0 : Number(entry.vendorRevenue) || metrics.vendorPayout;

    tr.innerHTML = `
      <td>${dateParts.month}</td>
      <td>${dateParts.year}</td>
      <td>${dateParts.day}</td>
      <td>${entry.date || ""}</td>
      <td>${formatTimeDisplay(entry.time)}</td>
      <td>${entry.category || ""}</td>
      <td>${entry.employee || ""}</td>
      <td>${entry.itemName || ""}</td>
      <td>${entry.vendorName || ""}</td>
      <td>${formatMoney(entry.saleAmount)}</td>
      <td>${entry.paymentMethod || ""}</td>
      <td>${Number(entry.commissionRate) ? `${Number(entry.commissionRate)}%` : ""}</td>
      <td>${formatMoney(storeEarned)}</td>
      <td>${formatMoney(vendorPayout)}</td>
      <td><button class="danger" data-sale-id="${entry.id}" type="button">Delete</button></td>
    `;
    el.salesBody.appendChild(tr);
  });
  renderTotals(entries);
}

function renderVendorBalances() {
  el.vendorBalancesBody.innerHTML = "";
  const earnedMap = new Map();
  sales.forEach((entry) => {
    if (isInternalSeller(entry.vendorName)) return;
    const key = normalizeVendorKey(entry.vendorName);
    const metrics = calculateSaleMetrics(entry);
    const vendorRevenue = Number(entry.vendorRevenue) || metrics.vendorPayout;
    const current = earnedMap.get(key) || { name: entry.vendorName, earned: 0 };
    current.earned += vendorRevenue;
    earnedMap.set(key, current);
  });

  const paidMap = new Map();
  vendorPayments.forEach((p) => {
    const key = normalizeVendorKey(p.vendorName);
    paidMap.set(key, (paidMap.get(key) || 0) + (Number(p.amount) || 0));
  });

  const keys = new Set([...earnedMap.keys(), ...paidMap.keys()]);
  Array.from(keys)
    .sort()
    .forEach((key) => {
      const earned = earnedMap.get(key)?.earned || 0;
      const paid = paidMap.get(key) || 0;
      const owed = earned - paid;
      const name = earnedMap.get(key)?.name || key;
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${name}</td><td>${formatMoney(earned)}</td><td>${formatMoney(paid)}</td><td>${formatMoney(owed)}</td>`;
      el.vendorBalancesBody.appendChild(tr);
    });
}

function renderVendorPayments() {
  el.vendorPaymentsBody.innerHTML = "";
  [...vendorPayments]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((entry) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry.date || ""}</td>
        <td>${entry.vendorName || ""}</td>
        <td>${formatMoney(entry.amount)}</td>
        <td>${entry.method || ""}</td>
        <td><button class="danger" data-payment-id="${entry.id}" type="button">Delete</button></td>
      `;
      el.vendorPaymentsBody.appendChild(tr);
    });
}

function renderVendors() {
  el.vendorsBody.innerHTML = "";
  getExternalVendors().forEach((vendor) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${vendor.name}</td>
      <td>${Number(vendor.commissionRate)}%</td>
      <td><button class="danger" data-vendor-id="${vendor.id}" type="button">Delete</button></td>
    `;
    el.vendorsBody.appendChild(tr);
  });
  renderVendorOptions();
  renderVendorPaymentOptions();
  renderVendorBalances();
  renderVendorPayments();
}

function getEffectiveRevenues(entry) {
  const metrics = calculateSaleMetrics(entry);
  const internal = isInternalSeller(entry.vendorName);
  return {
    storeRevenue: internal ? metrics.storeEarned : Number(entry.storeRevenue) || metrics.storeEarned,
    vendorRevenue: internal ? 0 : Number(entry.vendorRevenue) || metrics.vendorPayout,
  };
}

function getTrendMetricValue(entry, metric) {
  if (metric === "count") return 1;
  if (metric === "store") return getEffectiveRevenues(entry).storeRevenue;
  if (metric === "vendor") return getEffectiveRevenues(entry).vendorRevenue;
  return Number(entry.saleAmount) || 0;
}

function formatTrendMetricValue(value, metric) {
  if (metric === "count") return String(Math.round(Number(value) || 0));
  return formatMoney(value);
}

function parseWeekday(dateIso) {
  const d = new Date(`${dateIso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d.getDay();
}

function parseHour(timeText) {
  if (!timeText) return null;
  const hour = Number(String(timeText).split(":")[0]);
  return Number.isFinite(hour) && hour >= 0 && hour <= 23 ? hour : null;
}

function parseTimeToStoreWindowMinutes(timeText) {
  const value = (timeText || "").toString().trim().toLowerCase();
  if (!value) return null;

  const amPmMatch = value.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (amPmMatch) {
    let hour = Number(amPmMatch[1]);
    const minute = Number(amPmMatch[2] || "0");
    const meridiem = amPmMatch[3];
    if (!Number.isFinite(hour) || !Number.isFinite(minute) || minute < 0 || minute > 59) return null;
    if (hour < 1 || hour > 12) return null;
    if (meridiem === "pm" && hour !== 12) hour += 12;
    if (meridiem === "am" && hour === 12) hour = 0;
    return hour * 60 + minute;
  }

  const basicMatch = value.match(/^(\d{1,2}):(\d{2})$/);
  if (!basicMatch) return null;
  let hour = Number(basicMatch[1]);
  const minute = Number(basicMatch[2]);
  if (!Number.isFinite(hour) || !Number.isFinite(minute) || minute < 0 || minute > 59) return null;
  if (hour < 0 || hour > 23) return null;

  // Assume ambiguous 1:00-7:59 values are PM, per store noon-7pm window rule.
  if (hour >= 1 && hour <= 7) hour += 12;
  if (hour === 0) hour = 12;
  return hour * 60 + minute;
}

function isAshleyEmployee(employeeText) {
  const normalized = (employeeText || "").toString().trim().toLowerCase();
  return normalized.includes("ashley");
}

function getTrendFiltersFromInputs() {
  return {
    start: el.trendStartDateInput.value,
    end: el.trendEndDateInput.value,
    granularity: el.trendGranularityInput.value,
    metric: el.trendMetricInput.value,
    category: el.trendCategoryInput.value,
    weekday: el.trendWeekdayInput.value,
    vendor: el.trendVendorInput.value,
    comparePrevious: Boolean(el.trendComparePrevInput.checked),
  };
}

function matchesTrendFilters(entry, filters) {
  if (filters.start && entry.date < filters.start) return false;
  if (filters.end && entry.date > filters.end) return false;
  if (filters.category && normalizeCategoryKey(entry.category || "Uncategorized") !== normalizeCategoryKey(filters.category)) return false;
  if (filters.vendor && (entry.vendorName || "") !== filters.vendor) return false;
  if (filters.weekday !== "") {
    const weekday = parseWeekday(entry.date);
    if (weekday === null || String(weekday) !== filters.weekday) return false;
  }
  return true;
}

function getTrendEntries(filters) {
  return sales.filter((entry) => matchesTrendFilters(entry, filters));
}

function startOfWeek(dateIso) {
  const d = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return `${d.getFullYear()}-${formatForFile(d.getMonth() + 1)}-${formatForFile(d.getDate())}`;
}

function getPeriodKey(dateIso, granularity) {
  if (granularity === "weekly") return startOfWeek(dateIso);
  if (granularity === "monthly") return (dateIso || "").slice(0, 7);
  return dateIso || "";
}

function aggregateByPeriod(entries, granularity, metric) {
  const map = new Map();
  entries.forEach((entry) => {
    const key = getPeriodKey(entry.date, granularity);
    if (!key) return;
    map.set(key, (map.get(key) || 0) + getTrendMetricValue(entry, metric));
  });
  const labels = Array.from(map.keys()).sort();
  return { labels, values: labels.map((label) => map.get(label) || 0) };
}

function getTrendMonthsFromEntries(entries) {
  return Array.from(
    new Set(
      entries
        .map((entry) => (entry.date || "").slice(0, 7))
        .filter((month) => /^\d{4}-\d{2}$/.test(month))
    )
  ).sort((a, b) => (a < b ? 1 : -1));
}

function formatMonthOptionLabel(monthIso) {
  const [yearText, monthText] = monthIso.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return monthIso;
  const date = new Date(year, month - 1, 1);
  return `${date.toLocaleDateString("en-US", { month: "long" })} ${year}`;
}

function populateTrendMonthSelect(selectEl, months) {
  if (!selectEl) return;
  const prev = selectEl.value;
  selectEl.innerHTML = '<option value="">All Months</option>';
  months.forEach((month) => {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = formatMonthOptionLabel(month);
    selectEl.appendChild(option);
  });
  if (prev && months.includes(prev)) selectEl.value = prev;
}

function filterEntriesByMonth(entries, monthIso) {
  if (!monthIso) return entries;
  return entries.filter((entry) => (entry.date || "").startsWith(`${monthIso}-`));
}

function buildPreviousPeriodFilters(filters) {
  if (!filters.start || !filters.end) return null;
  const start = new Date(`${filters.start}T00:00:00`);
  const end = new Date(`${filters.end}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const days = Math.floor((end - start) / 86400000) + 1;
  const prevEnd = new Date(start.getTime() - 86400000);
  const prevStart = new Date(prevEnd.getTime() - (days - 1) * 86400000);
  return {
    ...filters,
    start: `${prevStart.getFullYear()}-${formatForFile(prevStart.getMonth() + 1)}-${formatForFile(prevStart.getDate())}`,
    end: `${prevEnd.getFullYear()}-${formatForFile(prevEnd.getMonth() + 1)}-${formatForFile(prevEnd.getDate())}`,
    comparePrevious: false,
  };
}

function destroyTrendCharts() {
  Object.keys(trendCharts).forEach((k) => {
    if (trendCharts[k]) {
      trendCharts[k].destroy();
      trendCharts[k] = null;
    }
  });
}

function renderTrends() {
  if (!window.Chart) return;
  const filters = currentTrendFilters;
  const entries = getTrendEntries(filters);
  const months = getTrendMonthsFromEntries(entries);
  populateTrendMonthSelect(el.trendMonthTimeInput, months);
  populateTrendMonthSelect(el.trendMonthItemBreakdownInput, months);
  populateTrendMonthSelect(el.trendMonthCategoryInput, months);
  populateTrendMonthSelect(el.trendMonthWeekdayInput, months);
  populateTrendMonthSelect(el.trendMonthFrequencyInput, months);
  populateTrendMonthSelect(el.trendMonthEmployeeInput, months);

  const timeEntries = filterEntriesByMonth(entries, el.trendMonthTimeInput ? el.trendMonthTimeInput.value : "");
  const period = aggregateByPeriod(timeEntries, filters.granularity, filters.metric);
  const prevFilters = filters.comparePrevious ? buildPreviousPeriodFilters(filters) : null;
  const prevPeriod = prevFilters ? aggregateByPeriod(
    filterEntriesByMonth(getTrendEntries(prevFilters), el.trendMonthTimeInput ? el.trendMonthTimeInput.value : ""),
    filters.granularity,
    filters.metric
  )
    : { labels: [], values: [] };

  destroyTrendCharts();

  const datasets = [{ label: "Current", data: period.values, borderColor: "#d35d90", backgroundColor: "rgba(211,93,144,0.2)", tension: 0.2 }];
  if (prevFilters) {
    datasets.push({ label: "Previous Period", data: prevPeriod.values, borderColor: "#6e5060", borderDash: [4, 4], tension: 0.2 });
  }

  trendCharts.time = new Chart(el.timeTrendChartEl, { type: "line", data: { labels: period.labels, datasets }, options: { responsive: true, maintainAspectRatio: false } });

  const categoryMap = new Map();
  const categoryEntries = filterEntriesByMonth(entries, el.trendMonthCategoryInput ? el.trendMonthCategoryInput.value : "");
  categoryEntries.forEach((entry) => {
    const key = normalizeCategoryLabel(entry.category || "Uncategorized");
    categoryMap.set(key, (categoryMap.get(key) || 0) + getTrendMetricValue(entry, filters.metric));
  });
  const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
  const categoryLabels = sortedCategories.map(([label]) => label);
  const categoryValues = sortedCategories.map(([, value]) => value);
  trendCharts.category = new Chart(el.categoryTrendChartEl, {
    type: "bar",
    data: { labels: categoryLabels, datasets: [{ label: "By Category", data: categoryValues, backgroundColor: "#ef90b7" }] },
    options: { responsive: true, maintainAspectRatio: false },
  });

  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdayValues = [0, 0, 0, 0, 0, 0, 0];
  const weekdayEntries = filterEntriesByMonth(entries, el.trendMonthWeekdayInput ? el.trendMonthWeekdayInput.value : "");
  weekdayEntries.forEach((entry) => {
    const weekday = parseWeekday(entry.date);
    if (weekday !== null) weekdayValues[weekday] += getTrendMetricValue(entry, filters.metric);
  });
  trendCharts.weekday = new Chart(el.weekdayTrendChartEl, {
    type: "bar",
    data: { labels: weekdayNames, datasets: [{ label: "By Weekday", data: weekdayValues, backgroundColor: "#d35d90" }] },
    options: { responsive: true, maintainAspectRatio: false },
  });

  renderTimeFrequencyBars(filterEntriesByMonth(entries, el.trendMonthFrequencyInput ? el.trendMonthFrequencyInput.value : ""));
  renderItemPricePointBreakdown(filterEntriesByMonth(entries, el.trendMonthItemBreakdownInput ? el.trendMonthItemBreakdownInput.value : ""));
  renderEmployeeRevenueComparison(filterEntriesByMonth(entries, el.trendMonthEmployeeInput ? el.trendMonthEmployeeInput.value : ""));
}

function formatMinutesForDisplay(totalMinutes) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${formatForFile(minute)} ${suffix}`;
}

function renderTimeFrequencyBars(entries) {
  if (!el.timeFrequencyBars || !el.timeFrequencyInsights) return;
  const selectedWeekday = el.timeFrequencyWeekdayInput ? el.timeFrequencyWeekdayInput.value : "";
  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const startMinutes = 12 * 60;
  const endMinutes = 19 * 60;
  const step = 15;
  const bins = [];

  for (let minute = startMinutes; minute < endMinutes; minute += step) {
    bins.push({ minute, label: formatMinutesForDisplay(minute), count: 0 });
  }

  entries.forEach((entry) => {
    if (selectedWeekday !== "") {
      const weekday = parseWeekday(entry.date);
      if (weekday === null || String(weekday) !== selectedWeekday) return;
    }
    const minutes = parseTimeToStoreWindowMinutes(entry.time);
    if (minutes === null || minutes < startMinutes || minutes >= endMinutes) return;
    const index = Math.floor((minutes - startMinutes) / step);
    if (index >= 0 && index < bins.length) bins[index].count += 1;
  });

  const maxCount = bins.reduce((max, bin) => Math.max(max, bin.count), 0);
  el.timeFrequencyBars.innerHTML = "";
  const chart = document.createElement("div");
  chart.className = "freq-vertical-chart";

  bins.forEach((bin) => {
    const col = document.createElement("div");
    col.className = "freq-col";
    const heightPercent = maxCount > 0 ? (bin.count / maxCount) * 100 : 0;
    col.innerHTML = `
      <div class="freq-col-count">${bin.count}</div>
      <div class="freq-col-track">
        <div class="freq-col-fill" style="height:${heightPercent.toFixed(2)}%"></div>
      </div>
      <div class="freq-col-label">${bin.label}</div>
    `;
    chart.appendChild(col);
  });
  el.timeFrequencyBars.appendChild(chart);

  if (maxCount === 0) {
    const weekdayLabel = selectedWeekday === "" ? "all days" : weekdayNames[Number(selectedWeekday)] || "selected day";
    el.timeFrequencyInsights.textContent = `No timed sales in the current filters for ${weekdayLabel}.`;
    return;
  }

  const sorted = [...bins].sort((a, b) => b.count - a.count);
  const top = sorted.slice(0, 3).map((bin) => `${bin.label} (${bin.count})`).join(", ");
  const bottom = [...bins].filter((bin) => bin.count > 0).sort((a, b) => a.count - b.count).slice(0, 3).map((bin) => `${bin.label} (${bin.count})`).join(", ");
  const weekdayLabel = selectedWeekday === "" ? "All Days" : (weekdayNames[Number(selectedWeekday)] || "Selected Day");
  el.timeFrequencyInsights.textContent = `${weekdayLabel} - Highest frequency intervals: ${top}. Lowest active intervals: ${bottom || "N/A"}.`;
}

function renderEmployeeRevenueComparison(entries) {
  if (!window.Chart || !el.employeeRevenueChartEl || !el.employeeRevenueSummary) return;

  const dateMap = new Map();
  entries.forEach((entry) => {
    const date = entry.date || "";
    if (!date) return;
    const current = dateMap.get(date) || { revenue: 0, ashleyWorked: false };
    current.revenue += Number(entry.saleAmount) || 0;
    if (isAshleyEmployee(entry.employee)) current.ashleyWorked = true;
    dateMap.set(date, current);
  });

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdayRevenue = Array.from({ length: 7 }, () => 0);
  const weekdayExpense = Array.from({ length: 7 }, () => 0);
  const ashleyDays = Array.from({ length: 7 }, () => 0);

  dateMap.forEach((info, date) => {
    if (!info.ashleyWorked) return;
    const weekday = parseWeekday(date);
    if (weekday === null) return;
    ashleyDays[weekday] += 1;
    weekdayExpense[weekday] += 75;
    weekdayRevenue[weekday] += info.revenue;
  });

  if (trendCharts.employee) {
    trendCharts.employee.destroy();
    trendCharts.employee = null;
  }
  trendCharts.employee = new Chart(el.employeeRevenueChartEl, {
    type: "bar",
    data: {
      labels: weekdayLabels,
      datasets: [
        { label: "Revenue On Ashley Days", data: weekdayRevenue, backgroundColor: "#d35d90" },
        { label: "Ashley Labor Expense ($75/day)", data: weekdayExpense, backgroundColor: "#6e5060" },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  const totalDays = ashleyDays.reduce((acc, value) => acc + value, 0);
  const totalRevenue = weekdayRevenue.reduce((acc, value) => acc + value, 0);
  const totalExpense = weekdayExpense.reduce((acc, value) => acc + value, 0);
  const net = totalRevenue - totalExpense;
  el.employeeRevenueSummary.textContent = totalDays > 0
    ? `Ashley worked ${totalDays} day(s). Revenue on those days: ${formatMoney(totalRevenue)}. Labor expense: ${formatMoney(totalExpense)}. Net after labor: ${formatMoney(net)}.`
    : "No Ashley workdays found in the current filters/month.";
}

function renderItemPricePointBreakdown(filteredTrendEntries) {
  const entries = filteredTrendEntries || getTrendEntries(currentTrendFilters);
  const itemNames = Array.from(
    new Set(
      entries
        .map((entry) => (entry.itemName || "").toString().trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  const previousValue = el.trendItemSelect.value;
  el.trendItemSelect.innerHTML = '<option value="">Select item</option>';
  itemNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    el.trendItemSelect.appendChild(option);
  });

  let selectedItem = previousValue && itemNames.includes(previousValue) ? previousValue : "";
  if (!selectedItem && itemNames.length) selectedItem = itemNames[0];
  el.trendItemSelect.value = selectedItem;

  el.trendItemPriceBody.innerHTML = "";
  if (!selectedItem) {
    el.trendItemSummary.textContent = "No matching items for the current trend filters.";
    if (trendCharts.itemPrice) {
      trendCharts.itemPrice.destroy();
      trendCharts.itemPrice = null;
    }
    return;
  }

  const selectedEntries = entries.filter((entry) => (entry.itemName || "").toString().trim() === selectedItem);
  const priceMap = new Map();
  let totalQty = 0;
  let totalRevenue = 0;

  selectedEntries.forEach((entry) => {
    const price = Number(entry.saleAmount) || 0;
    const key = price.toFixed(2);
    const current = priceMap.get(key) || { price, qty: 0, revenue: 0 };
    current.qty += 1;
    current.revenue += price;
    priceMap.set(key, current);
    totalQty += 1;
    totalRevenue += price;
  });

  Array.from(priceMap.values())
    .sort((a, b) => a.price - b.price)
    .forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${formatMoney(row.price)}</td>
        <td>${row.qty}</td>
        <td>${formatMoney(row.revenue)}</td>
      `;
      el.trendItemPriceBody.appendChild(tr);
    });

  const sortedPriceRows = Array.from(priceMap.values()).sort((a, b) => a.price - b.price);
  if (trendCharts.itemPrice) {
    trendCharts.itemPrice.destroy();
    trendCharts.itemPrice = null;
  }
  if (window.Chart && el.trendItemPriceChartEl) {
    trendCharts.itemPrice = new Chart(el.trendItemPriceChartEl, {
      type: "bar",
      data: {
        labels: sortedPriceRows.map((row) => formatMoney(row.price)),
        datasets: [{ label: "Frequency (Sales Count)", data: sortedPriceRows.map((row) => row.qty), backgroundColor: "#ef90b7" }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  el.trendItemSummary.textContent = `${selectedItem}: ${totalQty} sales across ${priceMap.size} unique price points (${formatMoney(totalRevenue)} total).`;
}

function refreshTrendFilterOptions() {
  const categories = new Map();
  const vendorNames = new Set();
  sales.forEach((entry) => {
    const categoryLabel = normalizeCategoryLabel(entry.category || "Uncategorized");
    categories.set(normalizeCategoryKey(categoryLabel), categoryLabel);
    if (entry.vendorName) vendorNames.add(entry.vendorName);
  });

  const selectedCategory = el.trendCategoryInput.value;
  el.trendCategoryInput.innerHTML = '<option value="">All Categories</option>';
  Array.from(categories.values()).sort().forEach((c) => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    el.trendCategoryInput.appendChild(option);
  });
  const selectedCategoryKey = normalizeCategoryKey(selectedCategory);
  if (selectedCategoryKey && categories.has(selectedCategoryKey)) {
    el.trendCategoryInput.value = categories.get(selectedCategoryKey);
  }

  const selectedVendor = el.trendVendorInput.value;
  el.trendVendorInput.innerHTML = '<option value="">All Vendors</option>';
  Array.from(vendorNames).sort().forEach((v) => {
    const option = document.createElement("option");
    option.value = v;
    option.textContent = v;
    el.trendVendorInput.appendChild(option);
  });
  if (vendorNames.has(selectedVendor)) el.trendVendorInput.value = selectedVendor;
}

function getCurrentExpenses() {
  return expenses.filter((e) => {
    if (currentExpenseFilters.start && e.date < currentExpenseFilters.start) return false;
    if (currentExpenseFilters.end && e.date > currentExpenseFilters.end) return false;
    return true;
  });
}

function renderExpensesView() {
  const list = getCurrentExpenses();
  el.expenseRangeLabel.textContent = currentExpenseFilters.start && currentExpenseFilters.end
    ? `Showing ${currentExpenseFilters.start} to ${currentExpenseFilters.end}.`
    : "Showing all expense dates.";

  el.expensesBody.innerHTML = "";
  list
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((entry) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${entry.date || ""}</td>
        <td>${entry.category || ""}</td>
        <td>${entry.vendorName || ""}</td>
        <td>${formatMoney(entry.amount)}</td>
        <td>${entry.method || ""}</td>
        <td>${entry.recurring ? "Yes" : "No"}</td>
        <td>${entry.notes || ""}</td>
        <td><button class="danger" data-expense-id="${entry.id}" type="button">Delete</button></td>
      `;
      el.expensesBody.appendChild(tr);
    });

  const total = list.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  const recurringMonthly = list
    .filter((e) => e.recurring)
    .reduce((acc, e) => acc + (Number(e.amount) || 0), 0);

  const monthSet = new Set(
    list
      .map((e) => (e.date || "").slice(0, 7))
      .filter(Boolean)
  );
  const monthCount = monthSet.size || 1;
  const avgMonthly = total / monthCount;
  const months = Number(currentExpenseFilters.months) || 6;
  const projected = recurringMonthly * months + (avgMonthly - recurringMonthly) * months;

  el.totalExpensesEl.textContent = formatMoney(total);
  el.recurringMonthlyEl.textContent = formatMoney(recurringMonthly);
  el.avgMonthlyExpensesEl.textContent = formatMoney(avgMonthly);
  el.projectedExpensesEl.textContent = formatMoney(Math.max(projected, 0));
}

function updateSalesView() {
  const entries = getCurrentSalesEntries();
  el.reportRangeLabel.textContent = currentRange.start && currentRange.end
    ? `Showing ${currentRange.start} to ${currentRange.end}.`
    : "Showing all dates.";
  renderSales(entries);
  renderVendorBalances();
  refreshTrendFilterOptions();
  renderTrends();
}

function buildPdfFilename() {
  const now = new Date();
  return `sales-report-${now.getFullYear()}-${formatForFile(now.getMonth() + 1)}-${formatForFile(now.getDate())}_${formatForFile(now.getHours())}-${formatForFile(now.getMinutes())}.pdf`;
}

function buildExcelFilename() {
  const now = new Date();
  return `sales-report-${now.getFullYear()}-${formatForFile(now.getMonth() + 1)}-${formatForFile(now.getDate())}_${formatForFile(now.getHours())}-${formatForFile(now.getMinutes())}.xlsx`;
}

function getVendorBalanceRows() {
  const earnedMap = new Map();
  sales.forEach((entry) => {
    if (isInternalSeller(entry.vendorName)) return;
    const key = normalizeVendorKey(entry.vendorName);
    const metrics = calculateSaleMetrics(entry);
    const vendorRevenue = Number(entry.vendorRevenue) || metrics.vendorPayout;
    const current = earnedMap.get(key) || { vendor: entry.vendorName, earnedToDate: 0 };
    current.earnedToDate += vendorRevenue;
    earnedMap.set(key, current);
  });

  const paidMap = new Map();
  vendorPayments.forEach((payment) => {
    const key = normalizeVendorKey(payment.vendorName);
    paidMap.set(key, (paidMap.get(key) || 0) + (Number(payment.amount) || 0));
  });

  const keys = new Set([...earnedMap.keys(), ...paidMap.keys()]);
  return Array.from(keys)
    .sort()
    .map((key) => {
      const earned = earnedMap.get(key)?.earnedToDate || 0;
      const paid = paidMap.get(key) || 0;
      return {
        Vendor: earnedMap.get(key)?.vendor || key,
        EarnedToDate: earned,
        PaidToDate: paid,
        OwedToDate: earned - paid,
      };
    });
}

function getTrendSummaryRows() {
  const filters = currentTrendFilters;
  const entries = getTrendEntries(filters);
  const period = aggregateByPeriod(entries, filters.granularity, filters.metric);
  return period.labels.map((label, index) => ({
    Period: label,
    Value: period.values[index] || 0,
    Metric: filters.metric,
    Granularity: filters.granularity,
  }));
}

function downloadReportExcel() {
  if (!window.XLSX) {
    window.alert("Excel library failed to load. Refresh and try again.");
    return;
  }

  const workbook = window.XLSX.utils.book_new();
  const salesEntries = getCurrentSalesEntries();
  const salesRows = salesEntries.map((entry) => {
    const revenues = getEffectiveRevenues(entry);
    return {
      Date: entry.date || "",
      Time: entry.time || "",
      Category: entry.category || "",
      Employee: entry.employee || "",
      Item: entry.itemName || "",
      Vendor: entry.vendorName || "",
      SaleAmount: Number(entry.saleAmount) || 0,
      PaymentMethod: entry.paymentMethod || "",
      CommissionRate: Number(entry.commissionRate) || 0,
      StoreRevenue: revenues.storeRevenue,
      VendorPayout: revenues.vendorRevenue,
    };
  });

  const expenseRows = getCurrentExpenses().map((entry) => ({
    Date: entry.date || "",
    Category: entry.category || "",
    VendorOrPayee: entry.vendorName || "",
    Amount: Number(entry.amount) || 0,
    Method: entry.method || "",
    RecurringMonthly: entry.recurring ? "Yes" : "No",
    Notes: entry.notes || "",
  }));

  const vendorPaymentRows = [...vendorPayments].map((entry) => ({
    Date: entry.date || "",
    Vendor: entry.vendorName || "",
    Amount: Number(entry.amount) || 0,
    Method: entry.method || "",
  }));

  const sheets = [
    { name: "Sales", rows: salesRows },
    { name: "VendorBalances", rows: getVendorBalanceRows() },
    { name: "VendorPayments", rows: vendorPaymentRows },
    { name: "Expenses", rows: expenseRows },
    { name: "TrendSummary", rows: getTrendSummaryRows() },
  ];

  sheets.forEach((sheet) => {
    const ws = window.XLSX.utils.json_to_sheet(sheet.rows.length ? sheet.rows : [{ Info: "No data" }]);
    window.XLSX.utils.book_append_sheet(workbook, ws, sheet.name);
  });

  window.XLSX.writeFile(workbook, buildExcelFilename());
}

function downloadReportPdf(entries) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.alert("PDF library failed to load. Refresh and try again.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  let y = 44;
  const left = 40;
  const lineHeight = 14;

  let totalRevenue = 0;
  let storeRevenue = 0;
  let vendorPayouts = 0;
  entries.forEach((entry) => {
    const saleAmount = Number(entry.saleAmount) || 0;
    const revenues = getEffectiveRevenues(entry);
    totalRevenue += saleAmount;
    storeRevenue += revenues.storeRevenue;
    vendorPayouts += revenues.vendorRevenue;
  });

  doc.setFontSize(14);
  doc.text(settings.pageTitle || "Vintage Store Sales Report", left, y);
  y += 20;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, left, y);
  y += lineHeight;
  doc.text(`Range: ${currentRange.start && currentRange.end ? `${currentRange.start} to ${currentRange.end}` : "All Dates"}`, left, y);
  y += lineHeight * 2;

  doc.text(`Total Revenue: ${formatMoney(totalRevenue)}`, left, y); y += lineHeight;
  doc.text(`Store Revenue: ${formatMoney(storeRevenue)}`, left, y); y += lineHeight;
  doc.text(`Vendor Payouts: ${formatMoney(vendorPayouts)}`, left, y); y += lineHeight;
  doc.text(`Sales Count: ${entries.length}`, left, y); y += lineHeight * 2;

  doc.text("Sales:", left, y); y += lineHeight;

  entries.slice(0, 120).forEach((entry) => {
    const line = `${entry.date || ""} ${formatTimeDisplay(entry.time)} | ${entry.category || ""} | ${entry.vendorName || ""} | ${formatMoney(entry.saleAmount)} | ${entry.paymentMethod || ""}`;
    if (y > 740) {
      doc.addPage();
      y = 44;
    }
    doc.text(line.slice(0, 120), left, y);
    y += lineHeight;
  });

  doc.save(buildPdfFilename());
}

function importFromCsvText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim() !== "");
  if (lines.length < 2) throw new Error("CSV has no data rows.");

  const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const idx = {
    date: header.indexOf("date"),
    time: header.indexOf("time"),
    category: header.indexOf("category"),
    employee: header.indexOf("employee"),
    item: header.indexOf("item"),
    vendor: header.indexOf("vendor"),
    price: header.indexOf("price"),
    payment: header.indexOf("payment method"),
    commission: header.indexOf("store commision rate"),
  };

  const required = [idx.date, idx.employee, idx.item, idx.vendor, idx.price, idx.payment, idx.commission];
  if (required.some((v) => v === -1)) {
    throw new Error("CSV format mismatch. Expected Date, Employee, Item, Vendor, Price, Payment Method, Store Commision Rate columns.");
  }

  const imported = [];
  const vendorMap = new Map();
  let currentDate = "";

  for (let i = 1; i < lines.length; i += 1) {
    const row = parseCsvLine(lines[i]);
    const maybeDate = normalizeDateForInput(row[idx.date]);
    if (maybeDate) currentDate = maybeDate;
    if (!currentDate) continue;

    const itemName = (row[idx.item] || "").trim();
    const vendorName = (row[idx.vendor] || "").trim();
    const saleAmount = parseCurrency(row[idx.price]);
    if (!itemName || !vendorName || saleAmount <= 0) continue;

    const category = idx.category >= 0 ? (row[idx.category] || "").trim() : itemName;
    const commissionRate = parsePercent(row[idx.commission]);
    const metrics = calculateSaleMetrics({ saleAmount, commissionRate, vendorName });

    imported.push(
      normalizeSaleShape({
        id: crypto.randomUUID(),
        date: currentDate,
        time: idx.time >= 0 ? (row[idx.time] || "").trim() : "",
        category,
        employee: (row[idx.employee] || "").trim(),
        itemName,
        vendorName,
        paymentMethod: (row[idx.payment] || "").trim(),
        commissionRate,
        saleAmount,
        storeRevenue: metrics.storeEarned,
        vendorRevenue: metrics.vendorPayout,
      })
    );

    if (!isInternalSeller(vendorName)) {
      const key = normalizeVendorKey(vendorName);
      const existing = vendorMap.get(key);
      if (!existing) {
        vendorMap.set(key, { id: crypto.randomUUID(), name: vendorName, commissionRate });
      } else if ((Number(existing.commissionRate) || 0) === 0 && commissionRate > 0) {
        existing.commissionRate = commissionRate;
      }
    }
  }

  if (!imported.length) throw new Error("No valid sale rows found in CSV.");

  sales = imported;
  vendors = Array.from(vendorMap.values());
  saveKey(STORAGE_KEYS.sales, sales);
  saveKey(STORAGE_KEYS.vendors, vendors);
  renderVendors();
  updateSalesView();
}

function applySettingsToUI() {
  document.title = settings.pageTitle || DEFAULT_SETTINGS.pageTitle;
  el.pageTitleHeading.textContent = settings.pageTitle || DEFAULT_SETTINGS.pageTitle;
  document.documentElement.style.setProperty("--bg", settings.bgColor || DEFAULT_SETTINGS.bgColor);
  document.documentElement.style.setProperty("--panel", settings.panelColor || DEFAULT_SETTINGS.panelColor);
  document.documentElement.style.setProperty("--box", settings.dataBoxColor || DEFAULT_SETTINGS.dataBoxColor);
  document.documentElement.style.setProperty("--line", settings.borderColor || DEFAULT_SETTINGS.borderColor);
  document.documentElement.style.setProperty("--font-size-base", `${Number(settings.fontSize) || DEFAULT_SETTINGS.fontSize}px`);
  el.commissionInput.value = Number(settings.defaultCommission) || DEFAULT_SETTINGS.defaultCommission;
  el.timeInput.required = Boolean(settings.requireTime);
}

function renderReportCardSettingsControls() {
  if (!el.settingsReportCardsConfig) return;
  const selected = sanitizeReportCardMetrics(settings.reportCardMetrics);
  const metricOptions = getReportMetricOptions(selected);
  el.settingsReportCardsConfig.innerHTML = "";

  for (let i = 0; i < REPORT_BOX_COUNT; i += 1) {
    const label = document.createElement("label");
    label.innerHTML = `Box ${i + 1}`;
    const select = document.createElement("select");
    select.name = `settingsReportCard${i + 1}`;
    select.setAttribute("data-report-box-index", String(i));

    metricOptions.forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.key;
      opt.textContent = option.label;
      select.appendChild(opt);
    });

    select.value = selected[i];
    label.appendChild(select);
    el.settingsReportCardsConfig.appendChild(label);
  }
}

function syncSettingsForm() {
  el.settingsPageTitle.value = settings.pageTitle;
  el.settingsBgColor.value = settings.bgColor;
  if (el.settingsPanelColor) el.settingsPanelColor.value = settings.panelColor || DEFAULT_SETTINGS.panelColor;
  if (el.settingsDataBoxColor) el.settingsDataBoxColor.value = settings.dataBoxColor || DEFAULT_SETTINGS.dataBoxColor;
  if (el.settingsBorderColor) el.settingsBorderColor.value = settings.borderColor || DEFAULT_SETTINGS.borderColor;
  el.settingsFontSize.value = String(settings.fontSize);
  el.settingsCurrency.value = settings.currency;
  el.settingsDefaultCommission.value = String(settings.defaultCommission);
  el.settingsRequireTime.checked = Boolean(settings.requireTime);
  renderReportCardSettingsControls();
}

function setupEvents() {
  el.tabSales.addEventListener("click", () => switchTab("sales"));
  el.tabVendors.addEventListener("click", () => switchTab("vendors"));
  el.tabTrends.addEventListener("click", () => switchTab("trends"));
  el.tabExpenses.addEventListener("click", () => switchTab("expenses"));
  el.tabSettings.addEventListener("click", () => switchTab("settings"));

  el.vendorSelect.addEventListener("change", () => {
    const selected = vendors.find((v) => v.id === el.vendorSelect.value);
    if (!selected) return;
    el.vendorNameInput.value = selected.name;
    el.commissionInput.value = selected.commissionRate;
  });

  el.itemNameInput.addEventListener("blur", () => {
    const currentCategory = (el.saleForm.category?.value || "").toString().trim();
    if (!currentCategory) {
      const item = (el.itemNameInput.value || "").toString().trim();
      if (item && el.saleForm.category) el.saleForm.category.value = normalizeCategoryLabel(item);
    }
  });

  if (el.saleForm.category) {
    el.saleForm.category.addEventListener("blur", () => {
      const value = (el.saleForm.category.value || "").toString().trim();
      if (!value) return;
      el.saleForm.category.value = normalizeCategoryLabel(value);
    });
  }

  el.saleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(el.saleForm);
    const selectedVendor = vendors.find((v) => v.id === el.vendorSelect.value);

    const date = normalizeDateForInput(form.get("date"));
    const time = (form.get("time") || "").toString().trim();
    const itemName = (form.get("itemName") || "").toString().trim();
    const vendorName = (selectedVendor?.name || form.get("vendorName") || "").toString().trim();
    const saleAmount = Number(form.get("saleAmount") || 0);
    if (!date || !itemName || !vendorName || saleAmount <= 0) {
      window.alert("Date, item, vendor, and sale amount are required.");
      return;
    }
    if (settings.requireTime && !time) {
      window.alert("Time is required by settings.");
      return;
    }

    const commissionRate = Number(selectedVendor?.commissionRate ?? form.get("commissionRate") ?? settings.defaultCommission);
    const metrics = calculateSaleMetrics({ saleAmount, commissionRate, vendorName });

    sales.push(
      normalizeSaleShape({
        id: crypto.randomUUID(),
        date,
        time,
        category: normalizeCategoryLabel((form.get("category") || "").toString().trim() || itemName),
        employee: (form.get("employee") || "").toString().trim(),
        itemName,
        vendorName,
        paymentMethod: (form.get("paymentMethod") || "").toString().trim(),
        commissionRate,
        saleAmount,
        storeRevenue: metrics.storeEarned,
        vendorRevenue: metrics.vendorPayout,
      })
    );

    saveKey(STORAGE_KEYS.sales, sales);
    el.saleForm.reset();
    el.dateInput.valueAsDate = new Date();
    el.timeInput.value = getNowTimeString();
    el.commissionInput.value = Number(settings.defaultCommission) || 30;
    updateSalesView();
  });

  el.salesBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches("button[data-sale-id]")) return;
    const id = target.getAttribute("data-sale-id");
    sales = sales.filter((s) => s.id !== id);
    saveKey(STORAGE_KEYS.sales, sales);
    updateSalesView();
  });

  el.clearAllBtn.addEventListener("click", () => {
    if (!window.confirm("Delete all sales records?")) return;
    sales = [];
    saveKey(STORAGE_KEYS.sales, sales);
    updateSalesView();
  });

  el.addVendorBtn.addEventListener("click", () => {
    const form = new FormData(el.vendorForm);
    const name = (form.get("vendorDirectoryName") || "").toString().trim();
    const commissionRate = Number(form.get("vendorDirectoryCommission") || 0);
    if (!name) return window.alert("Vendor name is required.");
    if (isInternalSeller(name)) return window.alert("Ren and Steisy are in-house sellers, not vendors.");
    if (commissionRate < 0 || commissionRate > 100) return window.alert("Commission must be between 0 and 100.");
    if (vendors.some((v) => normalizeVendorKey(v.name) === normalizeVendorKey(name))) {
      return window.alert("A vendor with that name already exists.");
    }
    vendors.unshift({ id: crypto.randomUUID(), name, commissionRate });
    saveKey(STORAGE_KEYS.vendors, vendors);
    el.vendorForm.reset();
    el.settingsDefaultCommission.value = String(settings.defaultCommission);
    renderVendors();
  });

  el.vendorsBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches("button[data-vendor-id]")) return;
    const id = target.getAttribute("data-vendor-id");
    const vendor = vendors.find((v) => v.id === id);
    vendors = vendors.filter((v) => v.id !== id);
    if (vendor) {
      const key = normalizeVendorKey(vendor.name);
      vendorPayments = vendorPayments.filter((p) => normalizeVendorKey(p.vendorName) !== key);
      saveKey(STORAGE_KEYS.vendorPayments, vendorPayments);
    }
    saveKey(STORAGE_KEYS.vendors, vendors);
    renderVendors();
    updateSalesView();
  });

  el.addVendorPaymentBtn.addEventListener("click", () => {
    const form = new FormData(el.vendorPaymentForm);
    const vendorName = (form.get("paymentVendorId") || "").toString().trim();
    const date = normalizeDateForInput(form.get("paymentDate"));
    const amount = Number(form.get("paymentAmount") || 0);
    const method = (form.get("paymentMethodVendor") || "").toString().trim();
    if (!vendorName || !date || amount <= 0) return window.alert("Vendor, date, and amount are required.");
    vendorPayments.push({ id: crypto.randomUUID(), vendorName, date, amount, method });
    saveKey(STORAGE_KEYS.vendorPayments, vendorPayments);
    el.vendorPaymentForm.reset();
    el.paymentDateInput.valueAsDate = new Date();
    renderVendorPayments();
    renderVendorBalances();
  });

  el.vendorPaymentsBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches("button[data-payment-id]")) return;
    const id = target.getAttribute("data-payment-id");
    vendorPayments = vendorPayments.filter((p) => p.id !== id);
    saveKey(STORAGE_KEYS.vendorPayments, vendorPayments);
    renderVendorPayments();
    renderVendorBalances();
  });

  el.runReportBtn.addEventListener("click", () => {
    const start = el.reportStartDateInput.value;
    const end = el.reportEndDateInput.value;
    if (!start || !end) return window.alert("Choose both start and end dates.");
    if (start > end) return window.alert("Start date must be before or equal to end date.");
    currentRange = { start, end };
    updateSalesView();
  });

  el.showAllBtn.addEventListener("click", () => {
    currentRange = { start: "", end: "" };
    el.reportStartDateInput.value = "";
    el.reportEndDateInput.value = "";
    updateSalesView();
  });

  el.downloadPdfBtn.addEventListener("click", () => {
    downloadReportPdf(getCurrentSalesEntries());
  });

  el.downloadExcelBtn.addEventListener("click", () => {
    downloadReportExcel();
  });

  el.importCsvBtn.addEventListener("click", async () => {
    const file = el.csvFileInput.files?.[0];
    if (!file) return window.alert("Choose a CSV file first.");
    if (!window.confirm("Import will replace current sales and vendors. Continue?")) return;
    try {
      const text = await file.text();
      importFromCsvText(text);
      window.alert("CSV imported successfully.");
    } catch (error) {
      window.alert(`Import failed: ${error.message}`);
    }
  });

  el.applyTrendFiltersBtn.addEventListener("click", () => {
    const next = getTrendFiltersFromInputs();
    if (next.start && next.end && next.start > next.end) {
      return window.alert("Trend start date must be before or equal to end date.");
    }
    currentTrendFilters = next;
    renderTrends();
  });

  document.querySelectorAll(".trend-nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-trend-target") || "trendPanelTime";
      setActiveTrendPanel(target);
      renderTrends();
    });
  });

  if (el.timeFrequencyWeekdayInput) {
    el.timeFrequencyWeekdayInput.addEventListener("change", () => {
      renderTimeFrequencyBars(filterEntriesByMonth(getTrendEntries(currentTrendFilters), el.trendMonthFrequencyInput ? el.trendMonthFrequencyInput.value : ""));
    });
  }

  [
    el.trendMonthTimeInput,
    el.trendMonthItemBreakdownInput,
    el.trendMonthCategoryInput,
    el.trendMonthWeekdayInput,
    el.trendMonthFrequencyInput,
    el.trendMonthEmployeeInput,
  ].forEach((selectEl) => {
    if (!selectEl) return;
    selectEl.addEventListener("change", () => renderTrends());
  });

  el.trendItemSelect.addEventListener("change", () => {
    renderItemPricePointBreakdown(getTrendEntries(currentTrendFilters));
  });

  el.resetTrendFiltersBtn.addEventListener("click", () => {
    el.trendStartDateInput.value = "";
    el.trendEndDateInput.value = "";
    el.trendGranularityInput.value = "daily";
    el.trendMetricInput.value = "total";
    el.trendCategoryInput.value = "";
    el.trendWeekdayInput.value = "";
    el.trendVendorInput.value = "";
    el.trendComparePrevInput.checked = false;
    if (el.trendMonthTimeInput) el.trendMonthTimeInput.value = "";
    if (el.trendMonthItemBreakdownInput) el.trendMonthItemBreakdownInput.value = "";
    if (el.trendMonthCategoryInput) el.trendMonthCategoryInput.value = "";
    if (el.trendMonthWeekdayInput) el.trendMonthWeekdayInput.value = "";
    if (el.trendMonthFrequencyInput) el.trendMonthFrequencyInput.value = "";
    if (el.trendMonthEmployeeInput) el.trendMonthEmployeeInput.value = "";
    currentTrendFilters = getTrendFiltersFromInputs();
    renderTrends();
  });

  el.expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(el.expenseForm);
    const date = normalizeDateForInput(form.get("expenseDate"));
    const category = (form.get("expenseCategory") || "").toString().trim();
    const amount = Number(form.get("expenseAmount") || 0);
    if (!date || !category || amount <= 0) return window.alert("Date, category, and amount are required.");

    expenses.push(
      normalizeExpenseShape({
        id: crypto.randomUUID(),
        date,
        category,
        vendorName: (form.get("expenseVendor") || "").toString().trim(),
        amount,
        method: (form.get("expenseMethod") || "").toString().trim(),
        notes: (form.get("expenseNotes") || "").toString().trim(),
        recurring: Boolean(form.get("expenseRecurring")),
      })
    );
    saveKey(STORAGE_KEYS.expenses, expenses);
    el.expenseForm.reset();
    el.expenseForm.querySelector("#expenseDate").valueAsDate = new Date();
    renderExpensesView();
  });

  el.expensesBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches("button[data-expense-id]")) return;
    const id = target.getAttribute("data-expense-id");
    expenses = expenses.filter((e) => e.id !== id);
    saveKey(STORAGE_KEYS.expenses, expenses);
    renderExpensesView();
  });

  el.clearExpensesBtn.addEventListener("click", () => {
    if (!window.confirm("Delete all expenses?")) return;
    expenses = [];
    saveKey(STORAGE_KEYS.expenses, expenses);
    renderExpensesView();
  });

  el.applyExpenseFiltersBtn.addEventListener("click", () => {
    const start = el.expenseStartDateInput.value;
    const end = el.expenseEndDateInput.value;
    const months = Number(el.expenseProjectionMonthsInput.value) || 6;
    if (start && end && start > end) return window.alert("Expense start date must be before or equal to end date.");
    currentExpenseFilters = { start, end, months };
    renderExpensesView();
  });

  el.resetExpenseFiltersBtn.addEventListener("click", () => {
    el.expenseStartDateInput.value = "";
    el.expenseEndDateInput.value = "";
    el.expenseProjectionMonthsInput.value = "6";
    currentExpenseFilters = { start: "", end: "", months: 6 };
    renderExpensesView();
  });

  el.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(el.settingsForm);
    const reportCardMetrics = el.settingsReportCardsConfig
      ? Array.from(el.settingsReportCardsConfig.querySelectorAll("select[data-report-box-index]")).map((select) => select.value)
      : DEFAULT_REPORT_CARD_METRICS.slice();
    settings = {
      pageTitle: (form.get("settingsPageTitle") || DEFAULT_SETTINGS.pageTitle).toString().trim() || DEFAULT_SETTINGS.pageTitle,
      bgColor: (form.get("settingsBgColor") || DEFAULT_SETTINGS.bgColor).toString(),
      panelColor: (form.get("settingsPanelColor") || DEFAULT_SETTINGS.panelColor).toString(),
      dataBoxColor: (form.get("settingsDataBoxColor") || DEFAULT_SETTINGS.dataBoxColor).toString(),
      borderColor: (form.get("settingsBorderColor") || DEFAULT_SETTINGS.borderColor).toString(),
      fontSize: Number(form.get("settingsFontSize") || DEFAULT_SETTINGS.fontSize),
      currency: (form.get("settingsCurrency") || DEFAULT_SETTINGS.currency).toString(),
      defaultCommission: Number(form.get("settingsDefaultCommission") || DEFAULT_SETTINGS.defaultCommission),
      requireTime: Boolean(form.get("settingsRequireTime")),
      reportCardMetrics: sanitizeReportCardMetrics(reportCardMetrics),
    };
    saveKey(STORAGE_KEYS.settings, settings);
    applySettingsToUI();
    updateSalesView();
    renderExpensesView();
  });

  el.resetSettingsBtn.addEventListener("click", () => {
    settings = { ...DEFAULT_SETTINGS, reportCardMetrics: DEFAULT_REPORT_CARD_METRICS.slice() };
    saveKey(STORAGE_KEYS.settings, settings);
    applySettingsToUI();
    syncSettingsForm();
    updateSalesView();
    renderExpensesView();
  });
}

function initialize() {
  normalizeStoredSalesCategories();
  applySettingsToUI();
  syncSettingsForm();

  el.dateInput.valueAsDate = new Date();
  el.timeInput.value = getNowTimeString();
  el.paymentDateInput.valueAsDate = new Date();
  el.expenseForm.querySelector("#expenseDate").valueAsDate = new Date();

  renderVendors();
  updateSalesView();
  renderExpensesView();
  setupEvents();
  setActiveTrendPanel(currentTrendPanel);
  switchTab("sales");
}

initialize();
