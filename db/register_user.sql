-- this is the file for when a user registers for the first time
UPDATE users
SET displayname = $2, firstname =  $3, lastname = $4, state =  $5, city = $6
WHERE userid = $1;