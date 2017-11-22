data "template_file" "admin_lambda_policy" {
  template = "${file("policies/admin-lambda-role-policy.json")}"
  vars {
    bucket_name = "${var.bucket_name}"
  }
}

resource "aws_iam_role" "crowbar_admin_lambda_role" {
  name = "crowbar_admin_lambda_role"
  assume_role_policy = "${file("policies/admin-lambda-role.json")}"
}

resource "aws_iam_role_policy" "crowbar_admin_lambda_role_policy" {
  name = "crowbar_admin_lambda_role_policy"
  role = "${aws_iam_role.crowbar_admin_lambda_role.id}"
  policy = "${data.template_file.admin_lambda_policy.rendered}"
}

data "archive_file" "lambda_admin" {
  type = "zip"
  source_dir = "./src"
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
