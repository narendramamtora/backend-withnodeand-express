    document.addEventListener('DOMContentLoaded', () => {
    const PostLink = document.getElementById('post');
    const PostDes = document.getElementById('postdes');
    const CreatePost = document.getElementById('createpost');
    const PostList = document.getElementById('postList');

    function addCommentEventListener(postId) {
        // Access the dynamically created button
        const buttonComment = document.getElementById(`buttoncomment-${postId}`);

        // Attach the click event listener
        buttonComment.addEventListener('click', () => {
            const comment = document.getElementById(`inputcomment-${postId}`);
            const commentValue = comment.value;

            axios.post(`http://localhost:3000/addcomment/${postId}`, {
                comment: commentValue
            })
            .then(() => {
                comment.value = '';
                fetchPosts();
            })
            .catch(err => console.error(err));
        });
    }
    CreatePost.addEventListener('click', () => {
        const postLinkValue = PostLink.value;
        const postDesValue = PostDes.value;

            axios.post('http://localhost:3000/createpost', {
                postLink: postLinkValue,
                postDes: postDesValue
            })
            .then(() => {
                // Clear input fields
                PostLink.value = '';
                PostDes.value = '';
                // Fetch and display posts
                fetchPosts();
            })
            .catch(err => console.error(err))
        });
        
        
        function fetchPosts() {
            axios.get('http://localhost:3000/showpost')
            .then(response => {
                if (response.status === 200) {
                    displayPosts(response.data);
                }
            })
            .catch(err => console.error(err));
        }
        
        function displayPosts(posts) {
            PostList.innerHTML = ''; // Clear existing posts
            
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                <div><iframe src="${post.postLink}" frameborder="0" allowfullscreen></iframe></div>
                <p><strong>Description:</strong> ${post.postDes}</p>
                <div class="comments">
                <input id= "inputcomment-${post.id}" type="text" class="comment-input" data-post-id="${post.id}" placeholder="Add a comment">
                <button id= "buttoncomment-${post.id}" class="comment-button">Comment</button>
                
                <p><strong>Comments:</strong></p>
                `;

                   // Create a container for comments
        const commentsContainer = document.createElement('div');
        
        
        
        
        
        if (post.comment) {
            const comments = post.comment.split(','); 
            comments.forEach(comment => {
                comment = comment.substring(1, comment.length - 1); // here i had start from 1 and also end before last to remove square brackets
                comment = comment.replace(/"/g, ''); // there was extra quote to remove that we use replace
                const commentElement = document.createElement('p');
                commentElement.textContent = comment;
                commentsContainer.appendChild(commentElement);
            });
        }

        postElement.querySelector('.comments').appendChild(commentsContainer);



                PostList.appendChild(postElement);
                addCommentEventListener(post.id);
            });
            
        }
        // Initial fetch of posts
        fetchPosts();
    });
