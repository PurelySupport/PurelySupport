--$1 = userid
--$2 = interestid

DO 
$add_users_interests$
DECLARE 
  interests_array integer[] = $2;
  interests_array_len int = array_upper(interests_array, 1);

 begin
  for i in 1..interests_array_len
    loop
      insert into userinterests (interestid, userid) Values ( interests_array[i], $1 );
    end loop;
end
$add_users_interests$;