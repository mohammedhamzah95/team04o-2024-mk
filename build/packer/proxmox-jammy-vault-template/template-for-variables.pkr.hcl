//  variables.pkr.hcl

// For those variables that you don't provide a default for, you must
// set them from the command line, a var-file, or the environment.

# This is the name of the node in the Cloud Cluster where to deploy the virtual instances
variable "NODENAME" {
  type    = string
  default = "system41"
}

variable "USERNAME" {
  sensitive = true
  type   = string
  default = "aarreola1-pk@pve!aarreola1-itmt4302024"
}

variable "PROXMOX_TOKEN" {
  sensitive = true
  type   = string
  default = "b05e6e08-c515-41b8-bf5a-eda47d2b04c2"
}

variable "URL" {
  type = string
  # https://x.x.x.x:8006/api2/json
  default = "https://system41.rice.iit.edu:8006/api2/json"
  sensitive = true
}

variable "MEMORY" {
  type    = string
  default = "4192"
}

variable "DISKSIZE" {
  type    = string
  default = "25G"
}

variable "STORAGEPOOL" {
  type = string
  default = "datadisk1"
}

variable "NUMBEROFCORES" {
  type    = string
  default = "1"
}

# This is the name of the Virtual Machine Template you want to create
variable "VMNAME" {
  type    = string
  default = "team04o-frontend"
}

variable "SSHPW" {
  type    = string
  default = "vagrant"
  sensitive = true
}
