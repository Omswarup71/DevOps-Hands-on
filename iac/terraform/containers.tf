resource "docker_image" "app" {
  name = "${var.app_name}:${var.image_tag}"

  build {
    context = "../.."
  }
}

resource "docker_container" "app" {
  name  = "${var.app_name}_app"
  image = docker_image.app.image_id

 ports {
  internal = 4173
  external = 81
}
  networks_advanced {
    name = docker_network.app_net.name
  }

  volumes {
    volume_name    = docker_volume.app_data.name
    container_path = "/data"
  }

  restart = "always"
}

