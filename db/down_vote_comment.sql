UPDATE comments
SET pointtotal = pointtotal-1
where commentid	 = $1 ;