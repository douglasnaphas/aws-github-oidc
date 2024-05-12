// import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { Aws, Stack, StackProps } from "aws-cdk-lib";

export interface GitHubOidcRoleStackProps extends StackProps {
  repository: string;
  ref?: string;
  gitHubEnvironment?: string;
  managedPolicyList: iam.IManagedPolicy[];
  policyStatements: iam.PolicyStatement[];
  roleName?: string;
}

export class GitHubOidcRoleStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubOidcRoleStackProps) {
    super(scope, id);
    const {
      repository,
      ref,
      gitHubEnvironment,
      managedPolicyList,
      policyStatements,
      roleName,
    } = props;
    const providerArn = `arn:aws:iam::${Aws.ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com`;
    const subject = gitHubEnvironment
      ? `repo:${repository}:environment:${gitHubEnvironment}`
      : `repo:${repository}:ref:${ref}`;
    const role = new iam.Role(this, "Role", {
      roleName,
      assumedBy: new iam.WebIdentityPrincipal(providerArn, {
        StringLike: {
          ["token.actions.githubusercontent.com:sub"]: subject,
        },
        StringEquals: {
          ["token.actions.githubusercontent.com:aud"]: "sts.amazonaws.com",
        },
      }),
    });
    managedPolicyList.forEach((p) => {
      role.addManagedPolicy(p);
    });
    policyStatements.forEach((s) => {
      role.addToPolicy(s);
    });
  }
}
