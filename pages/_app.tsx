import CAppBar from '@components/AppBar/Appbar';
import { Alert, AlertColor, createTheme, Snackbar, ThemeProvider } from '@mui/material';
import { User } from '@prisma/client';
import '@styles/globals.css'
import { InitialUser } from 'consts/Variables';
import { AppProps } from 'next/app';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getUserFromStorage } from 'services/clientServices';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export interface InitialProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>,

  snackbar: {
    setMessage: Dispatch<SetStateAction<string>>,
    setType: Dispatch<SetStateAction<string>>,
    setOpen: Dispatch<SetStateAction<boolean>>
  }
}

function MyApp({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState(InitialUser);

  useEffect(()=>{
    const _userI = getUserFromStorage();
    if (_userI!==null){
      setUser(_userI);
    }
  },[setUser]);
  

  //SnackBar
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [open, setOpen] = useState(false);

  const props: InitialProps = {
    user, setUser,
    snackbar: { setMessage, setType, setOpen }
  };

  return <>
    <ThemeProvider theme={darkTheme}>
      <CAppBar {...props} />
      <main>
        <Component {...props} {...pageProps} />

        <Snackbar open={open}
          onClose={() => setOpen(false)} autoHideDuration={6000}>
          <Alert severity={type as AlertColor}>
            {message}
          </Alert>
        </Snackbar>


      </main>
    </ThemeProvider>
  </>
}

export default MyApp
