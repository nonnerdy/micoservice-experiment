import { Container, Typography, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCarousel from '../components/ProductCarousel';
import ProductList from '../components/ProductList';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8763/inventory/list');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h4">Welcome to Our Shop</Typography>
            <TextField
                label="Search products"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                margin="normal"
            />
            <ProductCarousel products={products} />
            <ProductList products={products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )} />
        </Container>
    );
}

export default HomePage;
