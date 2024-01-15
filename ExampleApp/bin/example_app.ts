#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ExampleAppStack } from '../lib/example_app-stack';
import { GitHubOidcRoleStack } from "../../GitHubOIDCRoleStack/lib";
import * as iam from 'aws-cdk-lib/aws-iam';
const stackname = require("@cdk-turnkey/stackname");

const app = new cdk.App();
if (!process.env.GITHUB_REF) {
  console.error("GITHUB_REF is not set, it should be something like refs/heads/main");
  process.exit(2);
}
if (!process.env.GITHUB_REPOSITORY) {
  console.error("GITHUB_REPOSITORY is not set, it should be something like douglasnaphas/aws-github-oidc");
  process.exit(3);
}
const repository = process.env.GITHUB_REPOSITORY;
const ref = process.env.GITHUB_REF;
const STACKNAME_HASH_LENGTH = 6;
new GitHubOidcRoleStack(app, 'GitHubOidcRoleStack', {
  ref,
  repository,
  managedPolicyList: [iam.ManagedPolicy.fromAwsManagedPolicyName("IAMReadOnlyAccess")],
  policyStatements: [],
  roleName: stackname("github-oidc", { hash: STACKNAME_HASH_LENGTH })
});
new ExampleAppStack(app, "ExampleAppStack");