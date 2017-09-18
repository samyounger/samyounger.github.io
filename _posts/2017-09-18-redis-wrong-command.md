---
title: Redis CommandError
date: 2017-09-18
categories: [ redis, rails ]
published: true
---

    DESCRIPTION: When running starting up a rails application that has redis, a redis error appears. This is the fix.

## The Error

```sh
$ Redis::CommandError: WRONGTYPE Operation against a key holding the wrong kind of value
```

## The Fix

```sh
$ redis-cli
$ flushall
```

## Summary

I do not know what causes this error, or why this terminal command fixes it. However it is a regularly occurring error in the application that requires this command to make it go away.
