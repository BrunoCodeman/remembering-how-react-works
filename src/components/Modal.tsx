import styles from './Modal.module.css';

const Modal = (props: any) =>{
    return(<>
    <div className={styles.backdrop} onClick={props.onClose}/>
    <dialog open className={styles.modal}>{props.children}</dialog>
    </>);
}
export default Modal;