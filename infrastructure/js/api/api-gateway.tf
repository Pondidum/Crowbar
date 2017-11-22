resource "aws_lambda_permission" "allow_api_gateway" {
  function_name = "${aws_lambda_function.crowbar_api_event_lambda.arn}"
  statement_id = "AllowExecutionFromApiGateway"
  action = "lambda:InvokeFunction"
  principal = "apigateway.amazonaws.com"
  source_arn = "arn:aws:execute-api:${var.region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.crowbar_event_api.id}/*/${aws_api_gateway_method.events_post.http_method}${aws_api_gateway_resource.events.path}"
}

resource "aws_api_gateway_rest_api" "crowbar_event_api" {
  name = "Crowbar Event Api"
  description = "Http api for consuming Crowbar events"
}

resource "aws_api_gateway_resource" "events" {
  rest_api_id = "${aws_api_gateway_rest_api.crowbar_event_api.id}"
  parent_id = "${aws_api_gateway_rest_api.crowbar_event_api.root_resource_id}"
  path_part = "events"
}

resource "aws_api_gateway_method" "events_post" {
  rest_api_id = "${aws_api_gateway_rest_api.crowbar_event_api.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "POST"
  authorization = "NONE" # have to manually configure this to cognito, as terraform doesnt support it yet
}

resource "aws_api_gateway_integration" "events_post_lamdba" {
  rest_api_id = "${aws_api_gateway_rest_api.crowbar_event_api.id}"
  resource_id = "${aws_api_gateway_resource.events.id}"
  http_method = "${aws_api_gateway_method.events_post.http_method}"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.region}:${data.aws_caller_identity.current.account_id}:function:${aws_lambda_function.crowbar_api_event_lambda.function_name}/invocations"
  integration_http_method = "POST"
}

resource "aws_api_gateway_deployment" "prod" {
  depends_on = [
    "aws_api_gateway_method.events_post",
    "aws_api_gateway_integration.events_post_lamdba"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.crowbar_event_api.id}"
  stage_name = "api"
}
