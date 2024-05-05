import React from 'react'
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function Account() {
  return (
        <>
            <Navbar />
            <Container maxWidth="30">
                <h3 className='d-md-flex justify-content-center mt-5 mb-3'>My Account </h3>
                <Box sx={{  height: '100vh', paddingTop: '2%', px: "5%", flexGrow: 1}}>
                    <Grid container spacing={6} columns={12}>
                        <Grid item xs={3}>
                                
                                <List
                                    sx={{ width: '100%', backgroundColor: "transparent"}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    
                                >
                                    <div className='py-3 mb-3' style={{ backgroundColor: 'black', color:'white', border: '1px solid black', borderRadius: '5px'}} >
                                        <div className='px-3'>
                                            Personal information
                                        </div>
                                    </div>
                                    <div className='py-3 mb-3' style={{border: '1px solid black', borderRadius: '5px'}} >
                                        <div className='px-3'>
                                            My Orders
                                        </div>
                                    </div>
                                    <div className='py-3 mb-3' style={{border: '1px solid black', borderRadius: '5px'}} >
                                        <div className='px-3'>
                                            FAQs
                                        </div>
                                    </div>
                                    

                                </List>
                            
                        </Grid>
                        <Grid item xs={9}>
                            
                                <div>form</div>
                            
                        </Grid>
                        
                    </Grid>
                </Box>
        </Container>
            
        </>
    )
}
