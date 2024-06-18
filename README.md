# Introduction
This is a quick proof of concept project for a web programming class. The frameworks used are Express on the backend and Vue 3 w/ Vuetify on the frontend.

The theme for the app is cybersecurity. A couple of pages are devoted to cryptography and another provides an intentionally vulnerable login page.

## Cryptography
- Shift Cipher
- Book Cipher

## Injection
- SQL Injection via a vulnerable login page. The database is a simple SQLite DB loaded in the browser. As such, any modifications can be reverted by simply refreshing the page (may require clearing the cache)