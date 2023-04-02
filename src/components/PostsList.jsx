import Post from './Post';
import NewPost from './NewPost';
import styles from './PostsList.module.css';
import { useState } from 'react';
import Modal from './Modal';

const savedPosts = localStorage.getItem("posts");
const initState = () => useState( savedPosts? [...JSON.parse(savedPosts)]: []);

const PostsList = (props) => {
    const [posts, setPostsList] = initState();
    const savePostList = (post) => localStorage.setItem('posts', JSON.stringify([post, ...posts]));
    const addPost = (post) => {savePostList(post); setPostsList((posts) => [post, ...posts]);}
    return (<>
        {props.isPosting && (<Modal onClose={props.onStopPosting}>
            <NewPost onCancel={props.onStopPosting} onSubmit={addPost} />
        </Modal>)}
        {posts.length > 0 && (<ul className={styles.posts}>
            {posts.map((post) => <Post key={crypto.randomUUID()} author={post.author} text={post.text} />)}
        </ul>)
        }
        {posts.length == 0 && (
            <div style={{ textAlign: 'center', color: 'white'}}>
                <h2>There are no posts yet!</h2>
                <p>Try adding some.</p>
            </div>
        )}
    </>);
}

export default PostsList;