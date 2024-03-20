import React, {useState, useEffect} from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faShoppingBag, faRing, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState('Mobile');
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [products, setProducts] = useState([]);

    const handleCategoryItemClick = (item) => {
        console.log(item)
        setSelectedCategory(item);
    };

    // const handlePriceItemClick = (item) => {
    //     const selectedIndex = selectedPrices.indexOf(item.range);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selectedPrices, item.range);
    //         console.log(newSelected)
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selectedPrices.slice(1));
    //     } else if (selectedIndex === selectedPrices.length - 1) { // removing last element
    //         newSelected = newSelected.concat(selectedPrices.slice(0, -1));
    //     } else if (selectedIndex > 0) {   // removing any element other than last and first
    //         newSelected = newSelected.concat(
    //             selectedPrices.slice(0, selectedIndex),
    //             selectedPrices.slice(selectedIndex + 1)
    //         );
    //     }

    //     setSelectedPrices(newSelected);
    // };
    const handlePriceItemClick = (item) => {
        console.log(item)
        const selectedIndex = selectedPrices.findIndex(priceRange => JSON.stringify(priceRange) === JSON.stringify(item.range));
        let newSelected = [];
    
        if (selectedIndex === -1) {
            // If the range is not already selected, add it to the selectedPrices array
            newSelected = [...selectedPrices, item.range];
        } else {
            // If the range is already selected, remove it from the selectedPrices array
            newSelected = selectedPrices.filter((range, index) => index !== selectedIndex);
        }
    
        setSelectedPrices(newSelected);
    };


    function FormRow() {   
        return products.map((product, index) => {
            if (index % 3 === 0) {
                return (
                <React.Fragment>
                    <Grid item xs={4} sx={{ border: 'none' }}>
                            <Item>
                                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                                        <img className="card-img-top mt-3" src={`/assets/${product.images[0].url}`} alt="Android 1" style={{ height: "250px" }} />
                                        <div className="card-body">
                                            <p className="card-text" style={{ fontSize: "16px" }}>{product.name}</p>
                                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{product.price}</p>
                                            <Link to={`/product/${product._id}`} key={product._id} className='col-md-3 mt-3 mb-1'>
                                                <Button size="small" style={{ color: 'black', borderColor: 'black' }} variant="outlined">Add to Cart</Button>
                                            </Link>
                                        </div>  
                                        </div>
                            </Item>
                    </Grid>
    
                    {products.slice(index + 1, index + 3).map((nextProduct) => (
                        <Grid item xs={4} sx={{ border: 'none' }}>
                            <Item>
                                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                                        <img className="card-img-top mt-3" src={`/assets/${nextProduct.images[0].url}`} alt="Android 1" style={{ height: "250px" }} />
                                        <div className="card-body">
                                            <p className="card-text" style={{ fontSize: "16px" }}>{nextProduct.name}</p>
                                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>{nextProduct.price}</p>
                                            <Link to={`/product/${nextProduct._id}`} key={product._id} className='col-md-3 mt-3 mb-1'>
                                                <Button size="small" style={{ color: 'black', borderColor: 'black' }} variant="outlined">Add to Cart</Button>
                                            </Link>
                                        </div>
                                        </div>
                            </Item>
                        </Grid>
                    ))}
                </React.Fragment>
                );
            }
            return null;
        })
    }

    useEffect(()=> {
        const fetchAllProducts = async()=>{
            try{
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/products/',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if(data.success){
                    console.log(data.products)
                    const filteredProducts = data.products.filter(product => {
                        console.log(product.category)
                        console.log(selectedCategory.text)
                        console.log(product.category === selectedCategory.text)
                        const categoryMatch = selectedCategory ? product.category === selectedCategory.text : true;
                        
                        // const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(product.price);
                        // console.log(priceMatch)
                        return categoryMatch;
                    });
                    console.log('filtered prods: ', filteredProducts)
                    setProducts(filteredProducts);
                }
            }
            catch(error){
                console.error('Error fetching products:', error);
            }
        }

        fetchAllProducts();
    },[selectedCategory,selectedPrices])

    return (
        <>
            <Navbar />
            <Container maxWidth="30">
                <h3 className='d-md-flex justify-content-center mt-5 mb-3'>Product List </h3>
                <Box sx={{  height: '100vh', padding: '2%', flexGrow: 1}}>
                    <Grid container spacing={3} columns={16}>
                        <Grid item xs={3}>
                            <Item>
                                <Typography variant="h6">Categories</Typography>
                                <Divider style={{ height: '1.2rem' }}></Divider>
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper'}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    
                                >
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
                                        style={{ color: selectedCategory && selectedCategory.id === item.id ? 'black' : 'grey',  }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="body2"
                                                style={{color: selectedCategory && selectedCategory.id === item.id ? 'black' : 'grey', }}
                                            >
                                                {item.text}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                    ))}
                                </List>
                            </Item>
                            <Item>
                                <Typography variant="h6">Filter By Price</Typography>
                                <Divider style={{ height: '1.2rem' }}></Divider>
                                
                                <List
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    {[
                                    { id: 1, range: [0,100] },
                                    { id: 2, range: [100,200] },
                                    { id: 3, range: [200,350] },
                                    { id: 4, range: [350,500] },
                                    { id: 5, range: [500,1200] },
                                    ].map((item) => (
                                    <ListItemButton
                                        key={item.id}
                                        onClick={() => handlePriceItemClick(item)}
                                        style={{ color: selectedPrices.includes(item.id) ? 'black' : 'grey',  }}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={selectedPrices.includes(item.id)}
                                                onChange={() => handlePriceItemClick(item)}
                                                size="small"
                                            />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography
                                                variant="body2"
                                                style={{color: selectedPrices.includes(item.id) ? 'black' : 'grey', }}
                                            >
                                                ${item.range[0]} - ${item.range[1]} 
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                    ))}
                                </List>
                            </Item>
                        </Grid>
                        <Grid item xs={9}>
                            {products ? (
                                <Grid container sx={{ border: 'none' }}>
                                    <FormRow />
                                </Grid>
                            ) : <p>No products found</p>}
                        </Grid>
                        
                    </Grid>
                </Box>
        </Container>
            
        </>
    )
}
