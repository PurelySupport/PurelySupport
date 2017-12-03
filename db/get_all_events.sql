select 
e.eventid, e.groupid, e.name, e.description, e.date, e.starttime, e.image, e.city, e.state, g.name as groupname
from events as e
INNER JOIN groups as g On e.groupid = g.groupid;