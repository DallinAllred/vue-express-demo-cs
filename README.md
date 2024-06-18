# Introduction
This is a quick proof of concept project for a web programming class in 2023. The frameworks used are Express on the backend and Vue 3 w/ Vuetify on the frontend.

The theme for the app is cybersecurity. A couple of pages are devoted to cryptography and another provides an intentionally vulnerable login page.

## Cryptography
- Shift Cipher
- Book Cipher

## Injection
- SQL Injection via a vulnerable login page. The database is a simple SQLite DB loaded in the browser. As such, any modifications can be reverted by simply refreshing the page (may require clearing the cache)


---
---

# Reflection
(June 2024) 

This project was created while I was still learning the modern features of JavaScript and frontend frameworks. In review, there are several items that stand out as obvious areas for improvement.
1. The JavaScript could be more idiomatic. For example, iterators could be used in place of C style `for` loops.
2. Even as a learning exercise, the Express server is overly simplistic and does not apply some features that would make it more secure. Packages such as `helmet` and logging middleware would be a step in the right direction.

The code is being left as is since it represents the project submitted for class.