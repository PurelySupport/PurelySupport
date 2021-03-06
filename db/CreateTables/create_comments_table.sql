CREATE TABLE IF NOT EXISTS Comments(
CommentId SERIAL PRIMARY KEY,
UserId INT,
PostId INT,
PointTotal INT,
Comment TEXT,
TimeStamp TEXT,
FOREIGN KEY (UserId) REFERENCES Users(UserId),
FOREIGN KEY (PostId) REFERENCES Post(PostId)
);
