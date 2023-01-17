import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import styles from "./ProjectContainer.module.css";
function ProjectContainer(props) {
  return (
    
      <Card sx={{ Width: 6, m: 2, height: 150, square: true }}>
        <CardContent>
          <Typography
          component={'div'}
            sx={{ fontSize: 18, margin: "auto" }}
            color="#8400fd"
            gutterBottom
          >
            {props.title}
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
