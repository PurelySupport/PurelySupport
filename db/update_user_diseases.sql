--$1 = userid
--$2 = diseaseid


DO 
$add_users_diseases$
DECLARE 
  diseases_array integer[] = $2;
  diseases_array_len int = array_upper(diseases_array, 1);

 begin
 DELETE FROM userdiseases
WHERE userid = $1;
raise notice 'length is %', diseases_array_len;
  for i in 1..diseases_array_len
    loop
      insert into userdiseases (diseaseid, userid) Values ( diseases_array[i], $1);
    end loop;
end
$add_users_diseases$;