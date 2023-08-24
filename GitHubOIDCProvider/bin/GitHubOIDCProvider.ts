#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GitHubOIDCProviderStack } from "../lib/oidc-cfn-no-prints-stack";

const app = new cdk.App();
new GitHubOIDCProviderStack(app, "GitHubOIDCProviderStack", {});
