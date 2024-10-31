'use client'

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { columns, Todo } from "./datatable/columns";
import { DataTable } from "./datatable/data-tables";
import { deleteTodo, fetchTodo } from "@/services/todo.service";
import { toast } from "@/hooks/use-toast";
import { errorHandler } from "@/lib/error";
import EditTaskDialog from "./edit";

export default function DataTask() {

  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { data: todos = [], error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo
  });

  const deleteData = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast({
        title: "Success delete todo",
        description: "The database successfully remove the todo!",
      });
    },
    onError: (error) => {
      errorHandler("post todo", error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <>
    <DataTable 
      columns={
        columns({
          handleDelete(id) {
            deleteData.mutate(id);
          },
          handleEdit(id) {
            const task = todos.find((x: Todo) => x.id === id);
              setEditingTask(task);
              setIsEditOpen(true);
          },
        })} 
        data={todos} 
      />
    {editingTask && (
      <EditTaskDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={editingTask}
      />
    )}
    </>
  );
}
