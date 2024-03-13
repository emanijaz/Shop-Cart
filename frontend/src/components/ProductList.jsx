import React, {useState} from 'react'

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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Item>
          <div className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                        <img className="card-img-top mt-3" src={`/assets/android1.png`} alt="Android 1" style={{ height: "250px" }} />
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>name</p>
                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>100</p>
                            
                        </div>
                        </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
          <div className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                        <img className="card-img-top mt-3" src={`/assets/android1.png`} alt="Android 1" style={{ height: "250px" }} />
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>name</p>
                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>100</p>
                            
                        </div>
                        </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <div className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                        <img className="card-img-top mt-3" src={`/assets/android1.png`} alt="Android 1" style={{ height: "250px" }} />
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>name</p>
                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>100</p>
                            
                        </div>
                        </div>
            </div>
            </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <div className='col-md-3 mt-3 mb-1'>
                        <div className="card h-100 text-center border-0" style={{ width: "18rem" }}>
                        <img className="card-img-top mt-3" src={`/assets/android1.png`} alt="Android 1" style={{ height: "250px" }} />
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "16px" }}>name</p>
                            <p className="card-text" style={{ fontSize: "18px" }}><i className="fa fa-solid fa-tags me-1"></i>100</p>
                            
                        </div>
                        </div>
            </div>
            </Item>
        </Grid>
        
      </React.Fragment>
    );
  }
export default function ProductList() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
        <Navbar />
        <Container maxWidth="30">
            <h3 className='d-md-flex justify-content-center mt-5 mb-3'>Product List </h3>
            <Box sx={{  height: '100vh', padding: '2%', flexGrow: 1 }}>
                <Grid container spacing={1} columns={16}>
                    <Grid item xs={3}>
                        <Item>
                            <Typography variant="h6">Categories</Typography>
                            <Divider style={{ height: '1.2rem' }}></Divider>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                {[
                                { id: 1, icon: <PhoneAndroidIcon fontSize="small" />, text: 'Mobiles' },
                                { id: 2, icon: <FontAwesomeIcon icon={faShirt} />, text: 'Shirts' },
                                { id: 3, icon: <FontAwesomeIcon icon={faShoppingBag} />, text: 'Bags' },
                                { id: 4, icon: <FontAwesomeIcon icon={faShoePrints} />, text: 'Shoes' },
                                { id: 5, icon: <FontAwesomeIcon icon={faRing} />, text: 'Rings' },
                                ].map((item) => (
                                <ListItemButton
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    style={{ color: selectedItem && selectedItem.id === item.id ? 'black' : 'grey',  }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText>
                                        <Typography
                                            variant="body2"
                                            style={{color: selectedItem && selectedItem.id === item.id ? 'black' : 'grey', }}
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
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            
                            >
                            <ListItemButton >
                                {/* <ListItemIcon style={{ fontSize: '1.2rem' }}>
                                <PhoneAndroidIcon fontSize="small"/>
                                </ListItemIcon >
                                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Mobiles" /> */}
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                            </ListItemButton>
                            
                            </List>
                        </Item>
                    </Grid>
                    <Grid container item xs={9}>
                        <FormRow />
                        <FormRow />
                        <FormRow />

                    </Grid>
                </Grid>
            </Box>
      </Container>
        
    </>
  )
}
