import React, { useState } from "react";
import { TaskColumnsState } from "../atom";
import { useSetRecoilState } from "recoil";

type Props = {
    index: number
    title: string
    handleChangeTitle: (text: string, index: number) => void
    handleChangeMenu: () => void
}
const TaskColumnHeader: React.FC<Props> = ({ index, title, handleChangeTitle, handleChangeMenu }) => {
    const setColumns = useSetRecoilState(TaskColumnsState);
    const [text, setText] = useState(title)

    const onInput = (e: any) => {
        setText(e.target.value)
    }

    const handleSave = () => {
        handleChangeTitle(text, index)
        handleChangeMenu()
    }

    const handleRemoveList = (myindex: number) => {
        setColumns(prevState => {
            const newlist = prevState.filter((_, index) => index !== myindex)
            return [...newlist]
        })
    }

    return (
        <>
            <div className="bg-slate-500 px-3 py-2 mb-2 flex rounded-lg">
                <input type="text" className="text-black" value={text} onChange={onInput} autoFocus={true} />
                <div className="ml-3">
                    <button className="bg-pink-600 rounded-lg px-5 mb-2" onClick={() => handleSave()}>Save</button>
                    <button className="bg-stone-700 rounded-lg px-3 mr-15" onClick={() => handleRemoveList(index)}>Delete</button>
                </div>
            </div>
        </>
    )
}
export default TaskColumnHeader;