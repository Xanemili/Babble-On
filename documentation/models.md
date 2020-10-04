*Figure out how to incorporate the following system in our database*
*Figure out how to incorporate imgages into databases*

User
    -id
    -firstName:string(50)
    -LastName:string(50)
    -username:string(16)
    -password:string(16)
    -email:string(20?//)
    -biography:text
    -profilePic:image
    -social media links (API's?)
    -followingId: references model: User????


Following
    -followers:array
    -following:array
    -userId: references model: User


Post
    -id
    -title:string(25)
    -sub-heading:string(200)
    -date:timestamp
    -content:text
    -readTime:numeric
    -image? (optional)
    -userId: references model: User
    -topicId: references model: Topics

Topic (How to have topics reference another topic???)
    -id
    -name:string(25)
    -description:string()
    -iconId: references model: Icon

Icon
    -id
    -image (How to incorporate images to database??)

Comment
    id
    -comment:string(140)
    -date:timestamp
    -userId: references model: User
    -postId: references model: Post

SubComment
    -id
    -commentId: references model: Comment


Like-Post
    -userId: references model: User
    -postId: references model: Post

Like-Comment
    -userId: references model: User
    -commentId: references model: Comment


Bookmarks
    -id
    -postId: references model: Post
    -commentId: references model: Comment
