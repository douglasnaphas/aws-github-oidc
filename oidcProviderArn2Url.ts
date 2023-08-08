export const oidcProviderArn2Url = (oidcProviderArn: string) => {
  const OIDC_PROVIDER_ARN_PATTERN = /arn:aws:iam::[0-9]{12}:oidc-provider\//;
  if (!OIDC_PROVIDER_ARN_PATTERN.test(oidcProviderArn)) {
    throw Error("invalid OIDC Provider ARN");
  }
  return oidcProviderArn.split(OIDC_PROVIDER_ARN_PATTERN)[1];
};
