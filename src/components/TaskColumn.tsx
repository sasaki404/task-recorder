import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task, TaskColumn as TaskColumnType } from "../type"
import { useEffect, useRef, useState } from "react";
import { TaskColumnsState, TaskIndex, TasksState } from "../atom";
import { useRecoilState } from "recoil";
import TaskColumnHeader from "./TaskColumnHeader";
import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskCard";


type Props = {
  taskColumn: TaskColumnType
  taskColumnIndex: number
  tasks: Task[]
}

const TaskColumn: React.FC<Props> = ({ taskColumn, taskColumnIndex, tasks }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [taskIndex, setTaskIndex] = useRecoilState(TaskIndex);
  const [columns, setColumns] = useRecoilState(TaskColumnsState);
  const [taskList, setTaskList] = useRecoilState(TasksState);
  const kebabuContainer = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    window.addEventListener('click', onClickOutsideKebabuHandler);
    return () => {
      window.removeEventListener('click', onClickOutsideKebabuHandler);
    }
  })

  const onClickOutsideKebabuHandler = (e: any) => {
    if (isOpenMenu && !kebabuContainer.current.contains(e.target)) {
      // ケバブメニューの外をクリックしたとき
      //setIsOpenMenu(false);
    }
  }

  const handleChangeAdd = () => {
    setIsAdd(!isAdd);
  }

  const handleAddTaskCard = (text: string) => {
    if (text === "") {
      alert("Task name must have more than 1 characters.");
    } else {
      const task = { id: taskIndex, content: text, time: 0 };
      const cols = JSON.parse(JSON.stringify(columns));
      cols[taskColumnIndex].taskIds.push(taskIndex);
      setColumns(cols);
      setTaskList(prevState => [...prevState, task]);
      setTaskIndex(taskIndex + 1);
      setIsAdd(false);
    }
  }

  const handleDeleteTaskCard = (id: number) => {
    const cols = JSON.parse(JSON.stringify(columns));
    const newTaskIds = cols[taskColumnIndex].taskIds.filter((i: number) => i !== id);
    cols[taskColumnIndex].taskIds = newTaskIds;
    setColumns(cols);

    const tasks = JSON.parse(JSON.stringify(taskList));
    const newtasks = tasks.filter((i: { id: number, content: string, time: number }) => i.id !== id);
    setTaskList(newtasks);
  }

  const handleSave = (id: number, text: string, time: number = -1) => {
    const tasks = JSON.parse(JSON.stringify(taskList));
    const index = taskList.findIndex(i => i.id === id);
    tasks[index].content = text;
    if (time != -1 && !Number.isNaN(time)) {
      tasks[index].time = time;
    }
    setTaskList(tasks);
  }

  const handleChangeTitle = (text: string, index: number) => {
    const cols = JSON.parse(JSON.stringify(columns));
    cols[index].title = text;
    setColumns(cols);
  }

  const handleChangeMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  }


  return (
    <Draggable key={taskColumnIndex} draggableId={"task-column-" + taskColumnIndex} index={taskColumnIndex}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="task-column" // flex-none
        >
          <div
            {...provided.dragHandleProps}
            className="justify-between flex"
          >
            {!isOpenMenu &&
              <h3>{taskColumn.title}</h3>
            }
            <div className="flex" ref={kebabuContainer}>
              {isOpenMenu && <TaskColumnHeader index={taskColumnIndex} title={taskColumn.title} handleChangeTitle={handleChangeTitle} handleChangeMenu={handleChangeMenu} />}
              <div className="ml-2" onClick={handleChangeMenu}>
                <i className="fas fa-ellipsis-v" ></i>
              </div>
            </div>

          </div>
          <Droppable droppableId={String(taskColumnIndex)} type="task">
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((card, index) => {
                  return (
                    <TaskCard
                      card={card}
                      id={card.id}
                      cardIndex={index}
                      time={card.time}
                      key={card.id}
                      handleDeleteCard={handleDeleteTaskCard}
                      handleSave={handleSave}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {isAdd && <AddTaskCard handleChangeAdd={handleChangeAdd} handleAddTaskCard={handleAddTaskCard} />}
          {!isAdd &&
            <div className="mx-auto mt-4 h-10 bg-blue-500 w-fit  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChangeAdd}>
              <i className="fas fa-plus"></i>
            </div>
          }
        </div>
      )}
    </Draggable>
  );
}

export default TaskColumn;