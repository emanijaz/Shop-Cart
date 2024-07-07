import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, TextField, Typography, CircularProgress } from '@mui/material';
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

const StripeCheckoutForm = ({totalPrice}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Create a PaymentIntent on the backend
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post('http://localhost:5000/users/create_payment_intent',  { totalPrice }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true,
            });
            console.log(response.data);
            const { clientSecret } =  response.data;

            console.log('usernmae on card :',  userName)
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: userName, // Replace with actual customer data
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded:', paymentIntent);
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
                label="Name on Card"
                variant="outlined"
                fullWidth
                required
                onChange={(e)=> setUserName(e.target.value)}
            />
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
