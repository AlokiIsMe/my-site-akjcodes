import { Box, Button, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Tag } from "@prisma/client";
import Router from "next/router";
import { FunctionComponent } from "react";

const TagContainer: FunctionComponent<{ tags: Tag[] }> = (props) => {
    const tags = props.tags.map((tag, idx) => {
        return (tag.name !== "Filterable") ? <Box sx={{
            backgroundColor: grey["A700"],
            borderRadius: 100,
            padding: 1
        }} key={idx} marginRight={2}>
            {tag.name}
        </Box> : <div key={idx}/>
    })
    return <>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 2,
            marginTop: 2
        }}>
            {tags}
        </Box>
    </>
}


const BlogShower: FunctionComponent<{
    title: string, createdAt:
        string, id: string, username: string, tags: Tag[], notADMIN?: boolean, cLink?: string
}> = ({ createdAt, title, id, tags, username, notADMIN, cLink }) => {
    const transfer = () => {
        if (notADMIN) {
            Router.push("/UserMadeArticles/" + cLink);
        }
        else {
            Router.push("/Blogs/" + id);
        }
    }
    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        // width:20,
        backgroundColor: "#353839",
        padding: 2,
        marginTop: 5,
        borderRadius: 2
    }} onClick={() => transfer()}>
        <h1>{title}</h1>
        <h5>{createdAt}</h5>
        <h4>@{username}</h4>
        <Divider />
        <TagContainer tags={tags} />
        <Button variant="outlined" onClick={() => transfer()}>
            Go
        </Button>
    </Box>
}

export default BlogShower