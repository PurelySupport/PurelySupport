-- $1 = userid
-- $2 = groupid
-- $3 = content
-- $4 = timestamp
-- $5 = pointtotal
-- $6 = title


insert into post (
userid, groupid, content, timestamp, pointtotal, title
) 
Values (
$1, $2, $3, $4, $5, $6
);