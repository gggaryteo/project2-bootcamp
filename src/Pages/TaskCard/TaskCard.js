import "./TaskCard.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import TaskDetails from "./TaskDetails";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import CardComment from "./CardSection/CardComment";
import CardHeader from "./CardSection/CardHeader";

export default function TaskCard() {
  // Get the ID from the URL. That is defined when we set up the routes in App.js
  const { id } = useParams();
  // custom hook
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Card
            sx={{
              top: "50%",
              left: "50%",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "5px",
              width: "50vw",
              padding: "20px",
              backgroundSize: "200%",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              transition: "0.6s",
              backgroundImage:
                "linear-gradient(45deg, #FFC312, #EE5A24, #00a8ff)",
              "&:hover": { backgroundPosition: "right" },
            }}
          >
            <TaskDetails taskData={document} />
          </Card>

          <Card
            sx={{
              marginTop: "10px",
              top: "50%",
              left: "50%",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "5px",
              width: "50vw",
              padding: "20px",
              backgroundSize: "200%",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              transition: "0.6s",
              backgroundImage:
                "linear-gradient(45deg, #FFC312, #EE5A24, #00a8ff)",
              "&:hover": { backgroundPosition: "right" },
            }}
          >
            <CardComment projectid={id} />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
