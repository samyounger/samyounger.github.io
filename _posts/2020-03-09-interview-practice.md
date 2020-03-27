---
title: Software engineer interview preparation
date: 2020-03-09 12:00:00
categories: [job hunting, interviews, code tests, behavioural interview]
---

    DESCRIPTION: After three years of software engineering experience in Ruby, I was planning to move from London to Edinburgh. I did plenty of research, practice, and investigation in preparing for the various interviews. The following is some of my notes, with the code solutions in Ruby. Not the most captivating of reads, but it might be useful to some.

# Interview Practice

These are a set of common questions asked to attain a software engineering position, either for computer science graduates, or programmers with 2-3 years of experience.

Source: [SimpleProgrammer](https://simpleprogrammer.com/programming-interview-questions)

#### Practice practice practice

In additional to these questions scoured from various different sites, I practiced working through coding problems using the fantastic [Exercism.io](https://exercism.io).

#### Looking forward 🔭

Finally, as a non computer science graduate (I did a geography degree), I constantly suffer from the fear of not knowing what I don't know. I'm finally looking to resolve this and start to learn more in depth how and why things work the way they do. I'm starting with reading the book [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238) by Robert Martin. Once this is read, the next stop on my learning journey is [The Art of Computer Programming](https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming) by Donald Knuth. I am hoping both of these books and any additional study will help me move beyond the boundaries of Ruby to more statically typed languages such as Go, Scala and Java. I have been doing Ruby for long enough now that I know Dynamically typed languages have severe constraints such as performance, and not being type safe. As a curious programmer, I want to solve these problems.

## Arrays

Questions about array manipulation.

### Question 1
How do you find the missing number in a given integer array of 1 to 100?

### Solution
1. Get the sum of numbers which is total = n*(n+1)/2
2. Subtract all the numbers from sum and you will get the missing number

source: [GeekForGeeks](https://www.geeksforgeeks.org/find-the-missing-number)

```rb
class MissingIntegerFinder
  def find_missing_integer(numbers)
    count = numbers.size

    total = (count + 1) * (count + 2) / 2

    sum_of_numbers = numbers.sum

    total - sum_of_numbers
  end
end

# Test
numbers = [1, 2, 4, 5, 6]

finder = MissingIntegerFinder.new

missing_number = finder.find_missing_integer(numbers)

# => 3
```
---

### Question 2
How do you find the duplicate number on a given integer array?

### Solution
Traverse the array once. While traversing, keep track of count of all elements in the array using a temp array count[] of size n, when you see an element whose count is already set, print it as duplicate.

source: [GeekForGeeks](https://www.geeksforgeeks.org/find-the-two-repeating-elements-in-a-given-array)

```rb
class FindRepeatingNumbers
  def find(numbers)
    number_counts = [0] * numbers.length

    repeats = []

    number_counts.each_with_index do |number, index|
      if number_counts[numbers[index]] >= 1
        repeats << numbers[index]
      else
        number_counts[numbers[index]] = number_counts[numbers[index]] + 1
      end
    end

    repeats
  end
end

# Test
numbers = [4, 2, 4, 5, 2, 3, 1]
finder = FindRepeatingNumbers.new
finder.find(numbers)
```

---

### Question 3
How do you find the largest and smallest number in an unsorted integer array?

### Solution

source: [GeekForGeeks](https://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array)

```rb
class NthSizeFinder
  def find(numbers, index)
    sorted_numbers = numbers.sort
    sorted_numbers[index - 1]
  end
end

numbers = [12, 3, 5, 7, 19] 
finder = NthSizeFinder.new
finder.find(numbers, 4)
# => 12
```

---

### Question 4
How do you find all pairs of an integer array whose sum is equal to a given number?

### Solution
Create a map to store frequency of each number in the array. (Single traversal is required)

In the next traversal, for every element check if it can be combined with any other element (other than itself!) to give the desired sum. Increment the counter accordingly.

After completion of second traversal, we’d have twice the required value stored in counter because every pair is counted two times. Hence divide count by 2 and return.

source: [GeekForGeeks](https://www.geeksforgeeks.org/count-pairs-with-given-sum)

```rb
require 'set'

def sum_pairs(ints, sum)
  already_seen = Set.new

  ints.each do |int|
    return [sum - int, int] if already_seen.include?(sum - int)
 
    already_seen.add(int)
  end

  nil
end

sum_pairs([10, 5, 2, 3, 7, 5], 10)
# => [3, 7]
sum_pairs([10, 5, 2, 3, 7, 5], 20)
# => nil
```

---

### Question 5
How do you find duplicate numbers in an array if it contains multiple duplicates?

### Solution
By using two loops. It has a time complexity of O(n2).

source: [GeekForGeeks](https://www.geeksforgeeks.org/find-duplicates-given-array-elements-not-limited-range)

```rb
require 'set'

def find_duplicates(numbers)
  duplicates = Set.new

  numbers.each_with_index do |number, index|
    duplicates.add(number) if numbers.find_index(number) != index
  end

  duplicates.to_a
end

numbers = [2, 10, 100, 2, 10, 11]
find_duplicates(numbers)
# => [2 10]
```

---

## Strings

Questions about string manipulations. Most solutions focus on splitting the string into an array, so a lot of the answers above can be used again here.

### Question 1
How do you print duplicate characters from a string?

### Solution

source: [GeekForGeeks](https://www.geeksforgeeks.org/print-all-the-duplicates-in-the-input-string)

```rb
def find_duplicate_chars(string)
  characters = string.each_char.to_a

  duplicates = []

  characters.each_with_index do |char, index|
    duplicates << char if characters.find_index(char) != index
  end

  duplicates
end

string = "helloo"
find_duplicate_chars(string)
# => ["l", o"]
```

---

### Question 2
How do you check if two strings are anagrams of each other?

### Solution

source: [GeekForGeeks](https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other)

```rb
def anagram_check(first_word, second_word)
  one = first_word.each_char.to_a.sort
  two = second_word.each_char.to_a.sort

  one == two
end

first_word = "foobar"
second_word = "foobar"
anagram_check(first_word, second_word)
# => true

first_word = "foobar"
second_word = "blabla"
anagram_check(first_word, second_word)
# => false
```

---

### Question 3
How do you print the first non-repeated character from a string?

### Solution

source: [GeekForGeeks](https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character)

```rb
def non_repeat_char_finder(string)
  string.chars.find { |character| string.count(character) == 1 }
end

string = "geekforgeeks"
non_repeat_char_finder(string)
# => "f"
```

---

### Question 4
How can a given string be reversed using recursion?

```rb
def reverse(string, count = 0)
  return string if string.length == 1

  reversed_str = reverse(string[1..-1], count)
  reversed_str += string[0]
  reversed_str
end

string = "foobar"
reverse(string)
```

---

### Question 5
How do you check if a string contains only digits?

```rb
def only_digits(string)
  string.scan(/\D/).empty?
end

string = "foobar"
only_digits(string)
# => true

string = "123"
only_digits(string)
# => false
```

---

### Question 6
How are duplicate characters found in a string?

```rb
def duplicate_character_finder(string)
  string.each_char.select do |char|
    string.count(char) > 1
  end.uniq
end

string = "foobara"
duplicate_character_finder(string)
# => ["o", "a"]
```

---

### Question 7
How do you count a number of vowels and consonants in a given string?

```rb
def count_vowels_and_consonants(string)
  vowels = ["a", "e", "i", "o", "u"]
  vowel_count = string.scan(/[aeiou]/).count

  consonants = ("a".."z").to_a - vowels
  consonant_count = string.scan(/#{consonants}/).count

  { vowels: vowel_count, consonants: consonant_count }
end

string = "foobario"
count_vowels_and_consonants(string)
# => { vowels: 5, consonants: 3 }
```

---

### Question 8
How do you count the occurrence of a given character in a string?

```rb
def character_occurrence_count(string, char)
  string.scan(/#{char}/).count
end

string = "foobario"
character_occurrence_count(string, "o")
# => 3
```

---

### Question 9
How do you find all permutations of a string?

```rb
def permutations(string)
  string.chars.permutation.map(&:join)
end

string = "foobario"
permutations(string)
# => ...
```

---

### Question 10
How do you reverse words in a given sentence without using any library method?

```rb
def sentence_word_reverse(sentence)
  words = sentence.split(" ")
  words.map { |word| word.reverse }.join(" ")
end

sentence = "I am sam"
sentence_word_reverse(sentence)
# => "I ma mas"
```

---

### Question 11
How do you check if two strings are a rotation of each other?

```rb
def rotation_check(string_one, string_two)
  return false if string_one.length != string_two.length

  temp_str = string_one.dup << string_one

  return true if temp_str.include?(string_two)

  false
end

str1 = "ABCD"
str2 = "CDAB"
rotation_check(str1, str2)
# => true

str1 = "ABCD"
str2 = "ACBD"
rotation_check(str1, str2)
# => false
```

---

### Question 12
How do you check if a given string is a palindrome?

```rb
def palindrome_check(string)
  string == string.reverse
end

string = "abba"
palindrome_check(string)
# => true

string = "baba"
palindrome_check(string)
# => false
```

---

## Regex

Replace the http protocol in string

```rb
string = "http://samyounger.com"
string.sub(/\b(?:https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/)\b/, "")
# => samyounger.com

string = "https://samyounger.com"
string.sub(/\b(?:https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/)\b/, "")
# => samyounger.com

string = "http://www.samyounger.com"
string.sub(/\b(?:https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/)\b/, "")
# => samyounger.com

string = "https://www.samyounger.com"
string.sub(/\b(?:https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/)\b/, "")
# => samyounger.com
```

---

## Possible generic technical questions

1. Can you give an example of a time you worked with a team to improve the app?
2. What approach did you use to build your last app?
3. What is the last technology you used and what did you think of it?
4. How have you worked with and influenced your team and colleagues?
5. What online resources do you use to help you do your job?
6. How do you keep your technology skills current?
7. Pretend I’m not a tech person. Can you explain [a relevant technology] in simple terms?
8. What qualities do you think are most important in a developer [or another relevant position]?
9. What three words would your friends use to describe you?
10. Can you tell me about a time when things didn’t go the way you wanted at work, such as a project that failed or being passed over for a promotion?
11. What are your favorite and least favorite technology products, and why?
12. What are the benefits and the drawbacks of working in an Agile environment?
13. How do you think further technology advances will impact your job?
14. Tell me about a tech project you’ve worked on in your spare time.
15. What was the last presentation you gave?
16. What are the qualities of a successful team or project leader?
17. Are you comfortable working remotely or on a flexible schedule?
18. What would you hope to achieve in the first six months after being hired?
19. What kind of work environment suits you best?
20. How do you manage your work-life balance?
21. Why do you want to work for us?
22. When you don’t know the answer to something, what is the first thing that you do?
23. If you could design your dream job, what would it look like?
24. Tell me about your process of getting work done. When you get a new job or take on a new project, how do you go about doing it successfully?
25. How did you first learn to program and what was the first thing you built?
26. Describe a coworker's working style.
27. Can you tell us about a time you failed?
28. Tell me how the Internet works.
29. Which of your managers gets the best results and most value out of you and why?
30. Tell me about some of the more interesting or difficult problems you've been working on the past few years.
31. Have you made an account on our website and what do you think can be improved about the process?
32. Why do you get up in the morning?
33. Why are you taking the time to talk to me (recruiter, employer, etc.) today?
34. What’s the one thing we haven’t asked you about that you want to make sure we know?
35. How did your education prepare you for this job?
36. How would you rate your key competencies for this job?
37. What are your IT strengths and weaknesses?
38. Tell me about the most recent project you worked on. What were your responsibilities?
39. Describe a time you were able to improve upon the design that was originally suggested.
40. Tell me about the project you are most proud of, and what your contribution was.
41. Describe your production deployment process.
42. Give an example of where you have applied your technical knowledge in a practical way.
43. How did you manage source code?
44. What did you do to ensure quality in your deliverables?
45. When is the last time you downloaded a utility from the internet to make your work more productive, and what was it?
46. From the description of this position, what do you think you will be doing on a day-to-day basis?
47. What challenges do you think you might expect in this job if you were hired?
48. What would you do to ensure consistency across the unit, quality, and production environments?
49. You have been asked to research a new business tool. You have come across two solutions. One is an on-premises solution, the other is cloud-based. Assuming they are functionally equivalent, would you recommend one over the other, and why?
50. What would you do to ensure you provided accurate project estimates?
51. You have learned that a business unit is managing a major component of the business using Excel spreadsheets and Access databases. What risks does this present, and what would you recommend be done to mitigate those risks?
52. What development tools have you used?
53. What languages have you programmed in?
54. What source control tools have you used?
55. Describe the elements of an in-tier architecture and their appropriate use.
56. Compare and contrast REST and SOAP web services.
57. Define authentication and authorization and the tools that are used to support them in enterprise deployments.
58. What is FTI and when should it be used?
59. Have you used Visual Studio?
60. Have you used Eclipse?
61. What is a SAN, and how is it used?
62. What is clustering, and describe its use?
63. What is the role of the DMZ in network architecture?
64. What is a cross-site scripting attack, and how do you defend against it?
65. In network security, what is a honeypot, and why is it used?
66. How do you enforce relational integrity in database design?
67. When is it appropriate to de-normalize database design?
68. What is the difference between OLAP and OLTP? When is each used?
69. What automated-build tools or processes have you used?
70. What is the role of continuous integration systems in the automated-build process?
71. Describe the difference between optimistic and pessimistic locking.
72. In databases, what is the difference between a delete statement and a truncate statement?
73. What are transaction logs, and how are they used?
74. What are the most important database performance metrics, and how do you monitor them?
75. What is the role of SNMP?
76. How important is it to work directly with your business users?
77. What elements are necessary for a successful team and why?
78. What percentage of your time do you spend unit testing?
79. What do you expect in the solution documents you are provided?
80. How much reuse do you get out of the code that you develop, and how?
81. Which do you prefer; service-oriented or batch-oriented solutions?
82. What technical websites do you follow?
83. What do you know about our company?
84. Tell me about the most difficult technical challenge you’ve encountered and how you resolved it.
85. What technologies could you not live without?
86. What would you bring to our monthly bakeoff?
87. Tell me about a time you were asked to do something you had never done before. How did you react, and what did you learn?
88. How much does a first class one-way ticket from New York to Abu Dhabi cost on Etihad?
89. What do you do for fun?
90. What are your strengths?
91. What salary are you looking for?
92. Why are you leaving your company?
93. Do you work best alone or on a team?
94. Have you interviewed anywhere else?
95. The brainteaser or story problem
96. How familiar are you with [specific programming language]?
97. What are your weaknesses?