UPDATE comments
SET comment = 'Deleted', pointtotal = 0, timestamp = null
WHERE commentid = $1