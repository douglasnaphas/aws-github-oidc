import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  GithubActionsIdentityProvider,
} from "aws-cdk-github-oidc";

export class OidcStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);
    const provider = new GithubActionsIdentityProvider(this, "GithubProvider");
    new cdk.CfnOutput(this, "GitHubProviderArn", {
      value: provider.openIdConnectProviderArn
    })
  }
}
