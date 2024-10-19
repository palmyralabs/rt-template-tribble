import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GridPage from './Pages/GridPage';
import { MainLayout } from './layout/main/MainLayout';
import NewFormPage from './Pages/NewFormPage';
import ViewFormPage from './Pages/ViewFormPage';
import DrawerGridPage from './Pages/DrawerGridPage';
import DialogGridPage from './Pages/DialogGridPage';
import EditFormPage from './Pages/EditFormPage';
import EditGridPage from './Pages/GridEditPage';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout appTitle='Template Demo' />} >
            <Route path="/grid" element={<GridPage />} />
            <Route path="/grid/new" element={<NewFormPage />} />
            <Route path="/grid/edit/:id" element={<EditFormPage />} />
            <Route path="/grid/view/:id" element={<ViewFormPage />} />
            <Route path="/editGrid" element={<EditGridPage />} />
            <Route path="/editGrid/new" element={<NewFormPage />} />
            <Route path="/editGrid/edit/:id" element={<EditFormPage />} />
            <Route path="/drawerGrid" element={<DrawerGridPage />} />
            <Route path="/dialogGrid" element={<DialogGridPage />} />
            <Route path="*" element={<h1>Under Construction</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
