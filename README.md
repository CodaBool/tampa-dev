# 🏴‍☠️ Hello TampaDevs!
This is repo is part of a tech talk

### 🚧 More info here later
📎CodaBool.com

🐦 @Coda_Bool

____________________________________

# Presentation Notes
> HINT: did you make sure to put the private key file `key` in the terraform folder

### Commands
`terraform init`

`terraform plan`

`terraform apply -auto-approve` (30s)

`HOST_IP=$(terraform output -raw public_ip)`

`echo $HOST_IP`

`ssh ec2-user@$HOST_IP -i key`

`sudo amazon-linux-extras install nginx1 -y`

`sudo systemctl start nginx`

`sudo vi /usr/share/nginx/html/index.html`

`terraform destroy -auto-approve` (20s)

do an empty commit (5m)

explain yaml and the security concerns of using free runners

https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses
