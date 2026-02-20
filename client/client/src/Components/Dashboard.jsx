import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    orders: 0,
    customers: 0,
    products: 0
  });

  const fetchStats = async () => {
    try {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        fetch('http://localhost:3003/orders'),
        fetch('http://localhost:3001/customers'),
        fetch('http://localhost:3002/Product'),
      ]);
console.log(ordersRes, customersRes, productsRes);
      const orders = await ordersRes.json();
      const customers = await customersRes.json();
      const products = await productsRes.json();

      setStats({
        orders: orders.length,
        customers: customers.length,
        products: products.length
      });

      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement statistiques:', error);
      setLoading(false);
    }
  };
  console.log(stats);
  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>{value}</Typography>
      {icon}
    </Paper>
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>📊 Tableau de bord</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <StatCard title="Commandes passées" value={stats.orders} icon={<ShoppingCartIcon sx={{ fontSize: 40 }} color="primary" />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Clients enregistrés" value={stats.customers} icon={<GroupIcon sx={{ fontSize: 40 }} color="success" />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Produits disponibles" value={stats.products} icon={<InventoryIcon sx={{ fontSize: 40 }} color="warning" />} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
