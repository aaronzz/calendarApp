import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Calendar from "./pages/Calendar";
import Favourite from "./pages/Favourite";
import Layout from "./Layout";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Calendar />} />
            <Route path="Favourite" element={<Favourite />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
