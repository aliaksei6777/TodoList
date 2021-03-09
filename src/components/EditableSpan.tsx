import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}


export function EditableSpan (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
        ? <input value={title}
                 autoFocus
                 onChange={changeTitle}
                 onKeyPress={e => {if(e.key === "Enter"){offEditMode()}}}
                 onBlur={offEditMode}
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}