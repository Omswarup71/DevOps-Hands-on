resource "docker_volume" "app_data" {
  name = "${var.app_name}_data"
}

