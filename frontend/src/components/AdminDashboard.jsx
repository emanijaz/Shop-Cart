import React from 'react'
import { Box, Container, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText ,Grid, IconButton} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
const drawerWidth = 210;

export default function () {
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
                    <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />}>
                        Create Product
                    </Button>
                    </div>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: '#fff', p: 2,borderRadius: 1 }}
                        >
                            <Container disableGutters maxWidth={false}>
                                
                                <Grid container spacing={2}>
                                
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
        </Box>
    );
}
