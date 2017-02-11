---
layout: post
title: Ruby notes
date: 2017-02-07
published: true
---

    DESCRIPTION: This is a collection of notes while learning Ruby

**TAKE NOTE: Everything in Ruby is an object**

Its documentation is found here:

<https://www.ruby-lang.org/en/>

Ruby is probably best known for the Ruby on Rails framework. The documentation for this can be found here:

<http://rubyonrails.org/>

## Classes

**Naming**: all class names should begin with a capital letter.

**Creating an object**: you call your object outside of the object with `Object_Name.new`. This creates a new instance of the object.

## attr_accesssor

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
```

## Models

Models are where we determine database table relationships and filters/validations to any data being saved to the database.

## Database Relationships

SQL databases are relational and we must determine the relationship between the data sets.

The types of relationships are as follows:

- one_to_many
- one_to_one (note there are not many of these, highly uncommon)
- many_to_many and many_to_one

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

- cross joins
- natural joins
- inner joins
- left (outer) joins
- right (outer) joins

**MORE WORK IS REQUIRED HERE**

## Validation

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

## Controllers

Controllers are the brains of the website. The controller accesses the model to input/output data. In addition it retrieves the data that is to be shown in the HTML.

The different routes in the application are as follows:

| HTTP Verb     | Path            | Controller#Action | Used for |
| ------------- | --------------- | ----------------- | ---------|
| GET           | /photos         | photos#index      | display a list of all photos |
| GET           | /photos/new     | photos#new        | return an HTML form for creating a new photo |
| POST          | /photos         | photos#creates    | create a new photo |
| GET           | /photos/:id     | photos#show       | display a specific photo |
| GET           | /photos/:id/edit| photos#edit       | return an HTML form for editing a photo |
| PATCH/PUT     | /photos/:id     | photos#update     | update a specific photo |
| DELETE        | /photos/:id     | photos#destroy    | delete a specific photo |

At the bottom of the controller there should be a method called `version_params`. This determines which methods are allowed to be run in the controller. If for example you do not want a rogue piece of data being saved to the database, this can stop that.

```ruby
def version_params
  params.require(:photos).permit(:photo_id, :photo_date, :photo_commentary)
end
```
