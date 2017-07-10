# resource "aws_kinesis_stream" "replay_stream" {
#   name = "crowbar_replay_stream"
#   shard_count = 1
# }
#
# resource "aws_lambda_event_source_mapping" "kinesis_replay_lambda" {
#   event_source_arn = "${aws_kinesis_stream.replay_stream.arn}"
#   function_name = "${aws_lambda_function.crowbar_replay.arn}"
#   starting_position = "TRIM_HORIZON"
# }

data "archive_file" "lambda_replay" {
  type = "zip"
  source_dir = "./js/replay"
  output_path = "./build/lambda_replay.zip"
}

resource "aws_lambda_function" "crowbar_replay" {
  filename = "${data.archive_file.lambda_replay.output_path}"
  function_name = "crowbar_replay"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "index.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_replay.output_path}"))}"
  publish = true
  timeout = 300 # 5 mins
}
