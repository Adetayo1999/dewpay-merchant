# Redux Store & RTK Query Setup

This directory contains the Redux store configuration and RTK Query API setup for the merchant dashboard.

## Structure

```
src/store/
├── index.ts              # Main store configuration
├── hooks.ts              # Typed Redux hooks
├── api/
│   └── merchantApi.ts    # RTK Query API slice
├── slices/
│   ├── authSlice.ts      # Authentication state
│   └── uiSlice.ts        # UI state (modals, notifications, etc.)
└── README.md             # This file
```

## Features

### 🚀 RTK Query API

- **Automatic caching** - Data is cached and shared across components
- **Background refetching** - Keeps data fresh automatically
- **Optimistic updates** - UI updates immediately while API call happens
- **Request deduplication** - Multiple components can request same data
- **TypeScript support** - Full type safety for API responses

### 🔐 Authentication

- Token management with localStorage
- Automatic token injection in API requests
- Login/logout state management

### 🎨 UI State Management

- Sidebar open/close state
- Modal management
- Notification system
- Theme switching
- Loading states

## Usage Examples

### Using RTK Query Hooks

```tsx
import { useGetDashboardMetricsQuery } from "../store/api/merchantApi";

const Dashboard = () => {
  const { data, isLoading, error, refetch } = useGetDashboardMetricsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Revenue: ₦{data?.totalRevenue}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

### Using Redux State

```tsx
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { toggleSidebar, addNotification } from "../store/slices/uiSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header>
      <button onClick={() => dispatch(toggleSidebar())}>Toggle Sidebar</button>
      <span>Welcome, {user?.firstName}</span>
    </header>
  );
};
```

### Mutations (Creating/Updating Data)

```tsx
import { useCreateUserMutation } from "../store/api/merchantApi";

const CreateUserForm = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSubmit = async (userData) => {
    try {
      await createUser(userData).unwrap();
      // Success! Cache is automatically updated
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
};
```

## Available API Endpoints

### Authentication

- `useLoginMutation()` - Login with email/password

### Dashboard

- `useGetDashboardMetricsQuery()` - Get dashboard metrics

### Users

- `useGetUsersQuery()` - Get all users
- `useCreateUserMutation()` - Create new user
- `useUpdateUserMutation()` - Update user

### Transactions

- `useGetTransactionsQuery()` - Get transactions with pagination
- `useGetTransactionByIdQuery()` - Get single transaction

### Compliance

- `useGetComplianceDataQuery()` - Get compliance data
- `useUpdateComplianceDataMutation()` - Update compliance data
- `useUploadDocumentMutation()` - Upload compliance documents

## Environment Variables

Set your API base URL in `.env`:

```env
VITE_API_BASE_URL=https://api.dewpay.net
```

## Best Practices

1. **Use typed hooks** - Always use `useAppSelector` and `useAppDispatch`
2. **Handle loading states** - Show loading indicators for better UX
3. **Error handling** - Always handle API errors gracefully
4. **Cache invalidation** - Use `invalidatesTags` for automatic cache updates
5. **Optimistic updates** - Update UI immediately for better perceived performance

## DevTools

Redux DevTools are enabled in development mode. You can:

- Inspect state changes
- Time-travel debugging
- Monitor API calls and cache
- Dispatch actions manually

## Adding New Endpoints

To add a new API endpoint:

1. Add the endpoint to `merchantApi.ts`
2. Export the generated hook
3. Use the hook in your components

Example:

```tsx
// In merchantApi.ts
getUserProfile: builder.query<User, void>({
  query: () => '/user/profile',
  providesTags: ['User'],
}),

// Export the hook
export const { useGetUserProfileQuery } = merchantApi;

// Use in component
const { data: profile } = useGetUserProfileQuery();
```
