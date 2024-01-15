import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as github_oidc_role from '../../GitHubOIDCRole/lib';
import * as iam from 'aws-cdk-lib/aws-iam'

export interface GitHubOIDCRoleStackProps extends cdk.StackProps {
  repository: string;
  ref: string;
}
export class GitHubOIDCRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GitHubOIDCRoleStackProps) {
    super(scope, id, props);
    const { repository, ref } = props;
    const role = new github_oidc_role.GitHubOidcRole(this, "ExampleAppRole", {
      managedPolicyList: [iam.ManagedPolicy.fromAwsManagedPolicyName("IAMReadOnlyAccess")],
      policyStatements: [],
      ref,
      repository
    })
  }
}
