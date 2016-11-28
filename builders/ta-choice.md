# TA choice: Basic MySQL Database to AWS
When I learned about databases in INFO 101, I was excited by them, but unsure how to get my own running. In this TA Choice activity, I will show you how to get your very own database up and running on AWS (free tier).

## Steps
#### 1) create an AWS account and apply for AWS educate [here](https://www.awseducate.com/Application) with your UW email
#### 2) navigate to the AWS RDS service [here](https://console.aws.amazon.com/rds/home)
#### 3) launch a DB instance
  - choose MySQL
  - choose dev/test MySQL
  - Specify DB Details
  - "DB Instance Class" to be "db.t2.micro"
    - "DB Instance Identifier" to be "bump-db"
    - "Master Username" to be "corey"
    - "Master Password" to be BobBoiko
  - Click "Launch DB Instance"

#### 4) Get the endpoint URL and Port for your shiny new database
  - Navigate to AWS RDS service
  - Click "instances" on left navigation
  - Click the drop down arrow for your "bump-db" instance
  - Copy the endpoint URL from the "Endpoint" section in your bump-db instance Details

#### 5) Interface with your database!
  - Open up MySQL Workbench (installed on lab machines)
  - create a new connection to your database
    - paste in your endpoint URL and port (delete the 3306 port off the end of the URL, place in port field)
    - username: corey
    - password: BobBoiko