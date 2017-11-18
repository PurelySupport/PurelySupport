--$1 = userid
--$2 = groupid

DO 
$add_users_groups$
DECLARE 
  groups_array integer[] = $2;
  groups_array_len int = array_upper(groups_array, 1);

 begin
 DELETE FROM usersgroupsusersgroups
WHERE userid = $1;
raise notice 'length is %', groups_array_len;
  for i in 1..groups_array_len
    loop
      insert into usersgroups (groupid, userid) Values ( groups_array[i], $1);
    end loop;
end
$add_users_groups$;