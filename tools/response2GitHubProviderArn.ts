const ListOpenIDConnectProvidersResponse =
  require("@aws-sdk/client-iam").ListOpenIDConnectProvidersResponse;
const oidcProviderArn2Url = require("./oidcProviderArn2Url").oidcProviderArn2Url;
const response2GitHubProviderArn = (
  response: typeof ListOpenIDConnectProvidersResponse
) => {
  if (!response || !response.OpenIDConnectProviderList) {
    return null;
  }
  const NEEDLE = "token.actions.githubusercontent.com";
  const providers = response.OpenIDConnectProviderList;
  for (let p = 0; p < providers.length; p++) {
    try {
      if (oidcProviderArn2Url(providers[p].Arn || "") === NEEDLE) {
        return providers[p].Arn;
      }
    } catch (error) {}
  }
  return null;
};
module.exports = response2GitHubProviderArn;
