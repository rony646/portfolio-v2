// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "portfolio-v2",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const isProduction = $app.stage === "production";
    const openAiApikey = new sst.Secret("OpenAiApiKey");
    const transactionalEmail = new sst.aws.Email("TransactionalEmail", {
      sender: "no-reply@ronydev.com",
    });

    new sst.aws.Nextjs("MyWeb", {
      link: [openAiApikey, transactionalEmail],
      domain: isProduction
        ? {
            name: "ronydev.com",
            redirects: ["www.ronydev.com"],
          }
        : {
            name: `${$app.stage}.ronydev.com`,
          },
      environment: {
        NEXT_PUBLIC_SITE_URL: "https://ronydev.com",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
      },
    });
  },
});
