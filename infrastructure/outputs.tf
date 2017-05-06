output "event_api_url" {
  value = "https://${aws_api_gateway_deployment.prod.rest_api_id}.execute-api.${var.region}.amazonaws.com/${aws_api_gateway_deployment.prod.stage_name}/"
}
