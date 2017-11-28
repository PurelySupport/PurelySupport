
select
 user_messages($1)
 ::json;




-- SELECT s.displayname,
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
-- Where (s.userid = $1 OR r.userid = $1) 
-- and 
-- (case s.userid
-- when $1 then 'me'
-- else 'not_me'
-- end = 'not_me')
-- group by s.displayname;