SELECT DISTINCT
-- s.displayname as sender,

-- s.userid as sender,
-- m.messageid,
-- r.displayname as reciever,
-- r.userid as reciever,
-- m.senderid,
-- m.recieverid,
-- m.content,
-- m.timestamp, 
string_agg( DISTINCT 
'['||'{ messageid: '||m.messageid ||

',  sender_name: '|| s.displayname ||
',  sender_id: '|| s.displayname ||
',  reciever_name: '|| r.displayname ||
',  reciever_id: '|| r.userid ||
',  message: '|| m.content ||


' }', ', ') ||']'AS messages


FROM users as u
INNER JOIN messages as m ON u.userid = m.senderid
INNER JOIN users as r ON r.userid=m.recieverid
INNER JOIN users as s ON s.userid=m.senderid

Where s.userid = 6 OR r.userid = 6

-- GROUP BY 1
;

