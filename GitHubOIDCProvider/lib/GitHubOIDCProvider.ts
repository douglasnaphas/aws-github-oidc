import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CfnOIDCProvider } from "aws-cdk-lib/aws-iam";

export class GitHubOIDCProviderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const gitHubOIDCProvider = new CfnOIDCProvider(this, "GitHubOIDCProvider", {
      url: "https://token.actions.githubusercontent.com",
      thumbprintList: ["abcdef0123456890abcdef01234567890abcdef0"],
      clientIdList: ["sts.amazonaws.com"],
    });
  }
}
