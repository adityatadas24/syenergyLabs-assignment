import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./Components/UserList";
import UserDetails from "./Components/UserDetails";
import UserForm from "./Components/UserForm";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/create" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default App;
