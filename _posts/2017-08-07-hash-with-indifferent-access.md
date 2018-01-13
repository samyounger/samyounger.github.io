---
title: Hash with Indifferent Access
date: 2017-08-07
categories: [ rails, ruby, hash, symbol, hash_rocket ]
published: true
---

    DESCRIPTION: Rails has a core active-support extension called 'HashWithIndifferentAccess'. This means that whatever you put in to the hash keys; string or symbol, it is put in as a string with hash rocket.

<a class="main-link" href="http://api.rubyonrails.org/classes/ActiveSupport/HashWithIndifferentAccess.html">Documentation</a>

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

---

If you want to test in a test.rb file, try the following:

```rb
require "active_support/core_ext/hash/indifferent_access"

class TestIndifferentAccess

  def self.name_hash
    hash = ActiveSupport::HashWithIndifferentAccess.new

    hash[:first_name] = "last_name"
    hash["first_name"] = "last_name"

    puts hash[:first_name]
    puts hash["last_name"]
    puts hash
  end

  def self.other_name_hash
    hash = {
      first_name: "last_name",
      "first_name" => "last_name"
    }.with_indifferent_access

    puts hash
  end

end

TestIndifferentAccess.name_hash
TestIndifferentAccess.other_name_hash
```
