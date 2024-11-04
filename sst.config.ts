/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "sst-orchestra",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
      providers: { aws: "6.57.0" },
    };
  },
  async run() {
    const api = await import("./infra/api");
    const frontend = await import("./infra/frontend");
    return {
      api: api.api.url,
      frontend: frontend,
    };
  },
});
