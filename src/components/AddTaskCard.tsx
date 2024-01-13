import React, { useState } from "react";

type Props = {
    handleChangeAdd: () => void
    handleAddTaskCard: (text: string) => void
}
const AddTaskCard: React.FC<Props> = ({ handleChangeAdd, handleAddTaskCard }) => {
    const [text, setText] = useState("")

    const onChange = (e: any) => {
        setText(e.target.value)
    }

    return (
        <div className="bg-slate-500 px-3 py-2 flex rounded-md">
            <div className="relative w-full min-w-[185px] h-10">
                <input type="text" className="text-center text-black px-auto h-10" autoFocus={true} value={text} onChange={onChange} />
            </div>
            <div className="text">
                <button className="bg-pink-600 rounded-lg px-5 mb-2" onClick={() => handleAddTaskCard(text)}>Add</button>
                <button className="bg-stone-700 rounded-lg px-3 mr-15" onClick={() => handleChangeAdd()}>Cancel</button>
            </div>
        </div>
    )
}

export default AddTaskCard