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
