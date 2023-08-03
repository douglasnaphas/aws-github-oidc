import { App, CfnOutput, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {aws_iam as iam } from "aws-cdk-lib";
import { GithubActionsIdentityProvider } from "aws-cdk-github-oidc";

export class OidcStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);
    const provider = new GithubActionsIdentityProvider(this, "GithubProvider");
    new CfnOutput(this, "GitHubProviderArn", {
      value: provider.openIdConnectProviderArn,
    });
  }
}
