import React, { useEffect, useRef, useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Task } from "../type";
import EditTaskCard from "./EditTaskCard";
import Timer from "./Timer";

type Props = {
    card: Task
    id: number
    cardIndex: number
    time: number
    handleDeleteCard: (index: number) => void
    handleSave: (index: number, content: string, time: number) => void
}

const TaskCard: React.FC<Props> = ({ card, id, cardIndex, handleDeleteCard, handleSave }) => {
    const [edit, setEdit] = useState(false);
    const [pen, setPen] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [time, setTime] = useState(card.time);
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
        if (isTimerRunning) {
            onSave(id, card.content, time);
        }
        setIsTimerRunning(!isTimerRunning);
    }

    const onSave = (id: number, text: string, time: number) => {
        handleSave(id, text, time);
        setEdit(!edit);
    }

    const onClick = (e: any) => {
        console.log(pen);
        if (!pen && !toggleContainer.current.contains(e.target)) {
            setEdit(false);
        } else if (pen && edit) {
            setPen(false);
        }
        if (isTimerRunning) {
            handleSave(id, card.content, time);
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
                            {(isTimerRunning || time != 0)
                                &&
                                <Timer isRun={isTimerRunning} time={time} startDate={new Date()} setTime={setTime} />}
                            <div className="flex ml-auto">
                                {!isTimerRunning ? (
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