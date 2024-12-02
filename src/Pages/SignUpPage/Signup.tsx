import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css"; // Import the CSS module
import { UserAuthentication } from "../../../Backend/UserAuth/UserAuthentication";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEnabled, setRegisterEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    setRegisterEnabled(false);
    const userAuth = UserAuthentication.GetInstance();
    try {
      await userAuth.CreateUser(name, email, password);
      await userAuth.SignUserIn(email, password);
      navigate("/HomePage");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
      setRegisterEnabled(true);
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
          Register
        </Typography>
        <Box className={styles.form}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField name="name" required fullWidth id="name" label="Name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField required fullWidth id="email-signup" label="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField required fullWidth name="password-signup" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" className={styles.registerButton} onClick={registerEnabled ? handleRegister : undefined} disabled={!registerEnabled}>
            Register
          </Button>
          <Grid container className={styles.linkContainer}>
            <Grid size={{ xs: 12 }}>
              <Link to="/login">Already have an account? Login</Link>
            </Grid>
          </Grid>
          {errorMsg != "" && (
            <Grid container className={styles.linkContainer}>
              <Grid size={{ xs: 12 }}>{errorMsg}</Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
