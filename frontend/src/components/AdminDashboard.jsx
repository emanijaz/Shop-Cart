import React, {useEffect, useState} from 'react'
import { Box, Container, Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemIcon, ListItemText ,Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

const drawerWidth = 210;

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', images: [], category: '', description: '', stock: '' });
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const fetchAllProducts = async()=>{
        try{
            const response = await fetch('http://localhost:5000/products/');
            const data = await response.json();
            if(data.success){
                setProducts(data.products);
            }
        }
        catch(error){
            console.error('Error fetching products:', error);
        }
    }
    useEffect(()=> {

        fetchAllProducts();
    },[])


    const handleAddProduct = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = async () => {
        if (
            !newProduct.name ||
            !newProduct.description ||
            !newProduct.price ||
            !newProduct.category ||
            !newProduct.stock ||
            newProduct.images.length === 0
        ) {
            setShowAlert(true);
            setAlertMessage("Please fill out all required fields");
            setAlertSeverity("error");
            setTimeout(() => {
                setAlertMessage('');
                setShowAlert(false);
                setAlertSeverity('');
            }, 2000);
            return;
        }

        const response = await axios.post(`http://localhost:5000/products/create/`, newProduct);
        if(response.status === 200){
            setShowAlert(true);
            setAlertMessage('Product Added')
            setAlertSeverity('success');
            setOpen(false);
            fetchAllProducts();
        }
        else{
            setShowAlert(true);
            setAlertMessage('Error adding product')
            setAlertSeverity('error');
        }
        setTimeout(() => {
            setAlertMessage('');
            setShowAlert(false);
            setAlertSeverity('');
        }, 2000);

    };

    const handleEditItem = (event) => {
        console.log('edit item');
    }
    const handleDeleteItem = async (productId) => {
        console.log('delete item');
        try{
            await axios.delete(`http://localhost:5000/products/delete/${productId}`)
            setShowAlert(true);
            setAlertMessage('Product deleted')
            setAlertSeverity('success');
        }
        catch(error){
            setShowAlert(true);
            setAlertMessage('Error deleting product: ', error)
            setAlertSeverity('error');
        }
        finally{
            setTimeout(() => {
                setAlertMessage('');
                setShowAlert(false);
                setAlertSeverity('');
            }, 2000);
            fetchAllProducts();
        }

    }
    const handleImageUpload = () => {
        window.cloudinary.openUploadWidget(
            { cloudName: 'dxfjnflzc', uploadPreset: 'preset1', sources: ['local', 'url', 'camera'] },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log('setting image:', result.info)
                    let uploaded_images = [
                        {
                            public_id: result.info.public_id,
                            url: result.info.secure_url
                        }
                    ]
                    setNewProduct({ ...newProduct, images: uploaded_images });
                }
            }
        );
    };
    return (
        
        <Box sx={{ display: 'flex' }}>

            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                    ShopCart Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                    {[['Products', <InventoryIcon/>], ['Order',<ShoppingCartIcon/>], ['Customers', <SupervisorAccountIcon/>]].map((item, index) => (
                        <ListItem button key={item[0]}>
                        <ListItemIcon>
                            {item[1]}

                        </ListItemIcon>
                        <ListItemText primary={item[0]} />
                        </ListItem>
                    ))}
                    </List>
                    
                </Box>
            </Drawer>
            <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2 }}
            >
                <Toolbar />
                <Container  maxWidth={false}>
                {showAlert && (
                    <Alert severity={alertSeverity}>{alertMessage}</Alert>    
                )}
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center;" }}>
                    <Typography variant="h5" gutterBottom>
                        Products
                    </Typography>
                    <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={handleAddProduct}>
                        New Product
                    </Button>
                    </div>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: '#fff', p: 2,borderRadius: 1 }}
                        >
                            <Container disableGutters maxWidth={false}>
                                
                                <Grid container spacing={2}>
                                    {products.map((product, index) => {
                                        return(
                                            <Grid item xs={12} sm={6} md={2.4} key={product._id} >
                                            <Card>
                                                <CardContent sx={{ px: '50px' }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                    <img
                                                        src={`${product.images[0].url}`}
                                                        alt="Product"
                                                        style={{ width: 150, height: 150,}}
                                                    />
                                                    </Grid>
                                                    <Grid item xs>
                                                    <Typography variant="h6">{product.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ${product.price}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, gap: 1 }}>
                                                        
                                                        <Chip
                                                            label= "edit"
                                                            icon={<EditIcon fontSize="md"/>}
                                                            onClick={() => handleEditItem(product._id)}
                                                            
                                                        />
                                                        <Chip
                                                            label= "delete"
                                                            icon={<DeleteIcon fontSize="md"/>}
                                                            onClick={() => handleDeleteItem(product._id)}
                                                            
                                                        />
                                                    </Box>
                                                    </Grid>
                                                </Grid>
                                                </CardContent>
                                            </Card>
                                            </Grid>
                                        )
                                    })}
                                    
                                    
                                </Grid>
                            </Container>
                    </Box>
                </Container>
            </Box>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to add a new product.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="description"
                        label="Product Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Product Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="category"
                        label="Product Category"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="stock"
                        label="Product Stock"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        required
                    />
                    <Typography sx={{color: 'grey', mt: '5%'}} >Upload Image</Typography>
                    <div
                        onClick={handleImageUpload}
                        style={{ display: 'flex', alignItems: 'center'}}
                    >
                    {newProduct.images.length > 0 ? (
                            <Avatar src={newProduct.images[0]['url']} alt="new Product Image" sx={{ width: 150, height: 150 }} />
                    ) : 
                    (
                            <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.700', height: '80px', width: '80px' }} />
                    )
                    }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
