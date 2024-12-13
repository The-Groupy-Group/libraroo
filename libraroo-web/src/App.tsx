import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Register } from "./users/components/Register";
import Login from "./users/components/Login";
import { CreateBookCatalog } from "./bookCatalog/components/CreateBookCatalog";
import ProtectedRoute from "./shared/ProtectedRoute";
import { TextField } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TextField />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      
        <Route
          path="book-catalog/*"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="add-book" element={<CreateBookCatalog />} />
          <Route index element={<Navigate to="list" />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
