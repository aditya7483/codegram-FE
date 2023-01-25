

import { Helmet } from 'react-helmet';


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "./ProjectView.module.css";
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


function ProjectView(props) {

  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  axios.defaults.baseURL = 'https://codegram-be.vercel.app/api';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const AUTH = window.localStorage.getItem('auth-token');
  if (AUTH && AUTH !== undefined && AUTH.length > 0) {
    axios.defaults.headers.common['auth-token'] = AUTH;
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`project/filter?pid=${searchParams.get('pid')}`)
      console.log(res);
      setData({ ...res.data[0] })
    } catch (error) {
      window.alert(`An error occured`)
    }
    setLoading(false)
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
    </>
  );
}

export default ProjectView