import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import DashboardProps from '../types/interfaces/props/DashboardProps';

export default function DashboardBar(props: DashboardProps) {
    const navigation = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        navigation("/sign-in");
    };
    return (
        <div>
            <AppBar position="static" style={{ marginBottom: 15 }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Welcome, {props.userName}
                    </Typography>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <PersonIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLogOut}>
                            <ExitToAppIcon style={{ marginRight: 8 }} />
                            Log Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}