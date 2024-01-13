import React, { useState, useRef } from 'react';
import { useSetRecoilState } from "recoil";
import { TaskColumnsState } from '../atom';

type Props = {
    handleChangeOpen: () => void
}

const AddTaskColumn: React.FC<Props> = ({ handleChangeOpen }) => {
    const setColumns = useSetRecoilState(TaskColumnsState)
    const [title, setTitle] = useState<string>("")
    const toggleContainer = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const AddList = () => {
        if (title === "") {
            alert("Column's name must have more than 1 characters.");
        } else {
            setColumns(prevState => [...prevState, { title: title, taskIds: [] }]);
            handleChangeOpen();
        }
    }

    return (
        <div className="bg-black pt-5 rounded ml-2 mt-2 px-1 pb-1 h-fit" ref={toggleContainer}>
            <input type="text" className="text-black" value={title} onChange={onChange} placeholder="Column's name" />
            <div className="button flex ml-2 mx-auto">
                <button className='pl-10' onClick={AddList}><div className="bg-blue-500 rounded-md px-2 mt-2"><i className="fas fa-plus"></i></div></button>
                <i className="fas fa-2x fa-times ml-5 mt-2" onClick={() => handleChangeOpen()}></i>
            </div>
        </div>
    )
}

export default AddTaskColumn