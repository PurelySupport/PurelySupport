CREATE TABLE IF NOT EXISTS usersGroups(
groupid INT,
userid INT,
FOREIGN KEY (groupid) REFERENCES Groups(groupid),
FOREIGN KEY (userid) REFERENCES users(UserId)
);