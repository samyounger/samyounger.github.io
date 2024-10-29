---
title: Migrate an AWS lightsail wordpress site to another account
date: 2023-03-11
categories: [aws, lightsail, wordpress]
published: false
---

    DESCRIPTION: How to migrate an aws lightsail wordpress website from one aws account to another.

## Background

I am a relative beginner to aws, and wordpress, and lightsail. So when I offered up my services as a software engineer to the local community council to build a website for them, for a budget of less than £50 a year, I thought this would not be possible on wordpress.

## Creating the lightsail instance

## How to login to the website admin

How to login to the aws instance initially: https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-quick-start-guide-wordpress

## Setting up HTTPS

https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-enabling-https-on-wordpress

Problem: If the routing resolves to the IPv6 address, then bitnami certificate tool fails. These need to be temporarily deleted.

- https://stackoverflow.com/a/75168104

Create a static IP address

- prevents having a new IP address after restarts.

## Migrating the website

https://rajivverma.me/blog/tech/aws-ec2-to-lightsail/

### Wordpress upload limit

Problem; the upload limit on the wordpress site was defaulted to 80MB. Following these instructions fixed that problem.

- https://aws.amazon.com/premiumsupport/knowledge-center/lightsail-bitnami-wordpress-upload-limit/

Its quite a large file, to look for the lines to change, you can use Vim search with:

```sh
$ /\<post_max_size\>
$ /\<upload_max_filesize\>
```

Note: Make sure to revert these settings after.

### Transferring the domain

https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-transfer-between-aws-accounts.html

### Create a new DNS Zone (lightsail)

Update the hostedzone records in lightsail.
