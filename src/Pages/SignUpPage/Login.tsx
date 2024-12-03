import { LockOutlined } from "@mui/icons-material";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css"; // Import the CSS module
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoginEnabled(false);
    const userAuth = UserAuthentication.GetInstance();
    try {
      await userAuth.SignUserIn(email, password);
      navigate("/HomePage");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
      setLoginEnabled(true);
    }
  };

  return (
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
          <TextField margin="normal" required fullWidth id="email-login" label="Email Address" name="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password-login"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {loginEnabled && (
            <Button fullWidth variant="contained" className={styles.loginButton} onClick={handleLogin}>
              Login
            </Button>
          )}
          <Grid container className={styles.linkContainer}>
            <Grid size={{ xs: 12 }}>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Grid>
          {errorMsg != "" && (
            <Grid container className={(styles.linkContainer, styles.error)}>
              <Grid size={{ xs: 12 }}>{errorMsg}</Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
