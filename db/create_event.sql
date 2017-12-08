INSERT INTO events (groupid, name, description, date, starttime, endtime, image, city, state, location)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);


select 
e.eventid, e.groupid, e.name, e.description, e.date, e.starttime, e.image, e.city, e.state, g.name as groupname
from events as e
INNER JOIN groups as g On e.groupid = g.groupid;