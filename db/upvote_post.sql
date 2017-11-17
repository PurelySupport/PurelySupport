-- $1 = postid

UPDATE post
 SET pointtotal = pointtotal+1
where postid = $1 ;