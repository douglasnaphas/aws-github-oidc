const response2GitHubProviderArn = require("./response2GitHubProviderArn");
describe("response2GitHubProviderArn", () => {
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
        expected:
          "arn:aws:iam::287213416300:oidc-provider/token.actions.githubusercontent.com",
      },
      {
        description: "empty response",
        response: {},
        expected: null,
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
        expected:
          "arn:aws:iam::111113416300:oidc-provider/token.actions.githubusercontent.com",
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
        expected: null,
      },
    ])("$description", ({ response, expected }) => {
      expect(response2GitHubProviderArn(response)).toEqual(expected);
    });
  });
});
export {};
