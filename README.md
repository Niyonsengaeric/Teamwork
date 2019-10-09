# Teamwork.

Teamwork is an internal social network for organizations’ employees.

### Goal of Application

Goal of Application this application is to facilitate more interaction between colleagues and facilitate team bonding.

# Badges.

[![Build Status](https://travis-ci.org/Niyonsengaeric/Teamwork.svg?branch=develop)](https://travis-ci.org/Niyonsengaeric/Teamwork) [![Coverage Status](https://coveralls.io/repos/github/Niyonsengaeric/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/Niyonsengaeric/Teamwork?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/ce7ee7f40189a9a1d3ca/maintainability)](https://codeclimate.com/github/Niyonsengaeric/Teamwork/maintainability)

## Required Features.

1. Employees can create their own user account.
2. Employees can sign in.
3. Employees can write and/or share articles with colleagues on topics of interest to them.
4. Employees can edit their articles.
5. Employees can delete their articles.
6. Employees can comment on other colleagues' article post.
7. Employees can view all articles showing the most recently posted articles first.
8. Employees can view a specific article.

## Optional Features

- Employees can view all articles that belong to a category (tag).
- Employees can flag a comment, or article as inappropriate.
- Admin can delete a comment, or article flagged as inappropriate.

# **Technonlogies**

- **Express JS** - API development framework

- **Node** - run time environment for JavaScript
- **Mocha and Chai** - for testing
- **Eslint** - code analysis tool for identifying problematic patterns found in JavaScript code
- **Babel JS** - JavaScript compiler (**ES6** to **ES5**)

# **Requirements and Installation steps**

## **You need the following to be able to run the application**

[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript

[Postman](https://www.getpostman.com/downloads/) to test the Api endpoints

[Visual studio code](https://code.visualstudio.com/download) for editing and running the app

## **Clone the project**

    - git clone https://github.com/Niyonsengaeric/Teamwork.git
    - cd /Teamwork
    - npm install (to install required dependencies)
    - npm run dev (to start the development server)

## **Testing**

    - npm test

## **Start The Application**

     - npm start

## **API endpoints**

`- POST /auth/signup - Create user account`

`- POST /auth/signin - Login a user`

`- POST /articles - Create an article`

`- PATCH /articles/<articleId> - Edit an article`

`- DELETE /articles/<articleId> - Employees can delete their articles`

`- POST /articles/<articleId>/comments - Employees can comment on other colleagues' article post.`

`- GET /feeds - Employees can view all articles, showing the most recently posted articles first.`

`- GET /articles/<articleId> - Employees can view a specific article.`

`- GET /articles?tag=<:desired-category> - Employees can view all articles that belong to a category (tag).`

`- POST /articles/flag/<articleId> - Employees can flag an article as inappropriate.`

`- POST /comments/flag/<commentId> - Employees can flag a comment as inappropriate.`

`- GET /flags - Admin can view all flags`

`- DELETE /articles/<articleId> - Admin can delete an article flagged as inappropriate.`

`- DELETE /comments/<commentId> - Admin can delete a comment flagged as inappropriate.`

### Links.

### 1.Gh-pages.

https://niyonsengaeric.github.io/Teamwork/UI/index.html

### 2.Pivotal Tracker.

https://www.pivotaltracker.com/n/projects/2396812

### 3.API DOCUMENTATON.

https://documenter.getpostman.com/view/8164226/SVmySxmV

## How it Works.

OPEN https://niyonsengaeric.github.io/Teamwork/UI/index.html Link and start navigate with different pages.

# **Author**

## **NIYONSENGA ERIC**
