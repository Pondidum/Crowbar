data "archive_file" "lambda_api" {
  type = "zip"
  source_dir = "./src"
  output_path = "./build/lambda_api.zip"
}

data "template_file" "api_lambda_policy" {
  template = "${file("policies/api-lambda-role-policy.json")}"
  vars {
    bucket_name = "${var.bucket_name}"
  }
}

resource "aws_iam_role" "crowbar_lambda_role" {
  name = "crowbar_lambda_role"
  assume_role_policy = "${file("policies/api-lambda-role.json")}"
}

resource "aws_iam_role_policy" "crowbar_lambda_role_policy" {
  name = "crowbar_lambda_role_policy"
  role = "${aws_iam_role.crowbar_lambda_role.id}"
  policy = "${data.template_file.api_lambda_policy.rendered}"
}

resource "aws_lambda_function" "crowbar_api_event_lambda" {
  filename = "${data.archive_file.lambda_api.output_path}"
  function_name = "crowbar_api_event"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "eventapi.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_api.output_path}"))}"
  publish = true
}

resource "aws_lambda_function" "crowbar_cognito_post_confirmation" {
  filename = "${data.archive_file.lambda_api.output_path}"
  function_name = "crowbar_cognito_post_confirmation"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "cognito.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_api.output_path}"))}"
  publish = true
}
