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

      <Grid container spacing={5} flexGrow="1" direction="row" marginTop="10px">
        {projects.map((taskcard) => (
          <Grid item md={4} xs={12} sm={6} key={taskcard.id}>
            <Card
              sx={{
                borderStyle: "solid",
                margin: "5px",
                borderWidth: "2px",
                transition: "transform 0.15s ease-in-out",
                "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
              }}
              style={{ height: "100%", width: "100%" }}
            >
              <CardContent>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/taskcards/${taskcard.id}`}
                >
                  <p className="p-title">{taskcard.projectName}</p>
                  <p className="due-date">
                    Due by {taskcard.dueDate.toDate().toLocaleDateString()}
                  </p>
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
