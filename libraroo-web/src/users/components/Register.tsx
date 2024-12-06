import { Alert, Box, Button, Container, TextField } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../services/users.service";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await UsersService.register({
        firstName,
        lastName,
        email,
        password,
        address,
      });

      await UsersService.login(email, password);

      navigate("/");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      ></Box>

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="firstName"
        autoFocus
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lastName"
        autoFocus
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="Address"
        name="address"
        autoComplete="address"
        autoFocus
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      ></Button>
    </Container>
  );
};
