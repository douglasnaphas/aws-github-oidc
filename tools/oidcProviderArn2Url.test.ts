import { oidcProviderArn2Url } from "./oidcProviderArn2Url";
describe("oidcProviderArn2Url", () => {
  describe("happy", () => {
    test.each([
      {
        oidcProviderArn:
          "arn:aws:iam::287213416300:oidc-provider/token.actions.githubusercontent.com",
        expected: "token.actions.githubusercontent.com",
      },
      {
        oidcProviderArn:
          "arn:aws:iam::687000416300:oidc-provider/elsewhere.com",
        expected: "elsewhere.com",
      },
      {
        oidcProviderArn: "arn:aws:iam::444413416300:oidc-provider/",
        expected: "",
      },
    ])("$oidcProviderArn -> $expected", ({ oidcProviderArn, expected }) => {
      expect(oidcProviderArn2Url(oidcProviderArn)).toEqual(expected);
    });
  });
  describe("error", () => {
    test.each([
      {
        oidcProviderArn: "not-even-an-arn",
      },
      {
        oidcProviderArn:
          "arn:aws:iam::444413416300:more-subtly-wrong/oidc-provider",
      },
    ])("$oidcProviderArn", ({ oidcProviderArn }) => {
      expect(() => {
        oidcProviderArn2Url(oidcProviderArn);
      }).toThrow();
    });
  });
});
