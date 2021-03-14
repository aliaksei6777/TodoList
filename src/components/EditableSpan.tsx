import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}


export function EditableSpan (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditModee = () => setEditMode(true)
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
        : <span onDoubleClick={onEditModee}>{props.title}</span>
    )
}