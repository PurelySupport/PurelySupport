SELECT
u.userid, 
u.email, 
u.registered, 
u.displayname,	
u.firstname, 
u.lastname, 
u.state,
u.city, 
ui.interestid, 
i.interest, 
ug.groupid, 
g.name,
g.diseaseid,
ud.diseaseid,
d.name

FROM users as u

INNER JOIN userinterests as ui ON u.userid=ui.userid
INNER JOIN interests as i ON i.interestid=ui.interestid

INNER JOIN usersgroups as ug ON u.userid=ug.userid
INNER JOIN groups as g ON g.groupid=ug.groupid

INNER JOIN userdiseases as ud ON u.userid=ud.userid
INNER JOIN diseases as d ON ud.diseaseid=d.diseaseid

Where u.userid = $1
;
