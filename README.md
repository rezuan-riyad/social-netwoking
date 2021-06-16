## MongoDB, Express Social Media Api
### Schemas
..* Schema for User and Schema for Post with comment sub-document

### Features
**Post Controller**
..* Create user
..* Login user
..* Get user by unique username
**Post Controller**
..* A user gets all posts
..* A user gets single post by Id
..* A user creates new post
..* A user updates his own post by postid
..* A user deletes his post by postid
..* Users add or remove like form post
**Comment Controller**
..* User gets all comments by postid
..* User adds comment to a post (by upating post)
..* Commenter edits his own comment by postid & commentId
..* Commenter & Author delete comment in a post

### Will be added
..* Follow/Unfollow feature
..* Add refresh token  
..* Chating system (socket.io)
