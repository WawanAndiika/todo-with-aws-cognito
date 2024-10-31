import { addData, deleteData, retrieveDataByUserSub, setData } from "@/lib/firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "@/lib/error";

export async function GET(request: NextRequest) {
  // Retrieve the session to get the user information
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }
  
  const userSub = session.user.sub;

  // Retrieve data based on the 'sub'
  const data = await retrieveDataByUserSub("todo", userSub ?? "");

  return NextResponse.json({
    status: 200,
    message: "Success",
    data
  });
}

export async function POST(request: NextRequest) {
  // Retrieve the session to get the user information
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }
  
  const userSub = session.user.sub;

  const body = await request.json();
  const dataToAdd = {
    ...body,
    sub: userSub,
  };

  const data = await addData("todo", dataToAdd);

  return NextResponse.json({
    status: 200,
    message: "Success",
    data
  });
}

export async function PUT(request: NextRequest) {
  // Retrieve the session to get the user information
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }
  const userSub = session.user.sub;

  const url = new URL(request.url);
  const id = url.searchParams.get('id'); 

  const body = await request.json();
  const dataToUpdate = {
    ...body,
    sub: userSub,
  };

  const data = await setData("todo", id ?? "", dataToUpdate);

  return NextResponse.json({
    status: 200,
    message: "Success",
    data
  });
}

export async function DELETE(request: NextRequest) {
  // Retrieve the session to get the user information
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        status: 400,
        message: "Document ID is required",
      });
    }

    const deleteResult = await deleteData("todo", id);

    if (!deleteResult.success) {
      return NextResponse.json({
        status: 500,
        message: "Failed to delete document",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Successfully deleted the document",
    });
  } catch (error) {
    errorHandler("deleteData", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred",
    });
  }
}