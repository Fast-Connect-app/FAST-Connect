import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css"; // Import the CSS module

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box className={styles.container}>
          <Avatar className={styles.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" className={styles.title}>
            Login
          </Typography>
          <Box className={styles.form}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              className={styles.loginButton}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container className={styles.linkContainer}>
              <Grid size={{ xs: 12 }}>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
