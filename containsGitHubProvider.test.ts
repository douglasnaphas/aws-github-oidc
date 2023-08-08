import { ListOpenIDConnectProvidersResponse } from "@aws-sdk/client-iam";
import { containsGitHubProvider } from "./containsGitHubProvider";
describe("containsGitHubProvider", () => {
  describe("happy", () => {
    test.each([
      {
        description: "one good",
        response: {
          OpenIDConnectProviderList: [
            {
              Arn: "arn:aws:iam::287213416300:oidc-provider/token.actions.githubusercontent.com",
            },
          ],
        },
        expected: true,
      },
      {
        description: "empty response",
        response: {},
        expected: false,
      },
      {
        description: "one wrong subdomain, one good",
        response: {
          OpenIDConnectProviderList: [
            {
              Arn: "arn:aws:iam::287213416300:oidc-provider/wrong.subdomain.githubusercontent.com",
            },
            {
              Arn: "arn:aws:iam::111113416300:oidc-provider/token.actions.githubusercontent.com",
            },
          ],
        },
        expected: true,
      },
      {
        description: "one wrong subdomain, one bad arn",
        response: {
          OpenIDConnectProviderList: [
            {
              Arn: "arn:aws:iam::000013416300:oidc-provider/wrong.subdomain.githubusercontent.com",
            },
            {
              Arn: "bad:aws:iam::511113416300:oidc-provider/token.actions.githubusercontent.com",
            },
          ],
        },
        expected: false,
      },
    ])("$description", ({ response, expected }) => {
      expect(containsGitHubProvider(response)).toEqual(expected);
    });
  });
});
