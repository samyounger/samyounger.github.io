---
layout: post
title: Ruby notes
date: 2017-02-07
published: true
---
#Ruby Notes

This is a collection of notes while learning Ruby

Key rule in ruby: **Everything in Ruby is an object**

---
##Classes
**Naming**: all class names should begin with a capital letter
**Creating an object**: you call your object outside of the object with `Object_Name.new`. This creates a new instance of the object.

###attr_accesssor
When you want to read/write to the database, in the Class you would need to write two read/write methods:

```ruby
class Person
  #read accessor
  def name
    @name
  end
  #write accessor
  def name=(str)
    @name = str
  end
end

person = Person.new
person.name = 'Sam'
person.name # => "Sam"
```

a shortcut to this using accessor is:

```ruby
class Person
  attr_reader :name
  attr_writer :name
end
```

This can then be shortened down further to:

```ruby
class Person
  attr_accessor :name
end

person = Person.new
person.name = 'Sam'
person.name # => "Sam"
```

---

##Models
Models are where we determine database table relationships and filters/validations to any data being saved to the database.

###Relationships
SQL databases are relational and we must determine the relationship between the data sets.

The types of relationships are as follows:

-one_to_many
-one_to_one (note there are not many of these, highly uncommon)
-many_to_many and many_to_one

By simply writing one of the three lines above in the model for a dataset, we determine the relationship.

For example. If we have two databases, one for a persons belongings, and one for persons. We might have two models as follows:

```ruby
class Person < ActiveRecord::Base
  one_to_many :belonging
end
```

```ruby
class Belonging < ActiveRecord::Base
  belongs_to :person
end
```

You will see above I used a `belongs_to` relationship. This is called a **join** query. There are a number of join queries:

-cross joins
-natural joins
-inner joins
-left (outer) joins
-right (outer) joins

**MORE WORK IS REQUIRED HERE**

###Validations
In the models directory, you can add in validations for data that is going to be added to your directory to ensure your database is clean data added that you approve of.

```ruby
class Person < ApplicationRecord
  validates :status,
            presence: true,
            length: { minimum: 3, maximum: 1000 },
            uniqueness: true,
            numericality: true,
            format: { with: /.*/ },
            acceptance: true,
            confirmation: true
end
```

###Controllers
Controllers are the brains of the website. The controller accesses the model to input/output data. In addition it retrieves the data that is to be shown in the HTML.
