
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CDrawer from '../Drawer/Drawer';
import { InitialProps } from '../../pages/_app';

export default function CAppBar({ user }: InitialProps) {
    const isUserAvailable = user.id !== 0;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <CDrawer isUser={isUserAvailable} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow:2
                        }}>
                        AKJCodes
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}