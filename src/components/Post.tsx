import styles from './Post.module.css';

function Post(props:any) {
    
    return (
    <div className={styles.post}>
        <p className={styles.author}>{props.author}</p>
        <p className={styles.text}>{props.text}</p>
    </div>)
}

export default Post;