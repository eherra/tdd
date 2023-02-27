## Full-stack web app
> a To-Do List app using TDD

### Functionalities
Basic features required by the course: 

- [x] add a to-do item
- [x] rename a to-do item 
- [x] mark a to-do item completed
- [x] archive all completed to-do items


### Demo (20 seconds)

<img src="https://github.com/eherra/tdd/part5/blob/main/docs/demoPart5.gif" width="80%" heigth="80%">


### How to run

#### Production

On root folder (~/part5/), run command:

```
docker-compose  up -d
``` 

Application is running at http://localhost:3000


#### Run with test environment against test db

On root folder (~/part5/) run command:

```
docker-compose -f docker-compose.test.yml up -d
``` 

Application is running at http://localhost:3000


and in order to run intergration test (walking skeleton), run on root:

```
robot .
``` 

> Note: you need to have robot framework and chrome webdriver installed in order to run intergration test


### Testing requirements
- use unit tests to cover as much of the code as is possible to unit test
- also unit test the user interface components (visual testing is optional)
    - tests for the UI components should not depend on the API
- use focused integration tests for the database and API layers
    - tests for the API (request routing and validation) should not depend on the database
    - tests for the database should not depend on the API
- write only one end-to-end test which requires a fully deployed application (e.g. Docker containers running locally) to make sure that things are wired together correctly (start with this - see walking skeleton)


### Technology stack

#### Backend
Java Spring Boot

#### Frontend
React

#### Database
MongoDB

#### Testing
- Robot Framework for end-to-end test
- JUnit and Mockito for backend
- Jest and React-Testing-Library for frontend
