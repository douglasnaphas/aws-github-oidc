#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { OidcStack } from "../lib/oidc-stack";

const app = new cdk.App();
// figure out if there is already an OIDC provider in this account
new OidcStack(app, "GitHubOIDCProvider");
