import React, {useState, useEffect} from 'react'
import { Card, CardContent, Typography, Avatar, Grid, Box ,IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function AdminCustomerList() {
  const [customers, setCustomers] = useState(null);
  const fetchAllCustomers = async()=>{
      try{
          const response = await fetch('http://localhost:5000/users/admin/users');
          const data = await response.json();
          if(data.success){
            setCustomers(data.users);
          }
      }
      catch(error){
          console.error('Error fetching products:', error);
      }
  }
  const handleCustomerDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/admin/user/${id}`);
      fetchAllCustomers(); // Refresh the customer list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  useEffect(()=> {

      fetchAllCustomers();
  },[])
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {customers && customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer._id}>
            
            <Card  sx={{ position: 'relative', p: 2, display: 'flex', alignItems: 'center' }}>
              
                <Typography variant="body2" color="error" sx={{ position: 'absolute', top: 0, right: 0, margin: 1, cursor: 'pointer' }} onClick={() => handleCustomerDelete(customer._id)}>
                  Remove
                </Typography>
              <Avatar alt={customer.username} src={ customer.profilePhoto ? customer.profilePhoto['url']: ''} sx={{ mr: 2, width: 60, height: 60 }} />
              <CardContent>
                <Typography variant="h6">{customer.username}</Typography>
                
                <Typography variant="body2" color="textSecondary">Email: {customer.email}</Typography>
                <Typography variant="body2" color="textSecondary">Gender: {customer.gender}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Role: {customer.isAdmin ? 'Admin' : 'User'}
                </Typography>
              
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
