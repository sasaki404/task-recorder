import { useState } from "react"

type Props = {
    content: string
    handleDeleteCard: (index: number) => void
    handleSave: (index: number, content: string) => void
    id: number
}
const EditTaskCard: React.FC<Props> = ({ content, handleDeleteCard, handleSave, id }) => {
    const [text, setText] = useState(content)

    const Input = (e: any) => {
        setText(e.target.value)
    }

    return (
        <div className="bg-slate-500 px-3 py-2 flex">
            <input type="text" className="text-black" value={text} onChange={Input} autoFocus={true} />
            <div className="ml-3">
                <button className="bg-pink-600 rounded-lg px-5 mb-2" onClick={() => handleSave(id, text)}>Save</button>
                <button className="bg-stone-700 rounded-lg px-3 mr-15" onClick={() => handleDeleteCard(id)}>Delete</button>
            </div>
        </div>
    )
}

export default EditTaskCard