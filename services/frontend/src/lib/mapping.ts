export const mappingPriority = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    default:
      return "Select priority"; 
  }
};

export const mappingStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "todo":
      return "Todo";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return "Select status"; 
  }
};