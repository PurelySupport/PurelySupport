select 
p.postId, p.groupid, p.content, p.timestamp, p.pointtotal, p.title, p.image1, p.image2, p.image3, g.name as groupname
from post as p
INNER JOIN groups as g On p.groupid = g.groupid;