-- $1 = postid	
-- $2 = userid	

<<<<<<< HEAD
UPDATE post
 SET pointtotal = pointtotal+1
 liked_by = array_prepend($2, liked_by)
where postid = $1 ;
=======
UPDATE post SET
    liked_by =
    CASE WHEN (liked_by @> array[$2]) THEN (
           array_remove(liked_by, $2)
        )
        ELSE (
             array_prepend($2, liked_by)
        )
    EnD,
    
    Pointtotal =
    CASE wheN (liked_by @> array[$2]) THEN (
          pointtotal-1
        )
        else (
            pointtotal+1
        )
    END
  where postid = $1;
>>>>>>> master
