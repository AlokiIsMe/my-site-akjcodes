import { alpha, Box, Button, Checkbox, Divider, FormGroup, InputBase, Menu, MenuItem, styled, Typography } from "@mui/material";
import { FunctionComponent, ReactNode, useState } from "react";
import Head from "next/head";
import FormControlLabel from '@mui/material/FormControlLabel';

export const Center: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    return <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }}>
        {children}
    </Box>
};

export const CHeader: FunctionComponent<{ title: string, desc: string }> = ({ title, desc }) => {
    return <Head>
        <title>
            {title}
        </title>
        <meta name="description" content={desc} />
    </Head>
}

export const CTitle: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    return <>
        <Center>
            <Typography fontWeight={400} variant="h3">
                {children}
            </Typography>
        </Center>
        <CHrDecorator />
    </>
}

export const CHrDecorator: FunctionComponent = () => {
    return <hr className="CHrDecorator" />
}

