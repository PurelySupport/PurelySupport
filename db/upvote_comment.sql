-- $1 = commentid	

UPDATE comments
SET pointtotal = pointtotal+1,
liked_by = array_prepend($2, liked_by)
where commentid	 = $1;