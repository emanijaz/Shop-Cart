import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import AccountInfo from './AccountInfo';
import Alert from '@mui/material/Alert';
import MyOrders from './MyOrders';
import Faqs from './Faqs';



export default function Account() {
    const [userData, setUserData] = useState({
        firstName: { value: '', isValid: true },
        lastName: { value: '', isValid: true },
        email: { value: '', isValid: true },
        phone: { value: '', isValid: true },
        gender: { value: '', isValid: true }
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [selectItem, setSelectedItem] = useState('personalInformation');

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if(name === 'phone'){
            value = value.replace(/\D/g, '');
        }
        value = event.target.type === 'select-one' ? event.target.selectedOptions[0].text : value;
        setUserData({ ...userData, [name]: { value, isValid: validateField(name, value) } });
    };
    const validateField = (name, value) => {
        console.log('in validate field')
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }
        if(name === 'phone'){
            const phoneRegex = /^\d{0,10}$/;
            return phoneRegex.test(value);
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isAnyValidationFailed = Object.values(userData).some(field => !field.isValid);

        if (isAnyValidationFailed) {
            console.log('validation failed')
            return;
        }
        try {
            const requestBody = {};
            Object.entries(userData).forEach(([fieldName, fieldValue]) => {
                requestBody[fieldName] = fieldValue.value;
            });
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.put(`http://localhost:5000/users/update/${requestBody._id}`, requestBody,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            setAlertMessage('Settings Updated');
            setAlertSeverity('success');
            setShowAlert(true);
            setTimeout(() => {
                setAlertMessage('');
                setShowAlert(false);
                setAlertSeverity('');
            }, 2000);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleListItem = (item) => {
        setSelectedItem(item);
    }
    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('http://localhost:5000/users/user-details', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };
    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetchUserData();
            if (userData) {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    _id: {value: userData._id, isValid: true},
                    firstName: { value: userData.firstName || '', isValid: true },
                    lastName: { value: userData.lastName || '', isValid: true },
                    email: { value: userData.email || '', isValid: validateField('email', userData.email) },
                    phone: { value: userData.phone || '', isValid: userData.phone? validateField('phone', userData.phone) : true },
                    gender: { value: userData.gender || '', isValid: true }
                }));
            }
        };

        getUserData();
    }, []);

    return (
            <>
                <Navbar />
                {showAlert && (
                    <Alert severity={alertSeverity}>{alertMessage}</Alert>    
                )}
                <Container maxWidth="30">
                    <Box sx={{  height: '100vh', paddingTop: '5%', px: "10%", flexGrow: 1}}>
                        <Grid container spacing={1} columns={12}>
                            <Grid item xs={3}>
                                    
                                    <List
                                        sx={{ width: '100%', backgroundColor: "transparent"}}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        
                                    >
                                        <div className='mb-2' style={{ paddingBlock:"10px", backgroundColor: selectItem === 'personalInformation' ? 'black' : '', color:selectItem === 'personalInformation' ? 'white' : '', border: '1px solid black', borderRadius: '5px'}} onClick = {()=>{handleListItem('personalInformation')}} >
                                            <div className='px-3'>
                                                Personal information
                                            </div>
                                        </div>
                                        <div className='mb-2' style={{ paddingBlock:"10px", backgroundColor: selectItem === 'myOrders' ? 'black' : '', color: selectItem === 'myOrders' ? 'white' : '' ,border: '1px solid black', borderRadius: '5px'}} onClick = {()=>{handleListItem('myOrders')}}>
                                            <div className='px-3'>
                                                My Orders
                                            </div>
                                        </div>
                                        <div className='mb-2' style={{ paddingBlock:"10px", backgroundColor: selectItem === 'faqs' ? 'black' : '', color: selectItem === 'faqs' ? 'white' : '', border: '1px solid black', borderRadius: '5px'}} onClick = {()=>{handleListItem('faqs')}} >
                                            <div className='px-3'>
                                                FAQs
                                            </div>
                                        </div>
                                        

                                    </List>
                                
                            </Grid>
                            <Grid item xs={1}>
                                <Divider orientation="vertical" sx={{ backgroundColor: 'grey', width: '1px', margin: 'auto'  }}/>
                            </Grid>
                            <Grid item xs={8}>

                                {selectItem === 'personalInformation' ?
                                    <AccountInfo
                                        userData={userData} 
                                        handleInputChange={handleInputChange} 
                                        handleSubmit={handleSubmit} 
                                    /> : ""}
                                { selectItem === "myOrders" ? 
                                    <MyOrders /> :""
                                }
                                {   selectItem === 'faqs' ?
                                    <Faqs /> : ""
                                }
                            </Grid>
                            
                        </Grid>
                    </Box>
            </Container>
                
            </>
        )
}
