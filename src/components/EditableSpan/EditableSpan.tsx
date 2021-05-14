import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import {RequestStatusType} from "../../app/app-reducer";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
    entityStatus?: RequestStatusType
}


export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan")
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
            ? <TextField value={title}
                         autoFocus
                         onChange={changeTitle}
                         onKeyPress={e => {if (e.key === "Enter") {offEditMode()}}}
                         onBlur={offEditMode}
                         disabled={props.entityStatus === 'loading'}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
});