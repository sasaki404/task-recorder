import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TaskColumnsState, TasksState } from "./atom";
import { Task, TaskColumn as TaskColumnType } from "./type";
import TaskColumn from "./components/TaskColumn"
import AddTaskColumn from "./components/AddTaskColumn";

const App: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [taskColumns, setTaskColumns] = useRecoilState(TaskColumnsState);
  const taskList = useRecoilValue(TasksState);

  const handleChangeOpen = () => {
    setIsOpenMenu(!isOpenMenu);
    console.log(isOpenMenu);
  }

  const onDragEnd = (result: { destination: any; source?: any; type?: string }) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    const cols = JSON.parse(JSON.stringify(taskColumns));
    if (type === "column") { // カラムがドラッグされたとき
      const newCols = cols.filter((_: any, index: number) => index !== source.index)
      newCols.splice(destination.index, 0, cols[source.index])
      setTaskColumns(newCols)
      return
    }
    const prevCol = taskColumns[source.droppableId];
    const nextCol = taskColumns[destination.droppableId];
    if (source.droppableId !== destination.droppableId) { // タスクカードが別のカラムに移動
      console.log(cols);
      console.log(prevCol);
      console.log(nextCol);
      const prevTaskIds = prevCol.taskIds.filter((_: any, index: number) => index !== source.index);
      const nextTaskIds = [...nextCol.taskIds];
      nextTaskIds.splice(destination.index, 0, prevCol.taskIds[source.index]);
      cols[source.droppableId].taskIds = prevTaskIds;
      cols[destination.droppableId].taskIds = nextTaskIds;
      setTaskColumns(cols);
    } else {
      const newTaskIds = prevCol.taskIds.filter((_: any, index: number) => index !== source.index)
      newTaskIds.splice(destination.index, 0, prevCol.taskIds[source.index])
      cols[source.droppableId].taskIds = newTaskIds
      setTaskColumns(cols);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-task-column" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="flex"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskColumns.map((item: TaskColumnType, index: number) => {
              const tasks: Task[] = []
              item.taskIds.map(id => {
                return (
                  // もっといいやり方があると思う
                  taskList.map(val => {
                    if (id === val.id) {
                      tasks.push(val)
                    }
                  })
                )
              })
              return <TaskColumn taskColumn={item} taskColumnIndex={index} key={index} tasks={tasks} />
            })}
            {provided.placeholder}
            {!isOpenMenu &&
              <div className="ml-4 mt-4 h-10 mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChangeOpen}>
                <i className="fas fa-plus"></i>
              </div>}
            {isOpenMenu && <AddTaskColumn handleChangeOpen={handleChangeOpen} />}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;