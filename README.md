# AWS GitHub OIDC

An OpenID Connect (OIDC) Provider for GitHub. The Provider is a resource you need in your AWS account to establish authentication between GitHub Actions and AWS, so that you can deploy resources to AWS from GitHub Actions without saving long-lived credentials in your GitHub Actions Secrets. AWS and GitHub have an [integration](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) that enables this.

## How to use this
There are probably multiple ways to set up OIDC authentication between GitHub and AWS.

My preferred way is to use this repo to (1) deploy one OIDC provider per AWS account, (2) deploy roles using GitHubOIDCRoleStack, and (3) use [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) with the deployed role as the `role-to-assume`.

(1) and (2) are done from the command line on your computer, not from GitHub Actions and not through automation. They are the initial one-off steps that you do to get up and running with automated deployments. They take the place of one-off steps like creating a user and saving its AWS access key ID and AWS secret access key in GitHub Actions Secrets that prevailed before the AWS GitHub OIDC integration.

### (1) Deploy one OIDC provider per AWS account
You can only have one [OIDC provider](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-oidcprovider.html) resource for a given provider per AWS account.

You can't deploy your GitHub OIDC provider using OIDC, because that requires a provider. And you shouldn't deploy it using GitHub Actions with an AWS secret access key, because we want to eliminate all uses of saved long-lived AWS credentials.

So deploying your GitHub OIDC provider from your local CLI becomes part of the minimal set of initial non-automated steps you take near the outset of a project.

You can do it as follows.

#### Steps
Clone this repo, change to its directory, authenticate to AWS in your shell, and run `npx pnpm cdk-deploy`.
```
git clone https://github.com/douglasnaphas/aws-github-oidc
```

```
cd aws-github-oidc
```

```
aws --profile $MY_PREFERRED_AWS_PROFILE sso login 
```

This is using [single sign-on](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html) with the AWS CLI.

```
npx pnpm cdk-deploy
```

### (2) Deploy roles
#### Steps
In your repo, add one or more stacks called something like `GitHubRole`.

I use `GitHubOIDCRoleStack` once with `ref` set to my main branch name, often `main`, and once with `ref` set to `*`.

Save each role name, once deployed, to GitHub Actions variables as something like `PROD_ROLE` for the former and `DEV_ROLE` for the latter.

### (3) Use `configure-aws-credentials`
With `PROD_ROLE` and `DEV_ROLE` set as described above, GitHub Actions steps wanting to deploy to the prod, test, or other accounts deployed from the main branch will have to be preceded by a `configure-aws-credentials` step with `role-to-assume` set to `PROD_ROLE`. Those deploying from other branches should be preceded by a `configure-aws-credentials` step with `role-to-assume` set to `DEV_ROLE`.
