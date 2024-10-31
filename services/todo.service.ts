import { errorHandler } from "@/lib/error";

export const fetchTodo = async (data: any) => {
  try {
    const response = await fetch("/api/todo", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
    errorHandler("fetch-todo", "response not oke while post todo");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    errorHandler("fetch-todo", error);
  }
};

export const postTodo = async (data: any) => {
  try {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
    errorHandler("post-todo", "response not oke while post todo");
    }

    const result = await response.json();
  } catch (error) {
    errorHandler("post-todo", error);
  }
};

export const updateTodo = async (id: string, data: any) => {
  try {
    const response = await fetch(`/api/todo?id=${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
    errorHandler("post-todo", "response not oke while post todo");
    }

    const result = await response.json();
  } catch (error) {
    errorHandler("post-todo", error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({id: id}),
    });

    if (!response.ok) {
    errorHandler("delete-todo", "response not oke while delete todo");
    }

    const result = await response.json();
  } catch (error) {
    errorHandler("delete-todo", error);
  }
};