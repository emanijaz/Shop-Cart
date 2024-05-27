import React, {useEffect, useState} from 'react'
import { Box, Container, Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemIcon, ListItemText ,Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';

const drawerWidth = 210;

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: '', description: '', stock: '' });


    useEffect(()=> {
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

        fetchAllProducts();
    },[])


    const handleAddProduct = () => {
        console.log('adding new product')
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
        // Handle form submission to add new product
        // For now, we'll just log the new product
        console.log(newProduct);
        // Close the modal
        setOpen(false);
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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
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
                                            <Grid item xs={12} sm={6} md={2.4} key={index} >
                                            <Card>
                                                <CardContent sx={{ px: '50px' }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                    <img
                                                        src={`/assets/${product.images[0].url}`}
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
                                                        <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />}>
                                                        Edit
                                                        </Button>
                                                        <Button variant="contained" color="error" size="small"  startIcon={<DeleteIcon />}>
                                                        Delete
                                                        </Button>
                                                    </Box>
                                                    </Grid>
                                                </Grid>
                                                </CardContent>
                                            </Card>
                                            </Grid>
                                        )
                                    })}
                                    <Grid item xs={12} sm={6} md={2.4} >
                                        <Card>
                                            <CardContent sx={{ px: '50px' }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                <img
                                                    src="/assets/android1.png"
                                                    alt="Product"
                                                    style={{ width: 150, height: 150,}}
                                                />
                                                </Grid>
                                                <Grid item xs>
                                                <Typography variant="h6">Product Title</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    $99.99
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, gap: 1 }}>
                                                    <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />}>
                                                    Edit
                                                    </Button>
                                                    <Button variant="contained" color="error" size="small"  startIcon={<DeleteIcon />}>
                                                    Delete
                                                    </Button>
                                                </Box>
                                                </Grid>
                                            </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    
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
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="stock"
                        label="Product Stock"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                    />
                    <NumberInput
                        aria-label="Product Stock"
                        placeholder="Type a number…"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="image"
                        label="Product Image URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProduct.image}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
