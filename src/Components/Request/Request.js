import React, { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Request(props) {
  const[count,setCount]=useState(0);
  const [color,setColor]=useState('success')
  const handleclick=()=>{
    setCount(1);
    setColor('danger');
    if(count===1){setCount(0); setColor('success')}
  }
  return (
    <div>
      <Card sx={{ Width: 6, m: 2, height: 90, square: true }}>
        <CardContent  className="d-flex flex-row justify-content-between">
        <Typography component={'div'}
              sx={{ fontSize: 18 }}
              color="#8400fd"
              gutterBottom
            >
              <Link to="/profile"> Username</Link>
            </Typography>
      <Typography component={'div'} variant="body2" className="mt-2" gutterBottom>
       has requested to join -{props.title}
      </Typography>
        <div><button type="button" className={`btn btn-${color}`}  onClick={handleclick}>{count===0?"accept":"cancel"}</button></div>
        </CardContent>
      </Card>
     
    </div>
  )
}

export default Request
