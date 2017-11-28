update users 
set friends = array_prepend($2, friends)
where userid = $1;