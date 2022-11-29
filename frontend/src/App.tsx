import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateProfessional } from "./pages/CreateProfessional";
import { Home } from "./pages/Home";
import { EditProfessional } from "./pages/EditProfessional";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/professional/new" element={<CreateProfessional/>} />
        <Route path="/professional/edit/:userCpf" element={<EditProfessional/>} />       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
