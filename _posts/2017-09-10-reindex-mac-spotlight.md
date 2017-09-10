---
title: Reindex Mac Spotlight
date: 2017-08-07
categories: [ mac, terminal, spotlight ]
published: true
---

    DESCRIPTION: Sometimes the mac spotlight search doesn't discover applications when the update. The mac solution to fix this by adding the directory to the privacy tab in system preferences, and then removing it no longer works.

## Fix

I found that by typing this into your terminal, it will reindex your entire computer.

```sh
$ sudo mdutil -E /
```

This fix was found on a blog by Rob Lefebvre [HERE](https://www.cultofmac.com/154458/re-index-spotlight-from-the-terminal-re-gain-valuable-time-for-life-os-x-tips/)
