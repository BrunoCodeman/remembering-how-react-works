import { useState } from 'react';
import styles from './NewPost.module.css';

const initState = () => {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");

  return { enteredAuthor, enteredBody, setEnteredBody, setEnteredAuthor };
}

const buildBehavior = (enteredAuthor: string, enteredBody: string, setEnteredBody: Function,
  setEnteredAuthor: Function, onSubmit: Function, onCancel: Function) => {
  const changeBodyHandler = (event: any) => setEnteredBody(event.target?.value);
  const changeAuthorHandler = (event: any) => setEnteredAuthor(event.target.value);
  const submitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    const postData = {
      text: enteredBody,
      author: enteredAuthor
    };
    onSubmit(postData);
    onCancel();
  }
  return { changeBodyHandler, changeAuthorHandler, submitHandler };

};

function NewPost(props: any) {
  const { enteredAuthor, enteredBody, setEnteredBody, setEnteredAuthor } = initState();
  const { changeBodyHandler, changeAuthorHandler, submitHandler } = buildBehavior(enteredAuthor, enteredBody, setEnteredBody,
    setEnteredAuthor, props.onSubmit, props.onCancel);
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={changeAuthorHandler} />
      </p>
      <p className={styles.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;