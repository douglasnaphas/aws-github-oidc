// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface GitHubOidcRoleProps {
  // Define construct properties here
}

export class GitHubOidcRole extends Construct {

  constructor(scope: Construct, id: string, props: GitHubOidcRoleProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'GitHubOidcRoleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
