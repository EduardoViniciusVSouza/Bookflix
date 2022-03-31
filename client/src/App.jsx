import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";
import LoginForm from "./Components/LoginForm/LoginForm";
import BooksList from "./Components/BooksList/BooksList";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import RegisterAdminForm from "./Components/RegisterAdminForm/RegisterAdminForm";
import ReservedBooksList from "./Components/ReservedBooksList/ReservedBooksList";
import UserCard from "./Components/UserCard/UserCard";
import UsersList from "./Components/UsersList/UsersList";

function App() {
  localStorage.setItem('isLogged', false)

  return (
    <Router>
      <Header></Header>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/registerAdmin" element={<RegisterAdminForm />} />
        <Route path="/reserved" element={<ReservedBooksList/>}></Route>
        <Route path="/users" element={<UsersList/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
