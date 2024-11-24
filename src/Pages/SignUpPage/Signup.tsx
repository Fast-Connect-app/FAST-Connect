import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css"; // Import the CSS module

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {};

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box className={styles.container}>
          <Avatar className={styles.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" className={styles.title}>
            Register
          </Typography>
          <Box className={styles.form}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              className={styles.registerButton}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container className={styles.linkContainer}>
              <Grid size={{ xs: 12 }}>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
