--USERS_INTERESTS WORKING!
SELECT
json_agg(json_build_object(
'interest_name', i.interest,
'interest_id' , i.interestid
)) AS interests
FROM users as u
join   userinterests as ui ON u.userid=ui.userid
join  interests as i ON i.interestid=ui.interestid
Where u.userid = 2
;

--USERS_GROUPS WORKING!
SELECT
json_agg(json_build_object(
'group_name', G.name,
'group_id' , g.groupid
)) AS groups
FROM users as u
join  usersgroups as ug ON u.userid=ug.userid
join groups as g ON g.groupid=ug.groupid
Where u.userid = 2
;


--USERS_Diseases WORKING!
SELECT
json_agg(json_build_object(
'disease_id', d.name,
'interest_id' , ud.diseaseid
)) AS diseases
FROM users as u
join  userdiseases as ud ON u.userid=ud.userid
join  diseases as d ON ud.diseaseid=d.diseaseid
Where u.userid = 2
;
--/// OLD MESSAGES SQL///
-- SELECT
-- json_agg(json_build_object(
-- 'message_id', m.messageid,
-- 'sender_name' , s.displayname,
-- 'sender_id' , s.userid,
-- 'reciever_name' , r.displayname,
-- 'reciever_id' , r.userid,
-- 'message' , m.content
-- )) AS messages

-- FROM users as u
-- INNER JOIN messages as m ON u.userid = m.senderid
-- INNER JOIN users as r ON r.userid=m.recieverid
-- INNER JOIN users as s ON s.userid=m.senderid

-- Where s.userid = 6 OR r.userid = 6;
-- select users_interests2();
-- 
-- select user_details($1);