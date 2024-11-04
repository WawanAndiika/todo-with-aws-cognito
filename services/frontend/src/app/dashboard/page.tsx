import { Metadata } from "next";

import DataTask from "./components/data";
import AddTaskDialog from "./components/add";

export const metadata: Metadata = {
  title: "Todo.app | Dashboard",
  description: "Manage your daily task here.",
};

export default function Dashboard() {
  return (
    <>
      <div>
        <AddTaskDialog/>
      </div>
      <DataTask/>
    </>
  );
}
