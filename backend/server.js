const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');
function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); }
  catch { return { products: [], orders: [], customers: [], gift_boxes: [] }; }
}
function writeDB(data) { fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2)); }

// ============================================
// COFFRETS CADEAUX — Catalogue
// ============================================
app.get('/api/products', (req, res) => {
  const db = readDB();
  const { category, price_min, price_max, occasion } = req.query;
  let products = db.products || [];
  if (category) products = products.filter(p => p.category === category);
  if (occasion) products = products.filter(p => p.occasion === occasion);
  if (price_min) products = products.filter(p => p.price >= Number(price_min));
  if (price_max) products = products.filter(p => p.price <= Number(price_max));
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === Number(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: 'Coffret non trouvé' });
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const product = { id: Date.now(), ...req.body, created_at: new Date().toISOString() };
  db.products.push(product);
  writeDB(db);
  res.status(201).json(product);
});

// ============================================
// OCCASIONS — Filtres
// ============================================
app.get('/api/occasions', (req, res) => {
  const db = readDB();
  const occasions = [...new Set(db.products.map(p => p.occasion))];
  res.json(occasions.filter(Boolean));
});

// ============================================
// COMMANDES — Avec personnalisation
// ============================================
app.get('/api/orders', (req, res) => {
  const db = readDB();
  const { status } = req.query;
  let orders = db.orders || [];
  if (status) orders = orders.filter(o => o.status === status);
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  const { customer_name, customer_phone, items, delivery_method, delivery_address, gift_message, recipient_name, recipient_phone } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Panier vide' });
  }

  let subtotal = 0;
  const orderItems = [];
  for (const item of items) {
    const product = db.products.find(p => p.id === item.product_id);
    if (!product) return res.status(400).json({ error: `Produit ${item.product_id} non trouvé` });
    const itemTotal = product.price * item.qty;
    subtotal += itemTotal;
    orderItems.push({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      qty: item.qty,
      unit_price: product.price,
      total: itemTotal
    });
  }

  // Livraison gratuite si > 25k
  const delivery_fee = subtotal >= 25000 ? 0 : 2000;
  const total = subtotal + delivery_fee;

  const order = {
    id: Date.now(),
    customer_name,
    customer_phone,
    items: orderItems,
    subtotal,
    delivery_fee,
    total,
    status: 'pending',
    delivery_method: delivery_method || 'delivery',
    delivery_address,
    gift_message: gift_message || '',
    recipient_name: recipient_name || '',
    recipient_phone: recipient_phone || '',
    is_gift: true,
    packaging: 'premium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.orders.push(order);
  writeDB(db);
  res.status(201).json(order);
});

app.put('/api/orders/:id/status', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Commande non trouvée' });
  order.status = req.body.status;
  order.updated_at = new Date().toISOString();
  writeDB(db);
  res.json(order);
});

// ============================================
// LIVRAISON — Zones couvertes
// ============================================
app.get('/api/delivery-zones', (req, res) => {
  res.json([
    { id: 'centre-ville', name: 'Centre-ville', fee: 0, free_above: 25000 },
    { id: 'bacongo', name: 'Bacongo', fee: 1500, free_above: 25000 },
    { id: 'poto-poto', name: 'Poto-Poto', fee: 1500, free_above: 25000 },
    { id: 'talangai', name: 'Talangaï', fee: 2000, free_above: 25000 },
    { id: 'ouenzé', name: 'Ouenzé', fee: 2000, free_above: 25000 },
    { id: 'moungali', name: 'Moungali', fee: 2000, free_above: 25000 },
    { id: 'dolisie', name: 'Dolisie', fee: 5000, free_above: 50000 },
    { id: 'pointe-noire', name: 'Pointe-Noire', fee: 5000, free_above: 50000 }
  ]);
});

// ============================================
// STATISTIQUES
// ============================================
app.get('/api/stats', (req, res) => {
  const db = readDB();
  const orders = db.orders || [];
  const products = db.products || [];
  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  res.json({
    products: products.length,
    orders: orders.length,
    customers: db.customers?.length || 0,
    revenue: totalRevenue,
    delivered_orders: deliveredOrders,
    avg_order_value: avgOrderValue,
    gift_boxes: db.gift_boxes?.length || 0
  });
});

// ============================================
// HEALTH
// ============================================
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'coffrets-cadeaux' }));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║  🎁 Coffrets Cadeaux BZ — Backend           ║
  ║  Port: ${PORT}                                ║
  ║  API: http://localhost:${PORT}/api            ║
  ╚═══════════════════════════════════════════════╝
  `);
});
