import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface ExampleAppStackProps extends cdk.StackProps{
}
export class ExampleAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);
    

  }
}
