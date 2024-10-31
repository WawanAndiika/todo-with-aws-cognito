import { Metadata } from "next";

import { UserNav } from "@/components/navigation/user-nav";
import DataTask from "./components/data";
import AddTaskDialog from "./components/add";

export const metadata: Metadata = {
  title: "Todo.app | Dashboard",
  description: "Manage your daily task here.",
};

export default function Dashboard() {
  return (
    <div className="md:flex h-full flex-1 flex-col space-y-8 p-8 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <div>
        <AddTaskDialog/>
      </div>
      <DataTask/>
    </div>
  );
}
