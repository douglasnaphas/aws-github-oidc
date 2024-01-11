from aws_cdk import (
    Aws,
    # Duration,
    Stack,
    # aws_sqs as sqs,
    aws_iam as iam
)
from constructs import Construct

class ProviderDeployerUserStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        user = iam.User(self, "ProviderDeployerUser")
        for p in [
            "AWSCloudFormationFullAccess"
        ]:
            user.add_managed_policy(iam.ManagedPolicy.from_aws_managed_policy_name(p))
        user.add_to_policy(iam.PolicyStatement(
            sid = "GrantAllOnGitHubOIDCProviders",
            resources = [
                "arn:aws:iam::*:oidc-provider/token.actions.githubusercontent.com"
            ],
            actions = [
                "iam:AddClientIDToOpenIDConnectProvider",
                "iam:CreateOpenIDConnectProvider",
                "iam:DeleteOpenIDConnectProvider",
                "iam:GetOpenIDConnectProvider",
                "iam:RemoveClientIDFromOpenIDConnectProvider",
                "iam:TagOpenIDConnectProvider",
                "iam:TagOpenIDConnectProvider",
                "iam:UpdateOpenIDConnectProviderThumbprint"
            ]
        ))
        user.add_to_policy(iam.PolicyStatement(
            sid = "GetParamsForCDK",
            resources = [
                "*"
            ],
            actions = [
                "ssm:GetParameter*"
            ]
        ))
        user.add_to_policy(iam.PolicyStatement(
            sid = "AssumeCDKRoles",
            resources = [
                "arn:aws:iam::" + Aws.ACCOUNT_ID + ":role/cdk*"
            ],
            actions = [
                "sts:AssumeRole"
            ]
        ))
