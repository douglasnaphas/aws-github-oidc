#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ExampleAppStack } from '../lib/example_app-stack';
import { GitHubOidcRoleStack } from "../../GitHubOIDCRoleStack/lib";
import * as iam from 'aws-cdk-lib/aws-iam'

const app = new cdk.App();
if (!process.env.GITHUB_REF) {
  console.error("GITHUB_REF is not set, it should be something like refs/heads/main");
  process.exit(2);
}
if (!process.env.GITHUB_REPOSITORY) {
  console.error("GITHUB_REPOSITORY is not set, it should be something like douglasnaphas/aws-github-oidc");
  process.exit(3);
}
new GitHubOidcRoleStack(app, 'GitHubOidcRoleStack', {
  ref: process.env.GITHUB_REF,
  repository: process.env.GITHUB_REPOSITORY,
  managedPolicyList: [iam.ManagedPolicy.fromAwsManagedPolicyName("IAMReadOnlyAccess")],
  policyStatements: []

});
new ExampleAppStack(app, "ExampleAppStack");