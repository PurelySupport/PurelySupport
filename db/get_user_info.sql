SELECT DISTINCT
u.userid, 
u.email, 
u.registered, 
u.displayname,	
u.firstname, 
u.lastname, 
u.city ||' ' ||u.state as location,
string_agg( DISTINCT '{ interest_name: '||i.interest ||',  interest_id: '|| i.interestid|| ' }', ', ')AS interests,
string_agg( DISTINCT '{ group_name: '||g.name ||',  group_id: '|| g.groupid|| ' }', ', ') AS groups,
string_agg( DISTINCT '{ disease_name: '||d.name||',  disease_id: '|| ud.diseaseid|| ' }', ', ') AS diseases
-- g.diseaseid,
-- ud.diseaseid,
-- d.name

FROM users as u

INNER JOIN userinterests as ui ON u.userid=ui.userid
INNER JOIN interests as i ON i.interestid=ui.interestid

INNER JOIN usersgroups as ug ON u.userid=ug.userid
INNER JOIN groups as g ON g.groupid=ug.groupid

INNER JOIN userdiseases as ud ON u.userid=ud.userid
INNER JOIN diseases as d ON ud.diseaseid=d.diseaseid

Where u.userid = 2
GROUP BY 1,2,3,4,5,6,7
;
