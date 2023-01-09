## Full-stack web app
> a To-Do List app using TDD

### Functionalities
Basic features required by the course: 

- [ ] add a to-do item
- [ ] rename a to-do item 
- [ ] mark a to-do item completed
- [ ] archive all completed to-do items

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
- JUnit, Mockito for backend
- Jest, Chai, Mocha for frontend
