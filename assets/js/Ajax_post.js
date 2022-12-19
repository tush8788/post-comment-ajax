{
    //send post to server
    let createPost=function(){
        //finding id 
        let newPostform=$('#createPost');
        //on submit run this function
        newPostform.submit(function(e){
            //off default opration
            e.preventDefault();
            // console.log(typeof(newPostform.serialize()));
            //ajax
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostform.serialize(),
                success:function(data){
                    // console.log(data);
                    //call function
                    let newPost=displayNewPost(data.data.post);
                    $('#post-container').prepend(newPost);

                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //method to crete post in dom
    let displayNewPost=function(post){
        return $(`
            <li id="post-${post._id}%>">
               
                    <h2>
                        <a class="delete-post-btn" href="/post/delete/${post._id}">X</a>
                        <!-- showing post -->
                        ${post.containt}<br>
                        <!-- showing user of post or who created this post -->
                        <small>
                            ${post.user.name}
                        </small>
                    </h2>
                
        
                <!-- Comments -->
                <div class="Comment-container">
                    <!-- first check user is sign in to create comment -->
                   
                       <div class="comment-form">
                            <form action="/comment/create" method="post">
                                <input type="text" name="containt" placeholder="Comment here.."required>
                                <input type="hidden" name="postId" value="${post._id}"><br>
                                <input type="submit" value="Comment">
                            </form>
                       </div>
                   
                    <!-- display all comments -->
                    <div class="comment-display">
                        <ul id="post-comment-${post._id}">
                            
                        </ul>
                    </div>
                </div>
            </li>
       `)
    }

    createPost();

}