// usersSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: string | string[]) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: Omit<User, "id">) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      userData
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    id,
    name,
    email,
    phone,
    website,
  }: {
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
  }) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { name, email, phone, website }
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return userId;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch users";
    });
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch user by ID";
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to create user";
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to update user";
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to delete user";
    });
  },
});

export default usersSlice.reducer;
