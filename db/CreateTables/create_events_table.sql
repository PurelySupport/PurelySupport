CREATE TABLE IF NOT EXISTS Events(
EventId SERIAL PRIMARY KEY,
GroupId INT,
Name Varchar(100),
Description Varchar(255),
Date TEXT,
StartTime TEXT,
EndTime TEXT,
Image TEXT,
City VARCHAR(100),
State VARCHAR(100),
Location VARCHAR(100),
FOREIGN KEY (GroupId) REFERENCES Groups(GroupId)
);