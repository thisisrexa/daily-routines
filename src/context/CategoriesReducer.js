export default function categoriesReducer(categories, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...categories,
        {
          id: action.id,
          name: action.name,
        },
      ];
    }
    case 'changed': {
      return categories.map((category) => {
        if (category.id === action.category.id) {
          return { ...category, name: action.name };
        } else return category;
      });
    }
    case 'deleted': {
      return categories.filter((category) => {
        return category.id !== action.category.id;
      });
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
