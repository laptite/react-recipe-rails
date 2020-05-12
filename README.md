# SUMMARY

This application is a "React on Rails" app that I created to learn how to:
* Run React on a standard Rails 6 install
* Handle Rails API communications between controller and components
* Handle forms and CRUD
* Refactor CRUD to work with react-hooks
* Extract form components to successfully share form elements between New and Edit actions

## Credit & Retrospective

* **Starting point:** [Digital Ocean Article](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend)

* **Extracting form components:** [Codementor Article](https://www.codementor.io/@blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y)

* **Installation:** Many of the comments after the article demonstrate how just following the instructions led to installation difficulties. My steps outlined below under Configuration avoided many of the stated problems. Note the updated webpacker flag: `--webpacker=react` as opposed to the previous: `--webpack=react`

* **CRUD -- Pluses:** Most React tutorials address forms by covering a basic single input. This one covers a more realistic application AND it gives a clear example on handling JSON responses with react-router, which is really the kind of paradigm that most Rails developers IMO are more keen to learn as interests shift to JS frontend frameworks and libraries.

* **CRUD -- Minus:** The author answers commentor's questions around Edit/Update by simply saying to follow the same pattern. It's hard to find an online example that gives a 1:1 walk-through of all the CRUD actions, so this article did disappoint on that point. The upside though was having to wrap my head around ComponentDidMount, ComponentDidUpdate and ultimately useEffect().

* **On React Hooks:** I'm glad React Hooks are being more commonly used. Components are so much more readable, making it much easier to figure out how each component works. While I initially learned React using extended classes, I admit jumping right into hooks to focus more on speed of implementation and less code.

* **Potential Next Step:**
```code
# Replace react-router altogether with react-hooks
```

* **Intentionally ommitted:** These are addressed separately in other learning applications
```code
# Image uploads and display
# React <-> Rails user management
# JS tests using Jest
# Rails tests using Rspec/Capybara
# Explicit validation and error handling
```

## Application information:

* **Rails version:** Rails 6.0.3

* **Ruby version:** ruby-2.6.3

* **Database verion:** ruby-2.6.3

* **Configuration:** Standard rails install gemfile w/ webpacker and react-rails
``` code
$ rails new react-recipe-rails -d=postgresql --webpacker=react
$ cd react-recipe-rails

# Add: gem 'react-rails'

$ bundle install
$ rails g react:install

# Address any unmet peer dependencies

$ git add . && git commit -m "initial commit"
```

* **Other dependencies:**
``` code
$ yarn add react-router-dom bootstrap jquery popper.js
```

* **Database creation:** rake db:create

* **Database migration:** rake db:migrate 

* **Database seeding:** rake db:seeds

* **How to run the test suite:** N/A

* **Services (job queues, cache servers, search engines, etc.):** N/A

* **Deployment instructions:** N/A

* ...
