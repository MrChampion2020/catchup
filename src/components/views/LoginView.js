import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";
import { FaEye, FaEyeSlash} from "react-icons/fa";

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container maxWidth={"xs"} sx={{ mt: 6 }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
          <Link to="/" color="black" underline="none">
            CatchUp
          </Link>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Typography color="text.secondary">
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            autoComplete="email"
            autoFocus
            required
            id="email"
            name="email"
            onChange={handleChange}
          />
          
          
<Box style={{ position: 'relative' }}>
  <TextField
    label="Password"
    fullWidth
    required
    margin="normal"
    id="password"
    name="password"
    onChange={handleChange}
    type={showPassword ? 'text' : 'password'}
  />
  <FaEye
    size={24}
    color="#000"
    style={{
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    }}
    onClick={() => setShowPassword(true)}
  />
  <FaEyeSlash
    size={24}
    color="#000"
    style={{
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      display: showPassword ? 'block' : 'none',// Hide the eye-slash icon initially
    }}
    onClick={() => setShowPassword(false)}
  />

  
</Box>

          <ErrorAlert error={serverError} />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Login
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginView;
