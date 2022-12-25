import React, { useState } from 'react'

const Login = () => {

  const [login, setLogin] = useState(true)
  const [fields, setFields] = useState({
    email: '',
    username: '',
    password: '',
    errors: ''
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFields({
      ...fields,
      [name]: value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
  }
  const handleSignup = async (e) => {
    e.preventDefault();
  }

  return (
    <div>

      {/* <!-- Button trigger modal --> */}


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
              {/* Modal Content for Login */}

              <div className="modal-body">
                {fields.errors.length !== 0 && <div className="alert alert-danger" role="alert">
                  {fields.errors}
                </div>

                }
                {
                  !login && <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email</label>
                    <input type="email" value={fields.email} className="form-control" id="loginEmail" placeholder="Enter Your Email" required onChange={handleFieldChange} />
                  </div>
                }
                <div className="mb-3">
                  <label htmlFor="loginUsername" className="form-label">Username</label>
                  <input type="text" className="form-control" id="loginUsername" placeholder="Enter Your Username" value={fields.username} required minLength={'4'} onChange={handleFieldChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPass" className="form-label">Password</label>
                  <input type="password" className="form-control" id="loginPass" placeholder="Enter Your Password" value={fields.password} required minLength={'5'} onChange={handleFieldChange} />
                </div>

              </div>
              <div className="modal-footer justify-content-center flex-column">
                <div className="d-grid gap-2 col-6 mx-auto">
                  {
                    login ? <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button> :
                      <button type="submit" className="btn btn-primary" onClick={handleSignup}>Signup</button>
                  }
                </div>
                <p className='text-center mt-3'>
                  {
                    login ?
                      <>
                        Dont have an account? <button className='border-0 text-primary' onClick={() => {
                          setLogin(false);
                          handleFieldChange();
                        }}>Signup</button>
                      </> :
                      <>
                        Already have an account? <button className='border-0 text-primary' onClick={() => {
                          setLogin(true);
                          handleFieldChange();
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