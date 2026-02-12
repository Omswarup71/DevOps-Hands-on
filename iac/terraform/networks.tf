resource "docker_network" "app_net" {
  name = "${var.app_name}_net"
}

