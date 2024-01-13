import React, { useEffect, useRef, useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Task } from "../type";
import EditTaskCard from "./EditTaskCard";

type Props = {
    card: Task
    id: number
    cardIndex: number
    time: number
    handleDeleteCard: (index: number) => void
    handleSave: (index: number, content: string) => void
}

const TaskCard: React.FC<Props> = ({ card, id, cardIndex, handleDeleteCard, handleSave }) => {
    const [edit, setEdit] = useState(false);
    const [pen, setPen] = useState(false);
    const [isTimerPlaying, setIsTimerPlaying] = useState(false);
    const toggleContainer = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('click', onClick);
        }
    });

    const onPen = () => {
        setEdit(!edit);
        setPen(true);
    }

    const onPlay = () => {
        setIsTimerPlaying(!isTimerPlaying);
    }

    const onSave = (id: number, text: string) => {
        handleSave(id, text);
        setEdit(!edit);
    }

    const onClick = (e: any) => {
        console.log(pen);
        if (!pen && !toggleContainer.current.contains(e.target)) {
            setEdit(false);
        } else if (pen && edit) {
            setPen(false);
        }
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
                        >
                            {card.content}
                            <div className="flex ml-auto">
                                {!isTimerPlaying ? (
                                    <div>
                                        <i className="fas fa-play" onClick={onPlay}></i>
                                    </div>
                                ) : (
                                    <div>
                                        <i className="fas fa-pause" onClick={onPlay}></i>
                                    </div>
                                )}
                                <div className="ml-3" ref={toggleContainer}>
                                    <i className="fas fa-pen" onClick={onPen}></i>
                                </div>
                            </div>
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