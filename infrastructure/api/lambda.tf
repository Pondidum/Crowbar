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
  runtime = "nodejs4.3"
  source_code_hash = "${base64sha256(file("${data.archive_file.api_lambda.output_path}"))}"
  publish = true
}
