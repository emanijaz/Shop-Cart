import React from 'react'
import AdminAppbar from './AdminAppbar'
import { Card, CardContent, Typography, Avatar } from '@mui/material';

export default function AdminCustomerList() {
  return (
    <div>
        <AdminAppbar />
        <Card>
            <CardContent>
                <Avatar alt="akt" />
                <Typography variant="h5">Eman</Typography>
            </CardContent>
        </Card>
    </div>
  )
}
