import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Container,
} from "@mui/material";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Fetch user data from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // ✅ Filter users by name
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container
      sx={{
        paddingY: 4,
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #fce4ec)",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#4a148c" }}
      >
        👥 User Directory
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search by name"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          marginBottom: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 1,
        }}
      />

      {/* Responsive User Cards */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Card
              sx={{
                backgroundColor: "#fff",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  📞 {user.phone}
                </Typography>
                <Typography variant="body2">
                  🌍 {user.address.city}, {user.address.street}
                </Typography>
                <Typography variant="body2">🏢 {user.company.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
