SELECT
c.commentid, c.userid, c.postid, c.pointtotal, c.comment, c.timestamp, u.img, u.displayname, c.liked_by
FROM users as u
INNER JOIN comments as c ON u.userid = c.userid
WHERE postid = $1;