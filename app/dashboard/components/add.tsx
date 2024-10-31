"use client";

import { useState } from "react";
import { Loader } from "react-feather";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTodo } from "@/services/todo.service";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import FieldInfo from "@/components/form/fieldInfo";
import { errorHandler } from "@/lib/error";
import { mappingPriority, mappingStatus } from "@/lib/mapping";

const todoSchema = z.object({
  code: z.string().min(1, "code is required"),
  title: z.string().min(1, "title is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "done"]),
});

type TodoSchema = z.infer<typeof todoSchema>;

const AddTaskDialog = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast({
        title: "Success adding new todo",
        description: "The database successfully saved the new todo!",
      });
      setIsOpen(false);
    },
    onError: (error) => {
      errorHandler("post todo", error);
    },
  });

  const form = useForm({
    defaultValues: {
      code: '',
      title: '',
      priority: 'low',
      status: 'todo'
    } as TodoSchema,
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: todoSchema,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <form.Field
            name="code"
            children={(field) => {
              return (
                <div className="mb-2">
                  <label className="text-sm">Task Code</label>
                  <Input 
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Task code" />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
          <form.Field
            name="title"
            children={(field) => {
              return (
                <div className="mb-2">
                  <label className="text-sm">Title</label>
                  <Input 
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Title" />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
          <form.Field
            name="priority"
            children={(field) => {
              return (
                <div className="mb-2">
                  <label className="text-sm">Priority</label>
                  <Select 
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as "low" | "medium" | "high")}>
                    <SelectTrigger>
                      <span>{mappingPriority(field.state.value)}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
          <form.Field
            name="status"
            children={(field) => {
              return (
                <div className="mb-2">
                  <label className="text-sm">Status</label>
                  <Select 
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as "todo" | "in-progress" | "done")}>
                    <SelectTrigger>
                      <span>{mappingStatus(field.state.value)}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button className="mt-4" type="submit" disabled={!canSubmit}>
                {isSubmitting && <Loader className="animate-spin mr-2" />}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;