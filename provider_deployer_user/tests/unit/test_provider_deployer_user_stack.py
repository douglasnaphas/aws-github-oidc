import aws_cdk as core
import aws_cdk.assertions as assertions

from provider_deployer_user.provider_deployer_user_stack import ProviderDeployerUserStack

# example tests. To run these tests, uncomment this file along with the example
# resource in provider_deployer_user/provider_deployer_user_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = ProviderDeployerUserStack(app, "provider-deployer-user")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
