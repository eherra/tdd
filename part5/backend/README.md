## To-Do app backend with Java Spring Boot

### Commands

Start backend with command:

```
mvn spring-boot:run
``` 

### Running tests

Start docker containers from project root with command:
```
docker-compose -f docker-compose.test.yml up -d
``` 

and run tests:

```
mvn test
``` 

On repository unit tests, there's a test db used which is removed on test teardown.