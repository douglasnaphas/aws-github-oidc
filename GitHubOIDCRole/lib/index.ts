// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Aws } from 'aws-cdk-lib';

export interface GitHubOidcRoleProps {
  repository: string;
  ref: string;
  managedPolicyList: iam.IManagedPolicy[];
  policyStatements: iam.PolicyStatement[];
  roleName?: string;
}

export class GitHubOidcRole extends Construct {

  constructor(scope: Construct, id: string, props: GitHubOidcRoleProps) {
    super(scope, id);
    const { repository, ref, managedPolicyList, policyStatements, roleName } = props;
    const providerArn = `arn:aws:iam::${Aws.ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com`
    const subject = `repo:${repository}:ref:${ref}`;
    const role = new iam.Role(this, 'Role', {
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
    managedPolicyList.forEach(p => {
      role.addManagedPolicy(p)
    });
    policyStatements.forEach(s => {
      role.addToPolicy(s)
    })
  }
}
