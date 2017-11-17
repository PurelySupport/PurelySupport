UPDATE post
 SET userid = $1, groupid = $3,  content = $4,	timestamp = $5,	pointtotal = $6,	title = $7,	published = $8
where postid = $2 ; 