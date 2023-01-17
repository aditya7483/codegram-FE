import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from './CoderContainer.module.css';
function CoderContainer() {
  return (
    <>
    
      <Card sx={{ Width: 10, m: 2, height: 150, square: true }} >
        <CardContent  className='d-flex flex-row p-0'>
                          {/* <!-- remove border radius for square shaped pfp paddingB-24px --> */}

        <div
                className={`${styles.user_profile_pic} mt-2 `}
                style={{
                  backgroundImage: `url("https://avatars.dicebear.com/api/initials/.svg")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
        <div className='d-flex flex-column '>
          <Typography
            sx={{ fontSize: 18}}
            color="#8400fd"
            gutterBottom
          >
            CoderName
          </Typography>

          <Typography   variant="body2" className="mt-2" gutterBottom>
            Project based on react.js
          </Typography>
          <Typography  className="mt-2" color="text.secondary">
            Skills
            <br/>
            <span className="badge bg-secondary">c++</span>  
          </Typography>
          </div>
        </CardContent>
      </Card>
    
    </>
  )
}

export default CoderContainer
