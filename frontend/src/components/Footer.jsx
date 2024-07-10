import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { Facebook, Instagram, Twitter, Google, LinkedIn, GitHub } from '@mui/icons-material';

const Footer = () => {
  const StyledIconButton = styled(IconButton)({
    marginRight: '10px',
  });

  return (
    <footer style={{ backgroundColor: '#F8F8F8', color: 'black' }}>
      <Box py={4}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <StyledIconButton color="inherit">
                <Facebook />
              </StyledIconButton>
            </Grid>
            <Grid item>
              <StyledIconButton color="inherit">
                <Instagram />
              </StyledIconButton>
            </Grid>
            <Grid item>
              <StyledIconButton color="inherit">
                <Twitter />
              </StyledIconButton>
            </Grid>
            <Grid item>
              <StyledIconButton color="inherit">
                <Google />
              </StyledIconButton>
            </Grid>
            <Grid item>
              <StyledIconButton color="inherit">
                <LinkedIn />
              </StyledIconButton>
            </Grid>
            <Grid item>
              <StyledIconButton color="inherit">
                <GitHub />
              </StyledIconButton>
            </Grid>
          </Grid>

          <Box my={4} textAlign="center">
            <Typography variant="h6">
              Sign up for our newsletter
            </Typography>
            <Grid container alignItems="center" spacing={1} justifyContent="center">
              <Grid item xs={12} md={5}>
                <TextField
                  id="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  placeholder="Email Address"
                  InputProps={{
                    style: { backgroundColor: 'white' },
                  }}
                />
              </Grid>
              <Grid item>
                <Button variant="outlined" color="inherit" style={{ fontSize: '14px', borderWidth: '1px', borderColor: 'black', minWidth: '80px' }}>
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="body1">
            Welcome to ShopCart, your one-stop destination for all things trendy and fashionable. We are passionate about providing you with high-quality products that not only enhance your style but also fit seamlessly into your lifestyle. At ShopCart, we believe in the power of fashion to express individuality and boost confidence. Our carefully curated collection brings you the latest trends, timeless classics, and everything in between.
          </Typography>

          <Box my={4} sx={{mx: '25%'}}>
            <Grid container justifyContent="space-between"  spacing={3}>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" gutterBottom>
                  MENU
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>
                    <Link href="#" color="inherit">
                      <Typography variant="body1">
                        <i className="fa fa-solid fa-home mx-2" />Home
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" color="inherit">
                      <Typography variant="body1">
                        <i className="fa fa-solid fa-info mx-2" />About
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" color="inherit">
                      <Typography variant="body1">
                        <i className="fa fa-brands fa-envira mx-2" />Gallery
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" gutterBottom>
                  CONTACT
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>
                    <Link href="#" color="inherit">
                      <Typography variant="body1">
                        <i className="fa fa-solid fa-phone mx-2" />Phone
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" color="inherit">
                      <Typography variant="body1">
                        <i className="fa fa-solid fa-address-book mx-2" />Address
                      </Typography>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" color="inherit">
                    <Typography variant="body1">
                        <i className="fa fa-solid fa-envelope mx-2" />Email
                      </Typography>
                    </Link>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Box>

          <Box borderTop={1} borderColor="rgba(0, 0, 0, 0.05)" py={3} textAlign="center">
            <Typography variant="body2">
              © {new Date().getFullYear()} ShopCart
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;