---
title: Hash with Indifferent Access
date: 2017-08-07
categories: [ rails, ruby, hash, symbol, hash_rocket ]
published: true
---

    DESCRIPTION: Rails has a core active-support extension called 'HashWithIndifferentAccess'. This means that whatever you put in to the hash keys; string or symbol, it is put in as a string with hash rocket.

[Documentation](http://api.rubyonrails.org/classes/ActiveSupport/HashWithIndifferentAccess.html)

## Why

A ruby hash key can be written in two different ways:

```rb
hash = {
  sam: "younger"
  "sam" => "younger"
}
```

This can get unnecessarily complicated when sending pushing data to a hash:

```rb
hash[:new] = "user"
hash["new"] = "user"
```

You would need to know the format to write to the hash. Using the with_indifferent_access extension, you do not need to know which key type is required.

## How it works

The extension converts any new key into a string.

```rb
rgb = ActiveSupport::HashWithIndifferentAccess.new

# symbol
rgb[:black] = '#000000'
rgb[:black]  # => '#000000'
rgb['black'] # => '#000000'

#string
rgb['white'] = '#FFFFFF'
rgb[:white]  # => '#FFFFFF'
rgb['white'] # => '#FFFFFF'
```

## How to use

### Rails

It can be used in two main ways. If in Rails, then it is included within core Rails.

```rb
#creating a new hash
hash = ActiveSupport::HashWithIndifferentAccess.new(a: 1)

# or
hash = {
  a: 1
}.with_indiferent_access
```

### Outside of Rails

It can be added to any non-rails ruby program with the following at the top of a file.

```rb
require "active_support/core_ext/hash/indifferent_access"
```
