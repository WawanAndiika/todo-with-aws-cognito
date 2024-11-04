import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "@/lib/error";
import { Resource } from "sst/resource";

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

  try {
    const response = await fetch(`${Resource.Api.url}/todos?sub=${userSub}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)
    
    const data = await response.json();
    return NextResponse.json({
      status: "ok",
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch todos",
    });
  }
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

  try {
    const response = await fetch(Resource.Api.url + '/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToAdd),
    });
    
    const data = await response.json();
    return NextResponse.json({
      status: response.status,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to add todo",
    });
  }
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

  try {
    const response = await fetch(`${Resource.Api.url}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    });
    
    const data = await response.json();
    return NextResponse.json({
      status: response.status,
      message: data.message,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to update todo",
    });
  }
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

    const response = await fetch(`${Resource.Api.url}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        message: "Failed to delete todo",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Successfully deleted the todo",
    });
  } catch (error) {
    errorHandler("deleteData", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred",
    });
  }
}
