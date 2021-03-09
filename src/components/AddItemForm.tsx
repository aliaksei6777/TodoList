import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm (props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
            setTitle("")} else {
            setError("Title is required!")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}