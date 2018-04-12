---
title: Generate a random hex
date: 2017-08-07
categories: [ ruby, hex, random ]
published: true
---

    DESCRIPTION: a brief note on how to generate a random hex.

<a class="main-link" href="https://ruby-doc.org/stdlib-2.4.0/libdoc/securerandom/rdoc/SecureRandom.html">Documentation</a>

## Method

I have occasionally wanted to create a random security hex, when not using built-in rails methods. I wrote the following method to generate a 12 digit random hex, which was written to generate a random UUID for a FactoryGirl / RSpec test.

```rb
def gen_random_uuid
  12.times.map { |char| [ ("a".."z").to_a[rand(26)], rand(10) ][rand(2)]}.join(",").gsub(",","")
end
```

I have never used the rails method before, but I understand it does essentially the same thing:

```rb
def gen_random_uuid
  SecureRandom.hex(12)
end
```

This generates a random 12 digit string.

Other methods with SecureRandom:

```rb
[ SecureRandom.hex, SecureRandom.base64, SecureRandom.random_bytes, SecureRandom.uuid ]
```

To use outside of rails put the following at the top of the ruby file:

```rb
require 'securerandom'
```
