data "archive_file" "lambda_projection" {
  type = "zip"
  source_dir = "./js/projection"
  output_path = "./build/lambda_projection.zip"
}

resource "aws_lambda_function" "crowbar_projections" {
  filename = "${data.archive_file.lambda_projection.output_path}"
  function_name = "crowbar_projections"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "index.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_projection.output_path}"))}"
  publish = true
}

resource "aws_s3_bucket" "storage" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
}
