

import { Helmet } from 'react-helmet';
import Request from '../../../Components/Request/Request';


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./ProjectView.module.css";
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { authenticateUser } from '../../../Common-Resources';


function ProjectView(props) {

  const [data, setData] = useState({});
  const [members, setMembers] = useState([]);
  const [join, setJoin] = useState({
    text: 'Join',
    color: 'primary'
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }
  const authUsername = authenticateUser(AUTH)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`project/filter?pid=${searchParams.get('pid')}`)
      if (res.data[0]) {
        setData({ ...res.data[0] })
      }
      if (authUsername === res.data[0].owner_username) {
        setIsAdmin(true)
        const requests = await axios.post(`project/requests/${searchParams.get('pid')}`)
        setMembers([...requests.data])
      }
    } catch (error) {
      window.alert(`An error occured`)
    }
    setLoading(false)
  }

  const handleJoin = async () => {
    if (join.text === 'Join') {
      setJoin({
        text: 'Requested',
        color: 'secondary'
      })
      try {
        const res = await axios.post(`project/createRequest/${searchParams.get('pid')}`)
      } catch (error) {
        window.alert(`An error occured`)
      }
    }
  }

  useEffect(() => {

    if (props.data) {
      setData({ ...props.data })
    }
    else {
      fetchData()
    }

  }, []);

  return (
    <>
      <Helmet>
        <title>CodeGram | Project</title>
      </Helmet>

      <div
        className={`${styles.main_div} d-flex flex-column align-items-center my-4`}
      >
        <button className={`btn btn-${join.color} px-3 my-5 mx-auto d-block`} onClick={handleJoin}>{join.text}</button>
        <div className={`${styles.main_div} d-flex flex-column align-items-center my-4 "border border-success`}>
          <h1 className='text-center my-4'>{data.title}</h1>
          {loading && <CircularProgress className="mx-auto d-block" color="inherit" />}
          {
            Object.keys(data).map((ele) => {
              return <div className='my-3' key={ele}>
                <h5 className='text-center my-2 d-inline'>{ele.toUpperCase()} :{" "}</h5>
                <span className={`${styles.content} `}>{data[ele]}</span>
              </div>
            })
          }
        </div>
      </div>
      <div className='container my-4'>
        Team members:
        {members.map((ele) => {
          return <Request {...ele} />
        })
        }
      </div>
    </>
  );
}

export default ProjectView