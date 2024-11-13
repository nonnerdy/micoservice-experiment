import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';

function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const fetchAdminData = async () => {
            const ordersResponse = await axios.get('http://localhost:8763/inventory/list');
            const inventoryResponse = await axios.get('http://localhost:8763/inventory/list');
            setOrders(ordersResponse.data);
            setInventory(inventoryResponse.data);
            // Assuming totalCost comes in the order API
            setTotalCost(ordersResponse.data.reduce((acc, order) => acc + order.total, 0));
        };
        fetchAdminData();
    }, []);

    return (
        <Container>
            <Typography variant="h4">Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Orders</Typography>
                    {/* Render orders */}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Inventory</Typography>
                    {/* Render inventory */}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Total Cost: ${totalCost}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AdminPage;
