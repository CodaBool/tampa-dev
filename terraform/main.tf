provider "aws" {
  region = "us-east-1"
}

# Store state in a S3 bucket
terraform {
  backend "s3" {
    bucket = "codabool-tf-state"
    key    = "tampadev/demo-1/terraform.tfstate" # bucket dir
    region = "us-east-1"
  }
  required_version = "~> 1.1.0" # allows patches
}

# Public key
resource "aws_key_pair" "pub_key" {
  key_name   = "pub_key"
  public_key = file("key.pub")
}

# instance remote-exec
resource "aws_instance" "al2" {
  ami           = var.al2_ami
  instance_type = "t2.micro"
  key_name      = aws_key_pair.pub_key.key_name
  vpc_security_group_ids = [aws_security_group.tampadev.id]
  tags = {
    Name = "al2"
  }
}

# Default Network Resources
# Works different than normal resources
# adopts the default vpc for tf to reference
# will not create/destroy despite what the cli suggests
resource "aws_default_vpc" "default" {}

resource "aws_security_group" "tampadev" {
  name        = "tampadev"
  description = "Allow SSH & HTTP traffic"
  vpc_id      = aws_default_vpc.default.id
  ingress {
    from_port        = 22
    to_port          = 22
    protocol         = "TCP"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  ingress {
    from_port        = 80
    to_port          = 80
    protocol         = "TCP"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  tags = {
    Name = "tampadev"
  }
}