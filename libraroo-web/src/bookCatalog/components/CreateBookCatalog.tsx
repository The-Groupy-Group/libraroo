import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookCatalogService from "../services/bookCatalog.service";
import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { Utils } from "../../shared/utils";

export const CreateBookCatalog: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await bookCatalogService.addBookCatalog({
        author,
        title,
        language,
      });

      navigate("/book-catalog/list");
    } catch (err) {
      const error = await Utils.getErrorMessage(err as Error);
      setError(error);
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

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          autoComplete="author"
          autoFocus
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="language"
          label="Language"
          name="language"
          autoComplete="language"
          autoFocus
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          Add book
        </Button>
      </Box>
    </Container>
  );
};
