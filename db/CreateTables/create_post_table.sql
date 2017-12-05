CREATE TABLE IF NOT EXISTS Post(
postId SERIAL PRIMARY KEY,
GroupId INT,
UserId INT,
Content TEXT,
TimeStamp VARCHAR(200),
PointTotal INT,
Title Varchar(100),
image1 text, 
image2 text, 
image3 text,
FOREIGN KEY (GroupId) REFERENCES Groups(GroupId),
FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
