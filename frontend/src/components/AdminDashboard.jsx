import React, {useState} from 'react'
import { Box, Container, Grid, Dialog,Toolbar } from '@mui/material';

import Alert from '@mui/material/Alert';
import AdminAppbar from './AdminAppbar';
import AdminProductList from './AdminProductList';
import AdminCustomerList from './AdminCustomerList';

export default function AdminDashboard() {

    const [selectedItem, setSelectedItem] = useState('');
    const handleItemClick = (item) => {
        console.log('selected drawer item : ', item)
        setSelectedItem(item);
    }
    const renderComponent = () => {
        switch(selectedItem){
            case 'Customers':
                return <AdminCustomerList />
            case 'Products': 
                return <AdminProductList setAlertMessage={setAlertMessage} setShowAlert={setShowAlert} setAlertSeverity={setAlertSeverity}/>

        }
    }

    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');

    return (
        
        <Box sx={{ display: 'flex' }}>

            <AdminAppbar handleItemClick= {handleItemClick}/>
            <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2 }}
            >
                <Toolbar />
                <Container  maxWidth={false}>
                    {showAlert && (
                        <Alert severity={alertSeverity}>{alertMessage}</Alert>    
                    )}
                    {renderComponent()}
                </Container>
            </Box>
            {/* <Dialog open={open} onClose={handleClose}>
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
            </Dialog> */}
        </Box>
    );
}
