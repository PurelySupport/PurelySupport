--$1 = UserId
--$2 = contentid

--//REPLIES//--
--ADD LIKE
update replies set liked_by = array_prepend($1, liked_by) where replyid = $2;
--REMOVE LIKE
UPDATE replies SET liked_by = array_remove(liked_by, $1) where replyid = $2;

--//COMMENTS//--
--ADD LIKE
update comments set liked_by = array_prepend($1, liked_by) where commentid = $2;
--REMOVE LIKE
UPDATE comments SET liked_by = array_remove(liked_by, $1) where commentid = $2;

--//POSTS//--
--ADD LIKE
update post set liked_by = array_prepend($1, liked_by) where postid = $2;
--REMOVE LIKE
UPDATE post SET liked_by = array_remove(liked_by, $1) where postid = $2;