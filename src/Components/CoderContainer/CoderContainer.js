import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from './CoderContainer.module.css';
import { Link, Navigate, useSearchParams } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

function CoderContainer(props) {
  const [loading, setLoading] = useState(false);
  const [nav, setNav] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const { fetchData } = props
  const handleAccept = async () => {
    setLoading(true)
    try {
      axios.put(`/project/acceptRequest/${searchParams.get('pid')}/${props.username}`)
    } catch (error) {
      window.alert(`An error occured`)
      console.log(error)
    }
    fetchData instanceof Function && fetchData()
  }
  const handleReject = async () => {
    setLoading(true)
    try {
      axios.delete(`/project/rejectRequest/${searchParams.get('pid')}/${props.username}`)
    } catch (error) {
      window.alert(`An error occured`)
      console.log(error)
    }
    fetchData instanceof Function && fetchData()
  }

  return (
    <>
      <Card sx={{ width: '100%', m: 2, height: 80, square: true }} className=" mx-auto">

        <CardContent className='d-flex flex-row p-0'>
          {/* <!-- remove border radius for square shaped pfp paddingB-24px --> */}

          <div
            className={`${styles.user_profile_pic} mt-2 `}
            style={{
              backgroundImage: `url("https://api.dicebear.com/5.x/pixel-art/svg?seed=${props.username}")`,
              backgroundRepeat: `no-repeat`,
              border: `1px solid #ccdbe3`
            }}
          ></div>
          <div className='align-self-center d-flex justify-content-between' style={{ width: '100%' }}>
            <Typography component={'div'}
              sx={{ fontSize: 18 }}
              color="#8400fd"
              gutterBottom
            >
              <span style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => { setNav(true) }}> {props.username}</span>
              {nav && <Navigate to={'/profile'} state={{
                ...props
              }}
              />
              }
            </Typography>
            {props.request && <div>
              <LoadingButton variant="outlined" loadingPosition="center" color="success" loading={loading} onClick={handleAccept}>
                Accept
              </LoadingButton>
              <ClearIcon onClick={handleReject} className="mx-2" style={{ cursor: 'pointer' }} />
            </div>}

          </div>
        </CardContent>
      </Card>

    </>
  )
}

export default CoderContainer
