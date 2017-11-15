
CREATE TABLE IF NOT EXISTS users(
    userid SERIAL PRIMARY KEY,
    user_name VARCHAR(180),
    email VARCHAR(180),
    img TEXT,
    auth_id TEXT,
    registered BOOLEAN,
    DisplayName VARCHAR(100),
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    State VARCHAR(100),
    City VARCHAR(100)
);