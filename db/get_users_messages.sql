
SELECT DISTINCT ON (sub.user_id) 
-- json_agg(json_build_object('message_id',sub.messageid, 'user_id', sub.user_id, 'content', sub.content, 'timestamp', sub.TIMESTAMP, 'display_name',users.displayname))
sub.messageid, sub.user_id, sub.content, sub.TIMESTAMP, users.displayname
FROM 
    (
  SELECT 'out' AS type, messageid, recieverid AS user_id, content, TIMESTAMP 
  FROM   messages as mr
  WHERE  senderid = $1

  UNION  
  SELECT 'in' AS type, messageid, senderid AS user_id, content, TIMESTAMP
  FROM   messages as ms
  WHERE  recieverid = $1
  
--   EXCEPT 
--   SELECT displayname,userid, userid,displayname, displayname
--   from users
  ) as sub
INNER JOIN users ON users.userid=sub.user_id
-- group by sub.user_id ,sub.messageid
ORDER  BY sub.user_id, messageid DESC;


-- select
--  user_messages($1)
--  ::json;



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