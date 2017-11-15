CREATE TABLE IF NOT EXISTS Replies(
ReplyId SERIAL PRIMARY KEY,
CommentId INT,
UserId INT,
Content TEXT,
Timestamp TEXT,
FOREIGN KEY (CommentId) REFERENCES Comments(CommentId),
FOREIGN KEY (UserId) REFERENCES users(UserId)
);
