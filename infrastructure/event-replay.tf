data "archive_file" "lambda_replay_producer" {
  type = "zip"
  source_dir = "./js/replay"
  output_path = "./build/lambda_replay.zip"
}

resource "aws_lambda_function" "crowbar_replay_producer" {
  filename = "${data.archive_file.lambda_replay_producer.output_path}"
  function_name = "crowbar_replay_producer"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "index.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_replay_producer.output_path}"))}"
  publish = true
  timeout = 300 # 5 mins
}

data "archive_file" "lambda_replay_consumer" {
  type = "zip"
  source_dir = "./js/projection"
  output_path = "./build/lambda_projection.zip"
}

resource "aws_lambda_function" "crowbar_replay_consumer" {
  filename = "${data.archive_file.lambda_replay_consumer.output_path}"
  function_name = "crowbar_replay_consumer"
  role = "${aws_iam_role.crowbar_lambda_role.arn}"
  handler = "replay.handler"
  runtime = "nodejs6.10"
  source_code_hash = "${base64sha256(file("${data.archive_file.lambda_replay_consumer.output_path}"))}"
  publish = true
  timeout = 300 # 5 mins
}

resource "aws_kinesis_stream" "replay_stream" {
  name = "crowbar_replay_stream"
  shard_count = 1
}

resource "aws_lambda_event_source_mapping" "kinesis_replay_lambda" {
  event_source_arn = "${aws_kinesis_stream.replay_stream.arn}"
  function_name = "${aws_lambda_function.crowbar_replay_consumer.arn}"
  starting_position = "TRIM_HORIZON"
}
