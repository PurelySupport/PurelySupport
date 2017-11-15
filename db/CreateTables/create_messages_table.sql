CREATE TABLE IF NOT EXISTS Messages(
MessageId SERIAL PRIMARY KEY,
SenderId INT,
RecieverId INT,
Content TEXT,
Timestamp TEXT,

FOREIGN KEY (SenderId) REFERENCES users(UserId),
FOREIGN KEY (RecieverId) REFERENCES users(UserId)
);