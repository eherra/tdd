package todoApp.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import todoApp.model.Todo;

import java.util.List;

@Repository
public class TodoRepository {

    @Autowired
    private MongoTemplate mongoTemplate;


    public List<Todo> getAllTodos() {
        return mongoTemplate.findAll(Todo.class);
    }

    public Todo saveTodo(final Todo todo) {
        return mongoTemplate.insert(todo);
    }

    public void renameTodo(final String todoId, final String newDescription) {
        final Query query = new Query()
                .addCriteria(Criteria
                        .where("id")
                        .is(todoId));

        final Update update = new Update()
                .set("description", newDescription);

        mongoTemplate.findAndModify(query, update, Todo.class);
    }

    public void updateComplete(final String todoId, final boolean isCompleted) {
        final Query query = new Query()
                .addCriteria(Criteria
                        .where("id")
                        .is(todoId));

        final Update update = new Update()
                .set("isCompleted", isCompleted);
        mongoTemplate.findAll(Todo.class);
        mongoTemplate.findAndModify(query, update, Todo.class);
    }

    // test usage only
    public void dropTestDatabase() {
        mongoTemplate.getDb().drop();
    }
}
