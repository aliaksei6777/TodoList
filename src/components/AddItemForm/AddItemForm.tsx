import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, ControlPoint} from "@material-ui/icons";
import {RequestStatusType} from "../../app/app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            addItem()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField variant={'outlined'}
                       label={'title'}
                       error={!!error}
                       helperText={error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       disabled={props.entityStatus === 'loading'}
                       />
            <IconButton color={"primary"} onClick={addItem} disabled={props.entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
        </div>
    )
})