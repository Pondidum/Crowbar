data "template_file" "s3_role_policy" {
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
  policy = "${data.template_file.s3_role_policy.rendered}"
}
