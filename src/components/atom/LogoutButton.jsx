import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { logOut } from "../../utils/logOut";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  return (
    <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "error.main" }} />
        </ListItemButton>
      </List>
  );
}

export default LogoutButton;