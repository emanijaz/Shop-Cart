import * as React from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import Divider from '@mui/material/Divider';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar';

const StyledInput = styled(Input)(
    ({ theme }) => `
    
        .${inputClasses.input} {
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
            border-color: ${blue[400]};
        }
    
        &:focus {
            outline: 0;
            border-color: ${blue[400]};
            box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
        }
    `,
    );
    
const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
    if (formControlContext?.filled) {
        setDirty(true);
    }
    }, [formControlContext]);

    if (formControlContext === undefined) {
    return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
    <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
    </p>
    );
})`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;

    &.invalid {
    color: red;
    }
`;


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

export default function Account() {
  return (
        <>
            <Navbar />
            <Container maxWidth="30">
                <Box sx={{  height: '100vh', paddingTop: '5%', px: "10%", flexGrow: 1}}>
                    <Grid container spacing={1} columns={12}>
                        <Grid item xs={3}>
                                
                                <List
                                    sx={{ width: '100%', backgroundColor: "transparent"}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    
                                >
                                    <div className='mb-2' style={{ paddingBlock:"10px", backgroundColor: 'black', color:'white', border: '1px solid black', borderRadius: '5px'}} >
                                        <div className='px-3'>
                                            Personal information
                                        </div>
                                    </div>
                                    <div className='mb-2' style={{ paddingBlock:"10px", border: '1px solid black', borderRadius: '5px'}} >
                                        <div className='px-3'>
                                            My Orders
                                        </div>
                                    </div>
                                    <div className='mb-2' style={{ paddingBlock:"10px", border: '1px solid black', borderRadius: '5px'}} >
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

                            <form>
                                <div className='mb-3'>
                                    <div className='mb-3' style={{ position: 'relative', display: 'inline-block' }}>
                                        <Avatar alt="Avatar" src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" sx={{ width: 150, height: 150 }} />
                                        <EditIcon style={{ position: 'absolute', bottom: 0  , right: 0, marginRight: '10px', marginBottom: '5px', cursor: 'pointer', backgroundColor: '#1F75FE', color: 'white', padding: '5px', borderRadius: '50%', width:35, height: 35 }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" className="form-control" id="first_name" placeholder="First Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" className="form-control" id="last_name" placeholder="Last Name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" placeholder="Email"/>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="phone">Phone</label>
                                    <input type="phone" class="form-control" id="phone" placeholder="Phone"/>
                                </div>
                                <div class="form-row mb-3">
                                    
                                    <div class="form-group col-md-4">
                                        <label for="inputGender">Gender</label>
                                        <select id="inputGender" class="form-control">
                                            <option selected>Choose...</option>
                                            <option>Female</option>
                                            <option>Male</option>
                                            <option>Other</option>

                                        </select>
                                    </div>
                                    
                                </div>
                                <button type="button" className="btn btn-dark btn-block" 
                                    style={{ 
                                        width: '20%', 
                                        padding: '10px', 
                                        fontSize: '16px', 
                                        textAlign: 'center'
                                    }}
                                >
                                        Update
                                </button>
                                </form>
                        </Grid>
                        
                    </Grid>
                </Box>
        </Container>
            
        </>
    )
}
