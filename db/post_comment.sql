INSERT INTO comments (userid, postid, pointtotal, comment, timestamp)
VALUES ($1, $2, 0, $3, $4);

SELECT
c.commentid, c.userid, c.postid, c.pointtotal, c.comment, c.timestamp, u.img, u.displayname, c.liked_by
FROM users as u
INNER JOIN comments as c ON u.userid = c.userid
WHERE postid = $2;