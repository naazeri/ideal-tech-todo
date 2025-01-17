'use client';
import ISnackbar from '../General/ISnackbar';
import TaskTabs from './TaskTabs';
import TaskList from './TaskList';
import NewTaskModal from './Modals/NewTaskModal';
import TaskHeader from './TaskHeader';
import TaskDetailsModal from './Modals/TaskDetailsModal';
import TaskRootContainer from './TaskRootContainer';
import TaskTabContainer from './TaskTabContainer';

const TaskApp = () => {
  return (
    <TaskRootContainer>
      <TaskTabs />
      <TaskTabContainer>
        <TaskHeader />
        <TaskList />
        <TaskDetailsModal />
        <NewTaskModal />
        <ISnackbar />
      </TaskTabContainer>
    </TaskRootContainer>
  );
};

export default TaskApp;
