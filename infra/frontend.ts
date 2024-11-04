import { api } from "./api";

export const frontend = new sst.aws.Nextjs("Frontend", {
    path: "services/frontend/",
    link: [api]
});