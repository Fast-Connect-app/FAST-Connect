import React, { Component, ReactNode } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./StudyMaterial.module.css"; // Import the CSS module
import AbstractPage, { AbstractPageState } from "../AbstractPages";
import {
    PageTitleContext,
    PageTitleContextType,
  } from "../../Layouts/MainLayout";

class StudyPage extends AbstractPage {
    // changes page title to "Study Material"
    static contextType = PageTitleContext; // Correct contextType assignment
    componentDidMount() {
        const { setPageTitle } = this.context as PageTitleContextType;
        setPageTitle("Study Material");
    }
    renderContent() {
        return (
            // fragment to allow multiple divs
            <>
                <div>
                    hi
                </div>
            </>
            
        )
    }
}

export default StudyPage;