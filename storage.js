const STORAGE_KEY = "case5_products_v1";

const DEFAULT_PRODUCTS = [
  { id: 1, product_name: "Notebook", category: "School Supplies", price: 45.5, stock: 20 },
  { id: 2, product_name: "Ballpen Set", category: "School Supplies", price: 25, stock: 50 },
  { id: 3, product_name: "Sketchpad A4", category: "Art Materials", price: 120.75, stock: 0 }
];

function getRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS)); return [...DEFAULT_PRODUCTS]; }
  try { return JSON.parse(raw); } catch { return [...DEFAULT_PRODUCTS]; }
}
function saveRecords(records) { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function getRecordById(id) { return getRecords().find(r => Number(r.id) === Number(id)) || null; }
function addRecord(data) {
  const records = getRecords();
  const nextId = records.length ? Math.max(...records.map(r => Number(r.id))) + 1 : 1;
  records.push({ id: nextId, ...data });
  saveRecords(records);
}
function updateRecord(id, data) { saveRecords(getRecords().map(r => Number(r.id) === Number(id) ? { id: Number(id), ...data } : r)); }
function deleteRecord(id) { saveRecords(getRecords().filter(r => Number(r.id) !== Number(id))); }
function resetSampleData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS)); }
function isValidPriceStr(str) { return /^\d+(\.\d{1,2})?$/.test(str) && Number(str) >= 0; }
function formatPrice(val) { return Number(val).toFixed(2); }
