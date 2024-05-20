import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import SettingsForm from './SettingsForm';
import { Cloudinary } from '@cloudinary/url-gen';
import Alert from '@mui/material/Alert';
import MyOrders from './MyOrders';
import Faqs from './Faqs';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit'


export default function Account() {
    const [userData, setUserData] = useState({
        firstName: { value: '', isValid: true },
        lastName: { value: '', isValid: true },
        email: { value: '', isValid: true },
        phone: { value: '', isValid: true },
        gender: { value: '', isValid: true }, 
        profilePhoto: { value: null, isValid: true},
    });
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [selectItem, setSelectedItem] = useState('personalInformation');
    const cld = new Cloudinary({ cloud: { cloudName: 'dxfjnflzc' } });

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
                    gender: { value: userData.gender || '', isValid: true },
                    profilePhoto: { value: userData.profilePhoto || null, isValid: true},
                }));
            }
        };

        getUserData();
    }, []);

    const fileInputRef = useRef(null);

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true); // loading avatar
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'preset1');

            try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dxfjnflzc/image/upload`,
                formData
            );
            console.log(response)
            const img = cld.image(response.data.public_id)
                .format('auto')
                .quality('auto')
                .resize(auto().gravity(autoGravity()).width(150).height(150));
            
            
            let photoData = {}
            photoData['public_id'] = response.data.public_id;
            photoData['url'] = img.toURL();

            // Create a temporary URL for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setUserData((prevData) => ({
                    ...prevData,
                    profilePhoto: { value: photoData, isValid: true },
                }));
            };
            reader.readAsDataURL(file);

            // setUserData({ ...userData,['profilePhoto']: {value: photoData, isValid: true} })
            } catch (error) {
            console.error('Error uploading the image:', error);
            }
            finally {
                setLoading(false);
            }
        }
    };
    const handleEditIconClick = () => {
        fileInputRef.current.click();
    };
    const AvatarDisplay = () => {
        if (loading) {
            return (
                <div>
                    <CircularProgress color="inherit"/>
                </div>
            )
        }
        if (preview) {
            return(
                <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={preview} alt="Avatar" style={{ width: 150, height: 150 }} onLoad={() => setLoading(false)} />;
                <EditIcon   onClick={handleEditIconClick} style={{ position: 'absolute', bottom: 0  , right: 0, marginRight: '10px', marginBottom: '5px', cursor: 'pointer', backgroundColor: '#1F75FE', color: 'white', padding: '5px', borderRadius: '50%', width:35, height: 35 }} />

                </div>
            )
        }
        if(userData.profilePhoto.value){
        return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
            <AdvancedImage
                cldImg={cld.image(userData.profilePhoto.value.public_id).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(150).height(150))}
                alt="Avatar"
                style={{ width: 150, height: 150 }}
            />
            <EditIcon   onClick={handleEditIconClick} style={{ position: 'absolute', bottom: 0  , right: 0, marginRight: '10px', marginBottom: '5px', cursor: 'pointer', backgroundColor: '#1F75FE', color: 'white', padding: '5px', borderRadius: '50%', width:35, height: 35 }} />
            </div>
        );
        }
    };

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

                                {selectItem === 'personalInformation' &&
                                    <SettingsForm
                                        userData={userData} 
                                        handleInputChange={handleInputChange} 
                                        handleSubmit={handleSubmit} 
                                        handleAvatarChange={handleAvatarChange}
                                        handleEditIconClick={handleEditIconClick}
                                        fileInputRef={fileInputRef}
                                        loadingAvatar= {loading}>
                                        <AvatarDisplay />
                                    </SettingsForm>
                                    
                                }
                                { selectItem === "myOrders" && <MyOrders /> }
                                { selectItem === 'faqs' && <Faqs /> }
                            </Grid>
                            
                        </Grid>
                    </Box>
            </Container>
                
            </>
        )
}
