// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface GitHubOidcRoleStackProps {
  // Define construct properties here
}

export class GitHubOidcRoleStack extends Construct {

  constructor(scope: Construct, id: string, props: GitHubOidcRoleStackProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'GitHubOidcRoleStackQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
