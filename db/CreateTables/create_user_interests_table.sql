CREATE TABLE IF NOT EXISTS UserInterests(
InterestId INT,
userid INT,
FOREIGN KEY (InterestId) REFERENCES Interests(InterestId),
FOREIGN KEY (userid) REFERENCES users(UserId)
);