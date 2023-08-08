#!/usr/bin/env npx ts-node
import {
  IAMClient,
  ListOpenIDConnectProvidersCommand,
} from "@aws-sdk/client-iam";
import { containsGitHubProvider } from "./containsGitHubProvider";
(async () => {
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
  const client = new IAMClient({ region });
  const input = {};
  const command = new ListOpenIDConnectProvidersCommand(input);
  let response;
  try {
    response = await client.send(command);
  } catch (error: any) {
    if (error.Code === "ExpiredToken") {
      console.error(
        "expired token, try setting the variables AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN to valid credentials"
      );
      const EXPIRED_TOKEN = 2;
      process.exit(EXPIRED_TOKEN);
    }
    console.log("error listing OpenID Connect Providers");
    const ERROR_LISTING_PROVIDERS = 4;
    process.exit(ERROR_LISTING_PROVIDERS);
  }
  const BAD_RESPONSE = 3;
  if (!response) {
    process.exit(BAD_RESPONSE);
  }
  if (containsGitHubProvider(response)) {
    process.exit(0);
  }
  process.exit(1);
})();
