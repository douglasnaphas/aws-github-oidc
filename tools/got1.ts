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
      const ARBITRARY_NONZERO_STATUS = 2;
      process.exit(ARBITRARY_NONZERO_STATUS);
    }
  }
  const BAD_RESPONSE_EXIT_STATUS = 3;
  if (!response) {
    process.exit(BAD_RESPONSE_EXIT_STATUS);
  }
  if (containsGitHubProvider(response)) {
    process.exit(0);
  }
  process.exit(1);
})();
