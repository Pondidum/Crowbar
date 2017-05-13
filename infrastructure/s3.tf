resource "aws_s3_bucket" "storage" {
  bucket = "${var.bucket_name}"
  acl = "public-read"
}

resource "aws_s3_bucket_object" "projections" {
  bucket = "${aws_s3_bucket.storage.bucket}"
  key = "events/aggregates.json"
  source = "js/aggregates.json"
}
