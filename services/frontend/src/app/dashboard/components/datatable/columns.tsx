"use client"

import { Button } from "@/components/ui/button"
import { mappingPriority, mappingStatus } from "@/lib/mapping"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Todo = {
  id: string
  code: string
  title: string
  priority: string
  status: string
}

interface ColumnsProps {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void
}

export const columns = ({ handleDelete, handleEdit }: ColumnsProps): ColumnDef<Todo>[] => [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({row}) => {
      return mappingPriority(row.original.priority)
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      return mappingStatus(row.original.status)
    }
  },
  {
    id: "actions",
    cell: ({ row }) => { 
      const todo = row.original;
      return (  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(todo.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(todo.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
