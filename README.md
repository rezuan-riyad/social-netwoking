## MongoDB, Express Social Media Api
### Schemas
1. Schema for User and Schema for Post with comment sub-document

### Features
**Post Controller**
1. Create user
2. Login user
3. Get user by unique username

**Post Controller**
1. A user gets all posts
2. A user gets single post by Id
3. A user creates new post
4. A user updates his own post by postid
5. A user deletes his post by postid
6. Users add or remove like form post

**Comment Controller**
1. User gets all comments by postid
2. User adds comment to a post (by upating post)
3. Commenter edits his own comment by postid & commentId
4. Commenter & Author delete comment in a post

### Will be added
1. Follow/Unfollow feature
2. Add refresh token  
3. Chating system (socket.io)
