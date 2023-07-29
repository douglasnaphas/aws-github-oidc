import { oidcProviderArn2Url } from "./oidcProviderArn2Url";
describe("oidcProviderArn2Url", () => {
  test.each([
    {
      oidcProviderArn:
        "arn:aws:iam::287213416300:oidc-provider/token.actions.githubusercontent.com",
      expected: "token.actions.githubusercontent.com",
    },
    {
      oidcProviderArn:
        "arn:aws:iam::287213416300:oidc-provider/elsewhere.com",
      expected: "elsewhere.com",
    },
  ])("$oidcProviderArn -> $expected", ({ oidcProviderArn, expected }) => {
    expect(oidcProviderArn2Url(oidcProviderArn)).toEqual(expected);
  });
});
