import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import styles from "./ProjectContainer.module.css";
function ProjectContainer(props) {
  return (
    
      <Card sx={{ Width: 6, m: 2, height: 120, square: true }}>
        <CardContent>
          <Typography 
          className="d-flex flex-row flex-fill justify-content-between"
          component={'div'}
            sx={{ fontSize: 18, margin: "auto" }}
            color="#8400fd"
            gutterBottom
          >
           <Link to="/project/view"> {props.title}</Link>
           <Stack direction="row" className="flex-wrap" spacing={1}>    
                 <Chip
                 label={"Status"}        
                 /> </Stack>
          </Typography>

          <Typography component={'div'} variant="body2" className="mt-2">
            {props.desc}
          </Typography>
          <Typography sx={{ mb: 1.5 }} component={'div'} 
           className="mt-2" color="text.secondary">
            <span className="badge bg-secondary">{props.skills}</span>
          </Typography>
        </CardContent>
      </Card>
    
  );
}

export default ProjectContainer;
