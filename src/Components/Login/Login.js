import React, { useState } from 'react'
import styles from './Login.module.css'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import inputData from "../../Common-Resources/inputData.json"
import { isValidEmail } from '../../Common-Resources';
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material';
import Loading from '../../Assets/loading-logo.gif'
const Login = () => {

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true)
  const [fields, setFields] = useState({
    email: '',
    username: '',
    password: '',
    skills: []
  });
  const [error, setError] = useState('');

  const onChangeSkills = (event, value) => {
    setFields({
      ...fields,
      skills: [...value]
    })
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (fields.username.length < 5 || fields.password.length < 5) {
      setLoading(false)
      setError('The username and password must contain atleast 5 characters')
    }
    else {
      try {
        const res = await axios.post('/auth/login', {
          username: fields.username,
          password: fields.password
        });
        window.localStorage.setItem('auth-token', `${res.data.authToken}`)
        window.location.reload()
      } catch (error) {
        setError((error.response.data.err || 'An error occurred'))
      }
    }
    setLoading(false)
  }


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (!isValidEmail(fields.email)) {
      setError('Please Enter a valid email')
    }
    else if (fields.username.length < 5 || fields.password.length < 5) {
      setError('The username and password must contain atleast 5 characters')
    }
    else if (fields.skills.length === 0) {
      setError('All fields are required')
    }
    else {
      try {
        const res = await axios.post('/auth/signup', {
          ...fields
        });
        window.localStorage.setItem('auth-token', `${res.data.authToken}`)
        window.location.reload()
      } catch (error) {
        setError((error.response.data.err || 'An error occurred'))
      }
    }
    setLoading(false)
  }

  return (
    <div>

      <Backdrop
        sx={{ color: '#040815', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <img src={Loading} alt="" />
      </Backdrop>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="LoginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {login ? 'Login' : 'Create Account'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
              <div className="modal-body">
                {error.length !== 0 && <div className="alert alert-danger" role="alert">
                  {error}
                </div>

                }
                {
                  !login &&
                  <>
                    <div className="mb-3">
                      <label htmlFor="loginEmail" className="form-label">Email</label>
                      <input type="email" value={fields.email} name="email" className="form-control" id="loginEmail" placeholder="Enter Your Email" required onChange={handleFieldChange} />
                    </div>
                  </>
                }
                <div className="mb-3">
                  <label htmlFor="loginUsername" className="form-label">Username</label>
                  <input type="text" name="username" className="form-control" id="loginUsername" placeholder="Enter Your Username" value={fields.username} required minLength={'4'} onChange={handleFieldChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPass" className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" id="loginPass" placeholder="Enter Your Password" value={fields.password} required minLength={'5'} onChange={handleFieldChange} />
                </div>

                {!login && <Autocomplete
                  disableClearable
                  clearOnEscape
                  id="combo-box-2"
                  className="my-4"
                  options={inputData.skills.data}
                  multiple
                  value={fields.skills}
                  onChange={onChangeSkills}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Enter your skills"
                    />
                  )}
                />}

              </div>
              <div className="modal-footer justify-content-center flex-column">
                <div className="d-grid gap-2 col-6 mx-auto">
                  {
                    login ? <button type="submit" className={`btn_prim ${styles.primary_btn}`} onClick={handleLogin}>Login</button> :
                      <button type="submit" className={`btn_prim ${styles.primary_btn}`} onClick={handleSignup}>Signup</button>
                  }
                </div>
                <p className='text-center mt-3'>
                  {
                    login ?
                      <>
                        Dont have an account? <button className={`border-0 ${styles.change_btn}`} onClick={() => {
                          setLogin(false);
                        }}>Signup</button>
                      </> :
                      <>
                        Already have an account? <button className={`border-0 ${styles.change_btn}`} onClick={(e) => {
                          e.preventDefault()
                          setLogin(true);
                        }}>Login</button>
                      </>
                  }
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login