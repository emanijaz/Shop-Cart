import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Paper,
    Grid,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faShoppingBag, faRing, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const FilterItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    transition: 'box-shadow 0.3s, transform 0.3s',
    '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'scale(1.02)',
    },
}));

const ProductCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: 'auto',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[6],
    },
}));

export default function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState({ id: 1, icon: <PhoneAndroidIcon fontSize="small" />, text: 'Mobile' });
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCategoryItemClick = (item) => {
        setSelectedCategory(item);
    };

    const handlePriceItemClick = (item) => {
        const isSelected = selectedPrices.some(priceRange => 
            JSON.stringify(priceRange) === JSON.stringify(item.range)
        );
        
        let newSelected = [];
        if (!isSelected) {
            newSelected = [...selectedPrices, item.range];
        } else {
            newSelected = selectedPrices.filter(priceRange => 
                JSON.stringify(priceRange) !== JSON.stringify(item.range)
            );   
        }
        setSelectedPrices(newSelected);
    };

    const fetchAllProducts = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/products/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                const filteredProducts = data.products.filter(product => {
                    const categoryMatch = selectedCategory ? product.category === selectedCategory.text : true;
                    const priceMatch = selectedPrices.length === 0 || selectedPrices.some(priceRange => {
                        return product.price >= priceRange[0] && product.price <= priceRange[1];
                    });
                    return categoryMatch && priceMatch;
                });
                setLoading(false);
                setProducts(filteredProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, [selectedCategory, selectedPrices]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ px: 2 }}>
                <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <>
            <Navbar />
            <Container  maxWidth="30">
                <Typography variant="h4" align="center" gutterBottom sx={{paddingTop: 4}}>
                    Product List
                </Typography>
                {/* <Box sx={{ flexGrow: 1, py: 4 }}> */}
                <Box sx={{  height: '100vh', py: 4, px: "10%", flexGrow: 1}}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <FilterItem>
                                <Typography variant="h6">Categories</Typography>
                                <Divider sx={{ my: 2 }} />
                                <List component="nav">
                                    {[
                                        { id: 1, icon: <PhoneAndroidIcon fontSize="small" />, text: 'Mobile' },
                                        { id: 2, icon: <FontAwesomeIcon icon={faShirt} />, text: 'Shirt' },
                                        { id: 3, icon: <FontAwesomeIcon icon={faShoppingBag} />, text: 'Bag' },
                                        { id: 4, icon: <FontAwesomeIcon icon={faShoePrints} />, text: 'Shoe' },
                                        { id: 5, icon: <FontAwesomeIcon icon={faRing} />, text: 'Ring' },
                                    ].map((item) => (
                                        <ListItemButton
                                            key={item.id}
                                            onClick={() => handleCategoryItemClick(item)}
                                            selected={selectedCategory && selectedCategory.id === item.id}
                                        >
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </FilterItem>
                            <FilterItem sx={{ mt: 4 }}>
                                <Typography variant="h6">Filter By Price</Typography>
                                <Divider sx={{ my: 2 }} />
                                <List component="nav">
                                    {[
                                        { id: 1, range: [0, 100] },
                                        { id: 2, range: [100, 200] },
                                        { id: 3, range: [200, 350] },
                                        { id: 4, range: [350, 500] },
                                        { id: 5, range: [500, 1200] },
                                    ].map((item) => (
                                        <ListItemButton
                                            key={item.id}
                                            onClick={() => handlePriceItemClick(item)}
                                            selected={selectedPrices.some(priceRange => JSON.stringify(priceRange) === JSON.stringify(item.range))}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    checked={selectedPrices.some(priceRange => JSON.stringify(priceRange) === JSON.stringify(item.range))}
                                                    onChange={() => handlePriceItemClick(item)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`$${item.range[0]} - $${item.range[1]}`} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </FilterItem>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={2}>
                                {products.length === 0 ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }}>
                                        <img src="/assets/noProduct.jpg" alt="No Products found" style={{ width: '300px', height: '300px' }} />
                                        <Typography variant="h6">No products found</Typography>
                                    </Box>
                                ) : (
                                    products.map((product) => (
                                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                                            <ProductCard>
                                                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={product.images[0].url}
                                                        alt={product.name}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h6" component="div">
                                                            {product.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ${product.price}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button size="small" color="primary">
                                                            View Details
                                                        </Button>
                                                    </CardActions>
                                                </Link>
                                            </ProductCard>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
