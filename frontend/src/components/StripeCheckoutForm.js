import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, TextField, Typography, CircularProgress, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

import axios from "axios";


const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const CardElementWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
}));

const countries = [
    { code: 'US', label: 'United States' },
    { code: 'CA', label: 'Canada' },
];

const StripeCheckoutForm = ({totalPrice, onClose}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post('http://localhost:5000/users/create_payment_intent',  { totalPrice }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            const { clientSecret } =  response.data;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: userName,
                        email: email,
                        address: {
                            country: country,
                        },
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                onClose(true);
            }

        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Payment Details
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Name on Card"
                variant="outlined"
                fullWidth
                required
                onChange={(e)=> setUserName(e.target.value)}
            />
            <TextField
                select
                label="Country/Region"
                variant="outlined"
                fullWidth
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            >
                {countries.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <CardElementWrapper>
                <CardElement />
            </CardElementWrapper>
            {error && <Typography color="error">{error}</Typography>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!stripe || loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Pay'}
            </Button>
        </Form>
    );
};

export default StripeCheckoutForm;
