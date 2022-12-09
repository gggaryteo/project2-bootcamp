import "./ProjectGrid.css";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function ProjectGrid({ projects }) {
  return (
    <>
      {projects.length === 0 && (
        <p> There aren't any projects yet! Create one now~ </p>
      )}

      <Grid container spacing={5} direction="row" marginTop="10px">
        {projects.map((taskcard) => (
          <Grid item md={4} key={taskcard.id}>
            <Card
              sx={{
                borderStyle: "solid",
                margin: "5px",
              }}
            >
              <CardContent>
                <Link to={`/taskcards/${taskcard.id}`}>
                  <h4>{taskcard.projectName}</h4>
                  <p>Due by {taskcard.dueDate.toDate().toLocaleDateString()}</p>
                  <div className="assigned-users">
                    {taskcard.storeAssignedUsers.map((user) => (
                      <UserAvatar key={user.photoURL} src={user.photoURL} />
                    ))}
                  </div>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
