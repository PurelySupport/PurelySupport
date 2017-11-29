-- $1 = commentid	
-- $2 = userid	

UPDATE comments SET
    liked_by =
    CASE WHEN (liked_by @> array[$2]) THEN (
           array_remove(liked_by, $2)
        )
        ELSE (
             array_prepend($2, liked_by)
        )
    EnD,
    
    Pointtotal =
    CASE wheN (liked_by @> array[$2]) THEN (
          pointtotal-1
        )
        else (
            pointtotal+1
        )
    END
  where commentid = $1;
  SELECT
c.commentid, c.userid, c.postid, c.pointtotal, c.comment, c.timestamp, u.img, u.displayname, c.liked_by
FROM users as u
INNER JOIN comments as c ON u.userid = c.userid
WHERE postid = $1;
--   returning *;
