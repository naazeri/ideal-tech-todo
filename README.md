# Todo App

A simple and modern Todo application built with **React**, **Redux Toolkit**, **TypeScript**, and **Material-UI**. This app allows users to manage their daily tasks effectively with features like filtering, task categorization, and modals for task details and creation.

## Features

- **Task Management**:
  - Add new tasks.
  - View and update task details.
  - Mark tasks as completed.
- **Filters**:
  - Filter tasks by status: `All`, `Open`, `Closed`, and `Archived`.
  - Categorize tasks by date (Today or Tomorrow).
- **Modals**:
  - Task Details Modal to view and edit task details.
  - New Task Modal to add new tasks.
- **Snackbar Notifications**:
  - Show success or error messages based on task actions.
- **Responsive UI**:
  - Built with Material-UI for a clean and responsive design.

## Technologies Used

- **Frontend**:

  - React (with hooks)
  - Redux Toolkit for state management
  - TypeScript for static typing
  - Material-UI (MUI) for UI components
  - Date-fns for date operations

- **Backend API** (Mocked for demonstration):
  - Fetch tasks using `useFetchTodosQuery`.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/naazeri/ideal-tech-todo
   cd ideal-tech-todo
   ```

2. Install dependencies:

   ```bash
      npm i
      # or
      yarn i
      # or
      pnpm i
   ```

3. Start the development server:

   ```bash
      npm run dev
      # or
      yarn dev
      # or
      pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to Use

1. **Add a Task**:

   - Click on the `+` button to open the New Task Modal and add a task.

2. **View and Update Tasks**:

   - Click on any task to view details or mark it as completed.

3. **Filter Tasks**:

   - Use filter chips to view tasks by `All`, `Open`, `Closed`, or `Archived` status.

4. **Switch Date**:
   - Switch between Today and Tomorrow tabs to manage tasks for different days.

## Customization

- **Theme**:
  - Modify the `theme.ts` file in the `theme` directory to customize the app's appearance.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for React framework.
- [Material-UI](https://mui.com/) for UI components.
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management.
- [Date-fns](https://date-fns.org/) for date manipulation.
