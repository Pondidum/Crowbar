variable "bucket_name" {
  default = "crowbar-store"
}

resource "aws_s3_bucket" "storage" {
  bucket = "${var.bucket_name}"
  acl = "private"
}

resource "aws_s3_bucket_object" "projections" {
  bucket = "${aws_s3_bucket.storage.bucket}"
  key = "events/projections.json"
  source = "js/projections.json"
}
