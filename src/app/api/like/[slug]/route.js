import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const POST = async (req,{params}) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }
const { slug } = params; 
  try {
    const user = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
      
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      
        const post = await prisma.post.findUnique({
          where: { slug:slug },
        });
      
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
      
        // Check if the user has already liked the post
        const existingLike = await prisma.like.findFirst({
          where: { userId: user.id, postId: post.id },
        });
      
        if (existingLike) {
          return res.status(400).json({ message: 'User already liked the post' });
        }
      
        // Create a new like
        await prisma.like.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });

    return new NextResponse(JSON.stringify( { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

