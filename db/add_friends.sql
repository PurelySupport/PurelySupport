-- update users 
-- set friends = array_prepend($2, friends)
-- where userid = $1;

-- $1 = userid	
-- $2 = friendid	

UPDATE users SET
    friends =
    CASE WHEN (friends @> array[$2]) THEN (
           array_remove(friends, $2)
        )
        ELSE (
             array_prepend($2, friends)
        )
    EnD
  where userid = $1;