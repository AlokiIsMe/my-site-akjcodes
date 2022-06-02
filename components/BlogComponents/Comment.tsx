import { TextFieldsOutlined } from "@mui/icons-material";
import { CardContent, Typography, CardActions, Button, Card, TextField, Box } from "@mui/material";
import { Comment } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FunctionComponent } from "react";
import { ServerAPI } from "../../consts/Variables";
import { InitialProps } from "../../pages/_app";

const CommentShower: FunctionComponent<Comment> = ({ createdAt, username, content }) => {
    const card = (
        <Card variant={"outlined"} sx={{
            marginBottom: 3
        }}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {new Date(createdAt).toDateString()}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {content}
                    </Typography>
                    <Typography variant="body2">
                        @{username}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </React.Fragment>
        </Card>
    );
    return card
}

const CommentContainer: FunctionComponent<{ comments: Comment[] }> = ({ comments }) => {
    return <Box marginTop={6}>
        {comments.map((comment,key) => {
            return <CommentShower key={key} {...comment} />
        })}
    </Box>
}
export default CommentContainer;

interface AddCommentProps extends InitialProps {
    blogId: string
    setComments:Dispatch<SetStateAction<Comment[]>>
}
export const AddComment: FunctionComponent<AddCommentProps> = ({ user, blogId, snackbar ,setComments}) => {
    const [content, setContent] = useState("")

    return <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end"
    }}>
        <TextField margin="dense" id="CommentContent" onChange={(e) => {
            setContent(e.target.value);
        }} />
        <Button variant="contained" sx={{
            width:1/3+0.1,
            // marginLeft:100/2
        }} onClick={async () => {
            const json = await (await fetch(ServerAPI("/api/Blog/addComment"), {
                method: "POST",
                body: JSON.stringify({
                    username: user.username,
                    blogId: blogId,
                    content
                })
            })).json() as { message: string, type: string, comment: Comment };

            snackbar.setType(json.type);
            snackbar.setMessage(json.message);
            snackbar.setOpen(true);
            
            if (json.type === "success"){
                setComments(prev=>[json.comment,...prev]);   
            }
        }}>
            Post
        </Button>
    </Box>
}