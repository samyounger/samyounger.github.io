---
title: Rspec learning
date: 2017-07-12
categories: [ rspec, spec, test, testing, rails, ruby, simplecov, coverage ]
published: true
---

    DESCRIPTION: Rspec is one of the preferred testing packages for ruby on rails. This is a blog-post for how to set it up, and testing basics to note.

## Initial setup

When initially setting up the application, if you write the usual `rails new your_app -T`, the `-T` will install the rails framework without the usual Test unit.

In the Gemfile add:

```rb
group :development, :test do
  gem 'rspec-rails'
end
```

In the terminal run `$ bundle`

In the terminal run `$ rails generate rspec:install`

The basic testing structure for Rspec is now complete. The above command creates a .rspec file where we configure rspec, a spec directory, and a file spec_helper.rb and rails_helper.rb.

`spec_helper.rb` is for specs that don't depend on rails.
`rails_helper.rb` is for specs that do depend on it.

Before running any tests that require the database, ensure you have run `rake db:migrate`, and set up the test database `rake db:test:prepare`.

To run your rspec tests, in the termial run `rake`, or `bundle exec rspec` or `rspec` depending on your setup.

---

## File structure

For a logical setup, you should replicate the file structure of your main rails application for the files you wish to test.

For example if you wish to test a User model, in the `spec` directory, you would have `models/user.rb` directory / file where all your User tests would be.

---

## Basic Syntax

Rspec is well known for being easy to read.

### describe

`describe` sections are the basic building blocks to organise your tests into logical groups to test.

To set up to access a User model, we would write

```rb
describe User do

end
```

If we want to set up a more generic test, we can use a string instead

```rb
describe "some string" do

end
```

If is usually preferential to tighten the scope more for your describe block. This is done by referring to the methods within the class you are testing.

**NOTE** a `#` refers to an instance method, and a `.` to a class method. These have no technical implication, but they help to identify what is being tested in the terminal output then a test fails.

```rb
describe User, ".find_user" do

end

describe User, "#age" do

end
```

*Reminder*: a class method is a method that can be called directly from the class, an instance method we must first instantiate the class (create a new class). For example, if we have the following class:

```rb
class TestClass

  def self.class_method

  end

  def instance_method

  end

end
```

To access the class_method, we would write `TestClass.class_method`.

To access the instance_method, we would write `TestClass.new.instance_method`.

The main case we would use a class_method would be if we first had to identify a User for example before running an instance method. Such as:

```rb
class UserService

  def self.find_user(id)
    User.find(id)
  end

  def age
    user = User.find(id)
    user.age
  end

end
```

To use this UserService, we would run

```rb
user = UserService.find_user(1)
user.age
```

### it

Within the `describe` block we use another scope of `it` blocks. The string we provide to the `it` block works as the main documentation for our test.

So we our UserService class above, we would best with

```rb
describe User, ".find_user" do
  it "returns one user" do
    ...
  end
end

describer User, "#age" do
  it "returns the users age" do
    ...
  end
end
```

**NOTE: Ensure the describe and it test is laid out properly, as this serves as the main documentation for understanding how the Application operates, and what we are testing.**

### expect

This is the actual test, and should return true of false as the outcome of the test.

For our User test above, we would write

```rb
describe User, ".find_user" do
  it "returns one user" do
    user = User.find_user(1)
    expect(user.size).to eq "1"
  end
end
```

*I should note that `expect` has replaced `should` with the latest Rspec version (3).*

---

## Four phases of a Test

Best practice we compose our tests in four distinct phases:

1. test setup
2. test exercise
3. test verification
4. test teardown

These are mostly for readability to give out tests conventional structure.

### Setup

We prepare the scenario under which the test is going to run, i.e. getting the data we want to test.

```rb
user = User.create(name: "Sam Younger")
job  = Job.create(title: "Web Developer")
```

### Exercise

This is where we run what we want to test.

```rb
name = user.name
```

### Verify

This is where we verify whether the test assertion is met or not, returning true or false.

```rb
expect(name).to eq "Sam Younger"
```

### Teardown

This is where we reset the database, so next time we test everything is clean.

This is mostly handled by Rspec itself

---

## Code Coverage

If you want to continuously deploy your code from each push to GitHub, I won't cover how to link this up, but what is important is that you have 100% code coverage of your tests. It is difficult to tell which code blocks you haven't tested simply by running the tests.

I use [SimpleCov](https://github.com/colszowka/simplecov) to get code coverage information.

In the gemfile :test group, include `gem simplecov`, and run bundle

In the .rspec file include `--require simplecov`

In the spec_helper file in Rspec.config code block, include the line

```rb
SimpleCov.start
```

When you run your tests with `rspec` etc. you will see at the bottom a report with the percentage of your code covered.

To see a more detailed report, in the console type:

```sh
$ open coverage/index.html
```

Here you will see a detailed report of all the different files in your application, and which lines of each file have been tested.

---

## References

I used this blog-post series by [Ed Wassermann](https://vis-kid.github.io/) as a prime source for this blog-post.

[first-post](https://code.tutsplus.com/articles/rspec-testing-for-beginners-part-1--cms-26716)[second-post](https://code.tutsplus.com/articles/rspec-testing-for-beginners-02--cms-26720)[third-post](https://code.tutsplus.com/articles/rspec-testing-for-beginners-03--cms-26728)
