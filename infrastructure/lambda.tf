data "archive_file" "api_lambda" {
  type = "zip"
  source_dir = "./js"
  output_path = "./build/api-lambda.zip"
}

resource "aws_lambda_function" "crowbar_api_event_lambda" {
  filename = "${data.archive_file.api_lambda.output_path}"
  function_name = "crowbar_api_event"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "eventapi.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.api_lambda.output_path}"))}"
  publish = true
}

resource "aws_lambda_function" "crowbar_projections" {
  filename = "${data.archive_file.api_lambda.output_path}"
  function_name = "crowbar_projections"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "projections/index.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.api_lambda.output_path}"))}"
  publish = true
}
