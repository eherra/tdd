 CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    password_hash TEXT NOT NULL
);

-- INSERT INTO users (user_id, password_hash)
--   VALUES (1, '$argon2id$v=19$m=4096,t=3,p=1$FgdUp2m0tiWulb0bgyvywA$RYyMSLxZn6/gC3Yf9Mh9mLuB43wvKWXVxPMy1xS+IrA');
