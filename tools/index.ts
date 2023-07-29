#!/usr/bin/env npx ts-node
import {
  IAMClient,
  ListOpenIDConnectProvidersCommand,
} from "@aws-sdk/client-iam";
(async () => {
  console.log("running...");
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
  const client = new IAMClient({ region });
  const input = {};
  const command = new ListOpenIDConnectProvidersCommand(input);
  const response = await client.send(command);
  console.log(response);
})();
