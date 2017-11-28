-- $1 = postid

UPDATE post
 SET pointtotal = pointtotal+1
 liked_by = array_prepend($2, liked_by)
where postid = $1 ;