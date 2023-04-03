import Post from './Post';
import NewPost from './NewPost';
import styles from './PostsList.module.css';
import { useEffect, useState } from 'react';
import Modal from './Modal';

const BASE_URL = 'http://localhost:8080/posts';
const savedPosts = localStorage.getItem("posts");
const initState = () => useState([]);

const defineMethods = (posts, setPostsList) => {
    const savePostListOnLocalStorage = (post) => localStorage.setItem('posts', JSON.stringify([post, ...posts]));
    const savePostOnBackend = (post) => fetch(BASE_URL, {
        method: 'POST', body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' }
    })
    
    const addPost = (post) => {
        savePostOnBackend(post);
        savePostListOnLocalStorage(post);
        setPostsList((posts) => [post, ...posts]);
    }

 
    return addPost;
}


const PostsList = (props) => {
    const [posts, setPostsList] = initState();
    const addPost = defineMethods(posts,setPostsList);

    useEffect(() => {
        try {
            const getPosts = async () => {
                const resp = await fetch(BASE_URL);
                const data = await resp.json();
                setPostsList(data.posts);
            }
            getPosts();
        } catch (error) {
            setPostsList(savedPosts ? [...JSON.parse(savedPosts)] : []);
        }

    }, []);


    return (<>
        {props.isPosting && (<Modal onClose={props.onStopPosting}>
            <NewPost onCancel={props.onStopPosting} onSubmit={addPost} />
        </Modal>)}
        {posts.length > 0 && (<ul className={styles.posts}>
            {posts.map((post) => <Post key={crypto.randomUUID()} author={post.author} body={post.body} />)}
        </ul>)
        }
        {posts.length == 0 && (
            <div style={{ textAlign: 'center', color: 'white' }}>
                <h2>There are no posts yet!</h2>
                <p>Try adding some.</p>
            </div>
        )}
    </>);
}

export default PostsList;