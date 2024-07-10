import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { cartActions } from '../store/cartslice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  backgroundColor: '#F8F8F8', // Beige background color
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'black',
});

export default function Navbar() {
  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scrollToContacts = (event) => {
    event.preventDefault(); // Prevent the default anchor link behavior
    navigate('/');
    const contactsElement = document.getElementById('contacts');
    if (contactsElement) {
      contactsElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element
    }
  };
  const signOut = async () => {
    await logout();
    dispatch(cartActions.resetCart());

    setTimeout(() => {
      navigate('/register'); // Redirect to homepage after 2 seconds
      }, 5000);

  }
  
  return(
    <>
      <AppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            ShopCart
          </Link>
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/" style={{ marginRight: 10 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/product-lists" style={{ marginRight: 10 }}>
            Products
          </Button>
          <Button color="inherit" onClick={scrollToContacts} style={{ marginRight: 10 }}>
            Contact
          </Button>
        </div>
        <div>
          <IconButton color="inherit" component={Link} to="/cart" style={{ marginRight: 10 }}>
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" component={Link} to="/account" style={{ marginRight: 10 }}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={signOut}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </StyledToolbar>
    </AppBar>
    </>
  );
}