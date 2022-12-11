import "./TaskCard.css";
import React, { useState } from "react";
import { Card, ClickAwayListener } from "@mui/material";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

// Sections

import CardHeader from "./CardSection/CardHeader";
import CardCategory from "./CardSection/CardCategory";
import CardDescription from "./CardSection/CardDescription";
import CardComment from "./CardSection/CardComment";

// import Button from "@mui/material/Button";

export default function TaskCard() {
  let projectid = useParams().id;

  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="task-card">
        <CardHeader projectid={projectid} />

        <CardCategory projectid={projectid} />

        <CardDescription projectid={projectid} />

        <CardComment projectid={projectid} />
      </div>
    </main>
  );
}
