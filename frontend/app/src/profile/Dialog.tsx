import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './Profile.module.css';

interface DialogProps {
    title: string;
    onClose: () => void;
    onSave: (value?: string) => void;
    defaultValue?: string;
    isOpen: boolean;
}

const Dialog = (props: DialogProps): JSX.Element => {
    const { title, onClose, onSave, defaultValue, isOpen } = props;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [inputValue, setInputValue] = useState<string | undefined>(defaultValue);

    const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setInputValue(ev.target.value);
    }

    useEffect(() => {
        if (isOpen){
            dialogRef.current?.showModal();
        }
        else {
            dialogRef.current?.close();
        }
    }, [isOpen])

    return (
        <dialog ref={dialogRef}>
            <h2>{title}</h2>
            <input type="text" value={inputValue} onChange={(ev) => handleInputChange(ev)}/>
            <div className={styles.buttons}>
                <button onClick={() => onSave(inputValue)}>Save</button>
                <button className = {styles.cancelButton} onClick={() => onClose()}>Cancel</button>
            </div>
        </dialog>
    );
}

export default Dialog;