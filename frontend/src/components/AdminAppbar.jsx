import React from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Drawer, AppBar, Toolbar, List, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
const drawerWidth = 210;


export default function AdminAppbar() {
  return (
    <div>
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
                    {[['Products', <InventoryIcon/>], ['Order',<ShoppingCartIcon/>], ['Customers', <SupervisorAccountIcon/>]].map((item, index) => (
                        <ListItem button key={item[0]}>
                        <ListItemIcon>
                            {item[1]}

                        </ListItemIcon>
                        <ListItemText primary={item[0]} />
                        </ListItem>
                    ))}
                    </List>
                    
                </Box>
            </Drawer>
    </div>
  )
}
