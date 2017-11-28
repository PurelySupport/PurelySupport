-- $1 = postid	
-- $2 = userid	

UPDATE post SET
    liked_by =
    CASE WHEN (liked_by @> $2) THEN (
           array_remove(liked_by, $2)
        )
        ELSE (
             array_prepend($2, liked_by)
        )
    EnD,
    
    Pointtotal =
    CASE wheN (liked_by @> $2) THEN (
          pointtotal-1
        )
        else (
            pointtotal+1
        )
    END
  where postid = $1;