import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import axios from 'axios';
import { useFormControlContext } from '@mui/base/FormControl';
import Divider from '@mui/material/Divider';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';


const StyledInput = styled(Input)(
    ({ theme }) => `
    
        .${inputClasses.input} {
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
            border-color: ${blue[400]};
        }
    
        &:focus {
            outline: 0;
            border-color: ${blue[400]};
            box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
        }
    `,
    );
    
const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
    if (formControlContext?.filled) {
        setDirty(true);
    }
    }, [formControlContext]);

    if (formControlContext === undefined) {
    return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
    </p>
    );
})`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;

    &.invalid {
    color: red;
    }
`;


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

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

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if(name === 'phone'){
            value = value.replace(/\D/g, '');
        }
        value = event.target.type === 'select-one' ? event.target.selectedOptions[0].text : value;
        // setUserData({ ...userData, [name]: value });
        setUserData({ ...userData, [name]: { value, isValid: validateField(name, value) } });
    };
    const validateField = (name, value) => {
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }
        if(name == 'phone'){
            const phoneRegex = /^\d{0,10}$/;
            return phoneRegex.test(value);
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('user data in submit: ', userData)
        const isAnyValidationFailed = Object.values(userData).some(field => !field.isValid);

        if (isAnyValidationFailed) {
            // If any validation failed, prevent form submission
            console.log('validation failed')
            return;
        }
        try {
            const requestBody = {};
            Object.entries(userData).forEach(([fieldName, fieldValue]) => {
                requestBody[fieldName] = fieldValue.value;
            });
            console.log('req body ;', requestBody)
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
            console.log('user data: ', userData)
            if (userData) {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    _id: {value: userData._id},
                    firstName: { value: userData.firstName || '', isValid: true },
                    lastName: { value: userData.lastName || '', isValid: true },
                    email: { value: userData.email || '', isValid: validateField('email', userData.email) },
                    phone: { value: userData.phone || '', isValid: validateField('phone', userData.phone) },
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
                                        <div className='mb-2' style={{ paddingBlock:"10px", backgroundColor: 'black', color:'white', border: '1px solid black', borderRadius: '5px'}} >
                                            <div className='px-3'>
                                                Personal information
                                            </div>
                                        </div>
                                        <div className='mb-2' style={{ paddingBlock:"10px", border: '1px solid black', borderRadius: '5px'}} >
                                            <div className='px-3'>
                                                My Orders
                                            </div>
                                        </div>
                                        <div className='mb-2' style={{ paddingBlock:"10px", border: '1px solid black', borderRadius: '5px'}} >
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

                                <form>
                                    <div className='mb-3'>
                                        <div className='mb-3' style={{ position: 'relative', display: 'inline-block' }}>
                                            <Avatar alt="Avatar" src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" sx={{ width: 150, height: 150 }} />
                                            <EditIcon style={{ position: 'absolute', bottom: 0  , right: 0, marginRight: '10px', marginBottom: '5px', cursor: 'pointer', backgroundColor: '#1F75FE', color: 'white', padding: '5px', borderRadius: '50%', width:35, height: 35 }} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="first_name">First Name</label>
                                                <input type="text" className="form-control" id="first_name" name="firstName" placeholder="First Name" value={userData?.firstName?.value || ''} onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="last_name">Last Name</label>
                                                <input type="text" className="form-control" id="last_name" name="lastName" placeholder="Last Name" value={userData?.lastName?.value || ''} onChange={handleInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Email" value={userData?.email?.value || ''} onChange={handleInputChange}/>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="phone">Phone</label>
                                        <input type="tel" class="form-control" id="phone" name="phone" placeholder="Phone" value={userData?.phone?.value || '0000000'} onChange={handleInputChange}/>
                                    </div>
                                    <div class="form-row mb-3">
                                        <div class="form-group col-md-4">
                                            <label for="inputGender">Gender</label>
                                            <select id="inputGender" class="form-control" name="gender" onChange={handleInputChange} value={userData.gender.value}>
                                                <option >Choose...</option>
                                                <option>Female</option>
                                                <option>Male</option>
                                                <option>Other</option>

                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-dark btn-block"  onClick={handleSubmit}
                                        style={{ 
                                            width: '20%', 
                                            padding: '10px', 
                                            fontSize: '16px', 
                                            textAlign: 'center'
                                        }}
                                    >
                                            Update
                                    </button>
                                    </form>
                            </Grid>
                            
                        </Grid>
                    </Box>
            </Container>
                
            </>
        )
}
