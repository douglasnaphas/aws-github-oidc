#!/usr/bin/env bash
set -e
npx cdk bootstrap;
npx cdk deploy --require-approval never;