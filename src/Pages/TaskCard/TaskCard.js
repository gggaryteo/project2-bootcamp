import "./TaskCard.css";
import React, { useState } from "react";
import { Card, ClickAwayListener } from "@mui/material";

// Sections

import CardHeader from "./CardSection/CardHeader";
import CardCategory from "./CardSection/CardCategory";
import CardDescription from "./CardSection/CardDescription";
import CardComment from "./CardSection/CardComment";

// import Button from "@mui/material/Button";

export default function TaskCard() {
  /// Project attributes tagged to card
  // Project details
  // Project name
  // Category
  // Assigned user

  const [projectid, setProjectid] = useState("project1");

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="task-card">
        <CardHeader projectid={projectid} />

        <CardCategory />

        <CardDescription />

        <CardComment projectid={projectid} />
      </div>
    </main>
  );
}
