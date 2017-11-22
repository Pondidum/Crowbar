resource "aws_dynamodb_table" "event_store" {
  name = "CrowbarEvents"
  write_capacity = 5
  read_capacity = 20

  hash_key = "eventId"
  range_key = "timestamp"

  attribute {
    name = "eventId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }
}
