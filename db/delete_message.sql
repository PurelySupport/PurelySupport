UPDATE messages
SET content='Deleted', timestamp=null
WHERE messageid = $1