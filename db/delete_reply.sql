UPDATE replies
set content='Deleted', timestamp=null
WHERE replyid = $1