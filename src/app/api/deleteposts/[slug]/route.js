// import { getAuthSession } from "@/utils/auth";
// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";

// // DELETE A POST
// export const DELETE = async (req) => {
//   const session = await getAuthSession();

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }
 
  import { getAuthSession } from "@/utils/auth";
  import prisma from "@/utils/connect";
  import { NextResponse } from "next/server";
  export const DELETE = async (req,{params}) => {
    const session = await getAuthSession();
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  const { slug } = params;  

  try {
    // Find the post by slug
    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        userEmail: true,
      },
    });

    if (!post) {
      return new NextResponse({ status: 404, body: 'Post not found' });
    }

    // Check if the authenticated user is the owner of the post
    if (session.user.email !== post.userEmail) {
      return new NextResponse({ status: 403, body: 'Unauthorized' });
    }
     // Delete comments associated with the post
     await prisma.comment.deleteMany({
        where: { postSlug: slug },
      });

    // Delete the post
    await prisma.post.delete({
      where: { id: post.id },
    });
    return new NextResponse({ status: 204 }); // No content, successful deletion
} catch (error) {
  console.error('Error deleting post:', error);
  return new NextResponse({ status: 500, body: 'Internal Server Error' });
}
}   

//     return new NextResponse(JSON.stringify( { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
