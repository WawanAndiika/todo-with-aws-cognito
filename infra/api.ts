export const api = new sst.cloudflare.Worker("Api", {
  url: true,
  handler: "services/api/src/index.ts",
});