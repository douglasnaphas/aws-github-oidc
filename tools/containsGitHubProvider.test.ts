import { ListOpenIDConnectProvidersResponse } from "@aws-sdk/client-iam";
import { containsGitHubProvider } from "./containsGitHubProvider";
describe("containsGitHubProvider", () => {
  describe("happy", () => {
    test.each([
      {
        response: {
          OpenIDConnectProviderList: [
            {
              Arn: "arn:aws:iam::287213416300:oidc-provider/token.actions.githubusercontent.com",
            },
          ],
        },
        expected: true,
      },
    ])("$response -> $expected", ({ response, expected }) => {
      expect(containsGitHubProvider(response)).toEqual(expected);
    });
  });
});
