import BlogShower from "@components/BlogComponents/BlogShower";
import { CTitle, CHeader } from "@components/Components";
import { Box } from "@mui/material";
import { Tag, Article } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { FunctionComponent } from "react";
import Image from "next/image";
import {prisma} from "@services/global";

function JumpBroton() {
  return <Box sx={{
    display:"block"
  }}>
    <Image alt='Welcome Image' layout='responsive' width={4} height={2} src="/MyBackgoundTransparent.png"/>
  </Box>
}

// export const getServerSideProps:GetServerSideProps = async ()=>{
//   const latestBlog = await (prisma?.article.findMany({
//     orderBy:{
//       createdAt:"desc"
//     }
//   }))
//   const blogTags = await prisma?.article.findFirst().tags();
//   return {
//     props:{
//       //@ts-ignore
//       blog:JSON.stringify(latestBlog[0]),
//       tags:JSON.stringify(blogTags),
//     }
//   }
// }


function Announcement(){
  return <>
    <CTitle>
      Announcement
    </CTitle>
    We have also include User Made Posts to make this site more informative.Here are some key points 
    <ol>
      <li>You have to Login In in Order to Comment or Make your own post</li>
      <li>You can post in Markdown Format (HTML will bit more overpowered)</li>
      <li>You will gain Social-Points as per Client Liking and commenting</li>
    </ol>
  </>
}

const LatestPost:FunctionComponent<{title:string,createdAt:string,id:string,tags:Tag[],username:string}> = (props)=>{
  return<>
    <CTitle>
      Latest Article By Admin
    </CTitle>
    <BlogShower {...props}/>
  </>
}
//blog:string,tags:string
const Home: NextPage<{}> = (props) => {
  // const blog:Article = JSON.parse(props.blog);
  // const tags:Tag[]= JSON.parse(props.tags)
  return <>
    <CHeader title="AKJCodes" desc="Blog Page" />
    <JumpBroton/>
    <Announcement/>
    {/* <LatestPost {...blog} createdAt={new Date(blog.createdAt).toDateString()} tags={tags}/> */}
  </>
}

export default Home