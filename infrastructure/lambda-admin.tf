data "archive_file" "lambda_admin" {
  type = "zip"
  source_dir = "./js/admin"
  output_path = "./build/lambda_admin.zip"
}

resource "aws_lambda_function" "crowbar_admin_clear_views" {
  filename = "${data.archive_file.lambda_admin.output_path}"
  function_name = "crowbar_admin_clear_views"
  role = "${aws_iam_role.crowbar_admin_lambda_role.arn}"
  handler = "index.clearViews"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_admin.output_path}"))}"
  publish = true
  timeout = 10
}

resource "aws_lambda_function" "crowbar_admin_clear_events" {
  filename = "${data.archive_file.lambda_admin.output_path}"
  function_name = "crowbar_admin_clear_events"
  role = "${aws_iam_role.crowbar_admin_lambda_role.arn}"
  handler = "index.clearEvents"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_admin.output_path}"))}"
  publish = true
  timeout = 10
}
