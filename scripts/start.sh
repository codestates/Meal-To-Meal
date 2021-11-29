#!/bin/bash
cd /home/ubuntu/Meal-To-Meal/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME_RDS=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME_RDS --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD_RDS=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD_RDS --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export HTTPS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names HTTPS_PORT --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js