'use client';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';
import { Task, TaskColumn as ITaskColumn } from '@/types/tasks';

interface TaskBoardProps {
    columns: ITaskColumn[];
    setColumns: (cols: ITaskColumn[]) => void;
    onTaskClick: (task: Task) => void;
}

export default function TaskBoard({ columns, setColumns, onTaskClick }: TaskBoardProps) {

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceColIndex = columns.findIndex(col => col.id === source.droppableId);
        const destColIndex = columns.findIndex(col => col.id === destination.droppableId);

        const sourceCol = columns[sourceColIndex];
        const destCol = columns[destColIndex];

        // Move in same column
        if (sourceCol.id === destCol.id) {
            const newTasks = Array.from(sourceCol.tasks);
            const [movedTask] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, movedTask);

            const newCol = { ...sourceCol, tasks: newTasks };
            const newColumns = [...columns];
            newColumns[sourceColIndex] = newCol;

            setColumns(newColumns);
            return;
        }

        // Move to different column
        const sourceTasks = Array.from(sourceCol.tasks);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        // Update task status
        const updatedTask = { ...movedTask, status: destCol.id };

        const destTasks = Array.from(destCol.tasks);
        destTasks.splice(destination.index, 0, updatedTask);

        const newSourceCol = { ...sourceCol, tasks: sourceTasks };
        const newDestCol = { ...destCol, tasks: destTasks };

        const newColumns = [...columns];
        newColumns[sourceColIndex] = newSourceCol;
        newColumns[destColIndex] = newDestCol;

        setColumns(newColumns);
    };

    if (columns.length === 0) {
        return <div className="p-10 text-center text-gray-400">Loading Board...</div>;
    }

    return (
        <div className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex h-full gap-6 px-1 pb-4 min-w-max">
                    {columns.map(col => (
                        <TaskColumn
                            key={col.id}
                            column={col}
                            onTaskClick={onTaskClick}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
