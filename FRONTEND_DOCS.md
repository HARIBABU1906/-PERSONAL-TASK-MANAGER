# Frontend Documentation

## Overview

The frontend is built with React and Vite, providing a modern, responsive user interface for task management.

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── ProtectedRoute.jsx  # Route protection
│   │   ├── TaskForm.jsx        # Create task form
│   │   ├── TaskItem.jsx        # Individual task display
│   │   └── TaskList.jsx        # Task list container
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   └── Dashboard.jsx       # Main dashboard
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state management
│   │   └── TaskContext.jsx     # Task state management
│   ├── styles/
│   │   ├── global.css          # Global styles
│   │   ├── auth.css            # Auth pages styles
│   │   ├── navbar.css          # Navbar styles
│   │   ├── dashboard.css       # Dashboard styles
│   │   ├── taskForm.css        # Form styles
│   │   ├── taskItem.css        # Task item styles
│   │   └── taskList.css        # Task list styles
│   ├── api.js                  # Axios API client
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── public/
├── vite.config.js
├── package.json
└── index.html
```

## Components

### Navbar Component
- Displays app branding
- Shows logged-in username
- Logout button
- Sticky positioning on scroll
- Responsive design

**Usage:**
```jsx
<Navbar />
```

### AuthContext
- Global authentication state
- User data and token management
- Login/logout functions
- Authentication status tracking

**Usage:**
```jsx
const { user, isAuthenticated, login, logout } = useAuth();
```

### TaskContext
- Global task state management
- Task CRUD operations in state
- Loading and error states
- Task list management

**Usage:**
```jsx
const { tasks, addTask, removeTask, updateTaskInState } = useTask();
```

### ProtectedRoute Component
- Wraps routes requiring authentication
- Redirects to login if not authenticated
- Shows loader while checking auth status

**Usage:**
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### TaskForm Component
- Create new tasks
- Form validation
- Priority and due date selection
- Error messages
- Loading state

**Fields:**
- Title (required)
- Description (optional)
- Priority (low, medium, high)
- Due Date (optional)

### TaskItem Component
- Display individual task
- Edit inline
- Delete task
- Change task status
- Display priority and dates

**Features:**
- Inline editing
- Status dropdown
- Priority badge
- Delete confirmation

### TaskList Component
- Display all tasks
- Task statistics
- Filter by status (in code)
- Empty state message
- Loading state

**Statistics Shown:**
- Total tasks
- Pending tasks
- In-progress tasks
- Completed tasks

### Login Page
- Email and password input
- Form validation
- Error messages
- Link to registration
- Responsive design

**Features:**
- Remember login on successful auth
- Redirect to dashboard after login
- Show loading state

### Register Page
- Username, email, password input
- Password confirmation
- Form validation
- Error messages
- Link to login

**Features:**
- Validate matching passwords
- Check for duplicate accounts
- Redirect to dashboard after registration

### Dashboard Page
- Task form (sidebar)
- Task list (main area)
- Responsive layout
- Statistics display

## State Management

### Auth Context State
```jsx
{
  user: { id, username, email },
  token: string,
  isAuthenticated: boolean,
  loading: boolean,
  login(userData, token): void,
  logout(): void
}
```

### Task Context State
```jsx
{
  tasks: Array<Task>,
  loading: boolean,
  error: string,
  addTask(task): void,
  removeTask(id): void,
  updateTaskInState(id, task): void,
  setAllTasks(tasks): void,
  setLoading(bool): void,
  setError(error): void
}
```

## API Integration

### Axios Instance
- Base URL: `http://localhost:5000/api`
- Automatic token injection in Authorization header
- Proxy configuration for development

### API Functions

**Auth API:**
```jsx
authAPI.register(data)     // POST /auth/register
authAPI.login(data)        // POST /auth/login
```

**Task API:**
```jsx
taskAPI.getTasks()         // GET /tasks
taskAPI.createTask(data)   // POST /tasks
taskAPI.updateTask(id, data) // PUT /tasks/:id
taskAPI.deleteTask(id)     // DELETE /tasks/:id
```

## Styling

### Global Styles
- Gradient background
- Color scheme (purple gradient)
- Typography
- Button styles
- Form styles
- Utilities (alerts, loaders)

### Color Palette
- Primary: `#667eea`
- Secondary: `#764ba2`
- Success: `#10b981`
- Danger: `#ef4444`
- Warning: `#f59e0b`

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: < 768px
- Desktop: 768px+

## Routing

```
/                  → /dashboard
/login            → Login page
/register         → Registration page
/dashboard        → Main dashboard (protected)
```

## User Flow

1. User visits app → redirected to dashboard
2. If not logged in → redirected to login
3. User clicks "Register" → registration form
4. User fills form → creates account and auto-login
5. Redirected to dashboard → TaskList and TaskForm
6. User can create/edit/delete tasks
7. User clicks logout → returns to login page

## Features Implementation

### Task Creation
1. User fills TaskForm
2. Form validates input
3. API call to create task
4. Task added to context state
5. Form cleared for next task

### Task Update
1. User clicks edit on TaskItem
2. Inline editing mode activated
3. User modifies task
4. API call to update
5. Task updated in context state
6. Edit mode closed

### Task Status Change
1. User selects status from dropdown
2. API call to update status
3. Task updated in state
4. UI reflects new status

### Task Deletion
1. User clicks delete
2. Confirmation dialog shown
3. API call to delete
4. Task removed from state
5. UI updated

## Error Handling

- Try-catch blocks in API calls
- Error messages displayed to user
- Validation feedback in forms
- Network error handling
- 404 and 401 error handling

## Performance Optimizations

- Component lazy loading
- Efficient state updates
- Event debouncing (if needed)
- Optimized re-renders
- CSS animations for smoothness

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2"
}
```

## Development Dependencies

```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8"
}
```

## Build and Deployment

### Development
```bash
npm run dev      # Start Vite dev server on :3000
```

### Production Build
```bash
npm run build    # Create optimized build in dist/
npm run preview  # Preview production build
```

### Deployment
- Deploy `dist/` folder to hosting
- Update API URL in `src/api.js`
- Ensure backend is accessible

## Best Practices

1. **Component Structure**
   - Small, focused components
   - Reusable components
   - Proper prop drilling avoided with Context

2. **State Management**
   - Context API for global state
   - Local state for component-specific data
   - Separation of concerns

3. **Error Handling**
   - User-friendly error messages
   - Fallback UI
   - Loading states

4. **Performance**
   - Efficient re-renders
   - Memoization where needed
   - Lazy loading routes

5. **Accessibility**
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
