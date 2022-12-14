
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import './css/Profile.css'
import Accordion from 'react-bootstrap/Accordion';
import Dropzone from 'react-dropzone';
import { Box } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import housingapi from '../apiservice/postapi'
import userapi from "../apiservice/userapi";
import { useNavigate } from 'react-router-dom';
import ProfileElementCard from '../components/ProfileElementCard';

function Profile() {
  const navigate = useNavigate()

  var user = JSON.parse(localStorage.user);
  const [postsData, setpostsData] = useState(null);
  const [editUser, setEditUser] = useState(user);
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditUser({
      ...editUser,
      [name]: value
    })

  }

  const editData = async (editUser) => {
    userapi.put('/updateuser', editUser).then((response) => {
      console.log(response, "updated");

      alert(response.data.message)
      localStorage.setItem('user', JSON.stringify(editUser));


    })
      .catch((error) => {
        alert(error.response.data);

        if (error.response + "1") {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request + "2") {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request + "3");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message + "3");
        }
      })

  };
  const deleteAccount = async (event) => {
    userapi.delete('/delete', { params: { email: String(document.getElementById("inputEmailAddress").value) } }).then((response) => {
      console.log(response, "deleted");
      alert(response.data.message)
      localStorage.removeItem("user")
      localStorage.removeItem('log')
      navigate("/")

    })
      .catch((error) => {
        alert(error.response.data.message);

        if (error.response + "1") {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request + "2") {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request + "3");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message + "3");
        }
      })

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("inputPassword").value != document.getElementById("inputConfirmPassword").value) {
      alert("Password field and Confirm Password fields do not match !")
      return
    }
    else {
      console.log(editUser, "submit");
      setEditUser(editUser);
      editData(editUser);
    }


  }


  const getPosts = async () => {
    const response = await housingapi.get('/get');
    let data = response.data.filter(value => value.user_ID ==
      user._id).map((element, i) =>
        <div key={i} className="col-lg-4 mb-3 d-flex align-items-stretch" data-toggle="tooltip" data-placement="right" title="Click to edit the post">
          <ProfileElementCard data={element}></ProfileElementCard>

        </div>
      );
    setpostsData(data);
    console.log(data);
  };
  useEffect(() => {
    getPosts();

  }, []);
  return (
    <div>
      <br /><br />
      <div className="container-xl px-4 mt-4">
        {/* Account page navigation*/}

        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            {/* Profile picture card*/}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header"></div>
              <div className="card-body text-center">
                {/* Profile picture image*/}
                <img className="img-account-profile rounded-circle mb-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ArKQ5AIUqacA-5ofQ5nfPevwR0RtI7PBtg&usqp=CAU" alt="" />
                {/* Profile picture help block*/}
             
                {/* Profile picture upload button*/}
                
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            {/* Account details card*/}
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (first name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                      <input className="form-control" id="inputFirstName" type="text" defaultValue={editUser.firstName} onChange={handleChange} name="firstName" placeholder="Enter your first name" />
                    </div>
                    {/* Form Group (last name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                      <input className="form-control" id="inputLastName" type="text" name="lastName" defaultValue={editUser.lastName} onChange={handleChange} placeholder="Enter your last name" />
                    </div>
                  </div>
                  {/* Form Row        */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (organization name)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputNUID">NUID</label>
                      <input className="form-control" id="inputNUID" type="text" defaultValue={editUser.NUID} readOnly />
                    </div>
                    {/* Form Group (location)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputRole">Role</label>
                      <input className="form-control" id="inputRole" type="text" defaultValue={editUser.role} placeholder="Enter your role" readOnly />
                    </div>
                  </div>
                  {/* Form Group (email address)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                    <input className="form-control" id="inputEmailAddress" type="email" defaultValue={editUser.email} readOnly />
                  </div>
                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (phone number)
              <div className="col-md-6">
                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                <input className="form-control" id="inputPhone" type="tel" defaultValue={user.phoneNumber}  placeholder="(555)123-4567"/>
              </div> */}
                    {/* Form Group (birthday)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPassword"> New Password</label>
                      <input className="form-control" id="inputPassword" name="password" value={editUser.password} onChange={handleChange} type="password" />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputConfirmPassword"> Confirm Password</label>
                      <input className="form-control" id="inputConfirmPassword" type="password" name="confirmPassword" />
                    </div>

                  </div>


                  {/* Save changes button*/}
                  <button className="btn btn-danger" style={{ margin: '5px' }} type="submit">Save changes</button>
                  <button className="btn btn-danger" style={{ margin: '5px' }} type="button" onClick={deleteAccount}>Delete Account</button>
                </form>
              </div>
            </div>
          </div>
          <Accordion defaultActiveKey={['0']}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>You Posts !  </Accordion.Header>
              <Accordion.Body>
                <Row> {postsData}</Row>

              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </div>

      </div>

    </div>
  )
}

export default Profile