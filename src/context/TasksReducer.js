export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          name: action.name,
          completed: false,
          category: action.category,
        },
      ];
    }
    case 'completed': {
      return tasks.map((task) => {
        if (task.id === action.task.id) {
          return { ...task, completed: !task.completed };
        } else return task;
      });
    }
    case 'changed': {
      return tasks.map((task) => {
        if (task.id === action.task.id) {
          return { ...task, name: action.name, category: { ...task.category, name: action.category.name } };
        } else return task;
      });
    }
    case 'deleted': {
      return tasks.filter((task) => {
        return task.id !== action.task.id;
      });
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
