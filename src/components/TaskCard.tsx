import React, { useRef, useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Task } from "../type";
import EditTaskCard from "./EditTaskCard";

type Props = {
    card: Task
    id: number
    cardIndex: number
    handleDeleteCard: (index: number) => void
    handleSave: (index: number, content: string) => void
}

const TaskCard: React.FC<Props> = ({ card, id, cardIndex, handleDeleteCard, handleSave }) => {
    const [hidden, setHidden] = useState(false)
    const [edit, setEdit] = useState(false)
    const toggleContainer = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>

    const onPen = () => {
        setEdit(!edit);
        setHidden(false);
    }

    const onSave = (id: number, text: string) => {
        handleSave(id, text);
        setEdit(!edit);
    }

    let Carded;
    if (edit) {
        Carded =
            <div ref={toggleContainer}>
                <EditTaskCard content={card.content} handleDeleteCard={handleDeleteCard} handleSave={onSave} id={id} />
            </div>

    } else {
        Carded =
            <Draggable draggableId={String(id)} index={cardIndex} >
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="bg-slate-500  rounded-md p-3 my-2 flex"
                            onMouseEnter={() => setHidden(true)}
                            onMouseLeave={() => setHidden(false)}
                        >
                            {card.content}
                            {hidden &&
                                <div className="pen ml-auto" >
                                    <i className="fas fa-pen" onClick={onPen}></i>
                                </div>
                            }
                        </div>
                    </div>
                )}
            </Draggable>
    }

    return (
        <div>
            {Carded}
        </div>
    )
}

export default TaskCard;