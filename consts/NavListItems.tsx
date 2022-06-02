import { Adjust, Animation, Bookmark, Login, Logout, Person } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { ReactElement, useContext } from "react";

export interface NavItemProps {
    label: string
    icon: ReactElement
    url: string
};

const NavItemList: NavItemProps[] = [
    { label: "Home", url: "/", icon: <HomeIcon /> },
    { label: "Blogs", url: "/Blogs", icon: <Bookmark /> },
    {label:"Articles", url: "/UserMadeArticles", icon: <Animation/>}
]

export const AdditionalUserMenus: NavItemProps[] = [
    {
        label: "Logout",
        icon: <Logout />,
        url: "/User/Logout"
    },
    {
        label: "You",
        icon: <Person />,
        url: "/User/"
    }];

export const NoUserMenus: NavItemProps[] = [
    {
        label: "Login",
        icon: <Login />,
        url: "/User/Login"
    },
    {
        label: "Sign In",
        icon: <Adjust />,
        url: "/User/Signin"
    }
]

export default NavItemList;