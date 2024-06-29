import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import {useEffect, useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { Box, Container, Grid, Dialog,Toolbar, Typography, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Avatar } from '@mui/material';


export default function AdminProductList({setAlertMessage, setShowAlert, setAlertSeverity}) {

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({ name: '', price: '', images: [], category: '', description: '', stock: '' });
    const [newProduct, setNewProduct] = useState({ name: '', price: '', images: [], category: '', description: '', stock: '' });


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
        setNewProduct({ name: '', price: '', images: [], category: '', description: '', stock: '' });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClose = () => {
        setEditOpen(false);
    };
    const handleEditItem = (productId) => {
        const productToEdit = products.find(product => product._id === productId);
        setEditProduct(productToEdit);
        setEditOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editOpen) {
            setEditProduct({ ...editProduct, [name]: value });
        }
        else{
            setNewProduct({ ...newProduct, [name]: value });
        }
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
        if(response.status === 201){
            setShowAlert(true);
            setAlertMessage('Product Added')
            setAlertSeverity('success');
            setOpen(false);
            fetchAllProducts();
        }
        else{
            console.log(response)
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

    const handleEditSubmit = async () => {
        if (
            !editProduct.name ||
            !editProduct.description ||
            !editProduct.price ||
            !editProduct.category ||
            !editProduct.stock ||
            editProduct.images.length === 0
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

        const response = await axios.put(`http://localhost:5000/products/update/${editProduct._id}`, editProduct);
        if(response.status === 200){
            setShowAlert(true);
            setAlertMessage('Product Updated')
            setAlertSeverity('success');
            setOpen(false);
            fetchAllProducts();
            setEditOpen(false);
        }
        else{
            setShowAlert(true);
            setAlertMessage('Error Updating product')
            setAlertSeverity('error');
        }
        setTimeout(() => {
            setAlertMessage('');
            setShowAlert(false);
            setAlertSeverity('');
        }, 2000);

    };
    const handleDeleteItem = async (productId) => {
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
                    if (editOpen) {
                        setEditProduct({ ...editProduct, images: uploaded_images });
                    }
                    else{
                        setNewProduct({ ...newProduct, images: uploaded_images });
                    }
                }
            }
        );
    };

  return (
    <div>
         <div style={{display: "flex", justifyContent: "space-between", alignItems: "center;" }}>
                    <Typography variant="h5" gutterBottom>
                        Products
                    </Typography>
                    <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={handleAddProduct} sx={{marginBottom: '10px'}}>
                        Create Product
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
                                            <Card >
                                                <CardContent sx={{ px: '16px', py: '24px', height: '350px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Grid container spacing={2} alignItems="center" sx={{ height: '100%' }}>
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
                            <Dialog open={editOpen} onClose={handleEditClose}>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please fill out the form below to edit product.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="name"
                                        label="Product Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={editProduct?.name || ''}
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
                                        value={editProduct?.description || ''}
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
                                        value={editProduct?.price || ''}
                                        onChange={handleInputChange}
                                        inputProps={{ min: 0 }}
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
                                        value={editProduct?.category || ''}
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
                                        value={editProduct?.stock || ''}
                                        onChange={handleInputChange}
                                        inputProps={{ min: 0 }}
                                        required
                                    />
                                    <Typography sx={{color: 'grey', mt: '5%'}} >Upload Image *</Typography>
                                    <div
                                        onClick={handleImageUpload}
                                        style={{ display: 'flex', alignItems: 'center'}}
                                    >
                                    {editProduct.images.length > 0 ? (
                                            <Avatar src={editProduct.images[0]['url']} alt="new Product Image" sx={{ width: 150, height: 150 }} />
                                    ) : 
                                    (
                                            <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.700', height: '80px', width: '80px' }} />
                                    )
                                    }
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleEditClose}>Cancel</Button>
                                    <Button onClick={handleEditSubmit}>Update</Button>
                                </DialogActions>
                            </Dialog>
                    </Box>
    </div>
  )
}
