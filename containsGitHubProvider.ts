import { ListOpenIDConnectProvidersResponse } from "@aws-sdk/client-iam";
import { oidcProviderArn2Url } from "./oidcProviderArn2Url";
export const containsGitHubProvider = (
  response: ListOpenIDConnectProvidersResponse
) => {
  if (!response || !response.OpenIDConnectProviderList) {
    return false;
  }
  const NEEDLE = "token.actions.githubusercontent.com";
  const providers = response.OpenIDConnectProviderList;
  for (let p = 0; p < providers.length; p++) {
    try {
      if (oidcProviderArn2Url(providers[p].Arn || "") === NEEDLE) {
        return true;
      }
    } catch (error) {}
  }
  return false;
};
