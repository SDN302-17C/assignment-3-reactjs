import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postQuiz } from "../../services/api";
import IQuiz from "../../models/Quiz";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "1.2rem",
      color: "#555",
    },
  },
});

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const quiz = { title, description };
    try {
      await postQuiz(quiz as IQuiz);
      setTitle("");
      setDescription("");
      setError(null);
      setSuccessMessage("Quiz created successfully");
      setTimeout(() => {
        navigate("/quizzes");
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ textAlign: "center", margin: "20px 0" }}
        >
          Create Quiz
        </Typography>
        {successMessage && (
          <Alert severity="success" style={{ marginBottom: "20px", fontSize:"20px" }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate("/quizzes")}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" color="success">
              Create Quiz
            </Button>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CreateQuiz;