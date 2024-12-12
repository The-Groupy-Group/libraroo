import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./users/components/Register";
import Login from "./users/components/Login";
import CreateBookCatalog from "./bookCatalog/components/CreateBookCatalog";
import ProtectedRoute from "./shared/ProtectedRoute";
import { TextField } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><TextField/></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddBook" element={<CreateBookCatalog />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
