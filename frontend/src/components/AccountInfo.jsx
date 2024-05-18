import React, {useState, useRef} from 'react'
import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar';


export default function AccountInfo({ userData, handleInputChange, handleSubmit }) {
    const [avatar, setAvatar] = useState("https://mdbcdn.b-cdn.net/img/new/avatars/2.webp");
    const fileInputRef = useRef(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        console.log('file :', file)
        if (file) {
            const reader = new FileReader();
            console.log('reader: ', reader)
            reader.onloadend = () => {
                console.log('reader result: ', reader.result)
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleEditIconClick = () => {
        fileInputRef.current.click();
    };
    return (
    <div>
        <h5>Account Settings</h5>
        <hr/>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <div className='mb-3' style={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar alt="Avatar" src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" sx={{ width: 150, height: 150 }} />
                    <EditIcon   onClick={handleEditIconClick} style={{ position: 'absolute', bottom: 0  , right: 0, marginRight: '10px', marginBottom: '5px', cursor: 'pointer', backgroundColor: '#1F75FE', color: 'white', padding: '5px', borderRadius: '50%', width:35, height: 35 }} />
                    <input id="upload-avatar" type="file" accept="image/*" style={{ display: 'none' }}  ref={fileInputRef}  onChange={handleAvatarChange} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" id="first_name" name="firstName" placeholder="First Name" value={userData?.firstName?.value || ''} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="lastName" placeholder="Last Name" value={userData?.lastName?.value || ''} onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Email" value={userData?.email?.value || ''} onChange={handleInputChange}/>
            </div>
            <div class="form-group mb-3">
                <label for="phone">Phone</label>
                <input type="tel" class="form-control" id="phone" name="phone" placeholder="Phone" value={userData?.phone?.value || '0000000'} onChange={handleInputChange}/>
            </div>
            <div class="form-row mb-3">
                <div class="form-group col-md-4">
                    <label for="inputGender">Gender</label>
                    <select id="inputGender" class="form-control" name="gender" onChange={handleInputChange} value={userData.gender.value}>
                        <option >Choose...</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>

                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-dark btn-block"
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
    </div>
)}
