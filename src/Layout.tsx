import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "./style/layout.css";
export default function Layout() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="layoutNavBar">
        <Button
          data-testid={`layout-home`}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <nav>
          <ul>
            <li>
              <Link to="/">Calendar</Link>
            </li>
            <li>
              <Link to="/Favourite">Favourite</Link>
            </li>
          </ul>
        </nav>
      </div>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
