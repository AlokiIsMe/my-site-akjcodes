import { Adjust, Login, Logout, Menu, Person } from "@mui/icons-material";
import { Button, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box, width } from "@mui/system";
import Link from "next/link";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import NavItemList, { NavItemProps, NoUserMenus, AdditionalUserMenus } from "../../consts/NavListItems";

interface props extends NavItemProps {
    setter: Dispatch<SetStateAction<boolean>>
}

const NavItem: FunctionComponent<props> = ({ label, icon, setter, url }) => {
    return <>
        <ListItem key={label}>
            <Link href={url}>
                <ListItemButton onClick={() => setter(false)}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItemButton>
            </Link>
        </ListItem>
    </>
}

const CDrawer: FunctionComponent<{ isUser: boolean }> = ({ isUser }) => {
    const [open, setOpen] = useState(false)
    const additionalUserMenus: NavItemProps[] =AdditionalUserMenus;

    const notUserMenus:NavItemProps[] = NoUserMenus;

    let navItemList = NavItemList
    if (isUser)
        navItemList = [...navItemList,...additionalUserMenus]
    else 
        navItemList = [... navItemList, ... notUserMenus];

    const Glist = navItemList.map(({ label, icon, url }, idx) => {
        return <NavItem key={idx} label={label} url={url} icon={icon} setter={setOpen} />
    });
    return <>
        <IconButton aria-label="Menu Button" onClick={() => setOpen(true)}>
            <Menu />
        </IconButton>
        <Box onClick={() => setOpen(false)}>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List>
                    <Box sx={{
                        width: 220
                    }} />
                    {Glist}
                </List>
            </Drawer>
        </Box>
    </>
}

export default CDrawer;
