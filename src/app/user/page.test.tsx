import "isomorphic-fetch";
import React from "react";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@root/libs/utils/test-utils";
import UsersList from "./page";
import "@testing-library/jest-dom";
import { setupStore } from "@root/libs/redux/store";
import axios from "axios";
import usersSlice, {
  deleteUser,
  fetchUsers,
} from "@root/libs/redux/reducers/usersSlice";
// We're using our own custom render function and not RTL's render.

export const handlers = [
  http.get("/api/user", async (res) => {
    await delay(200);
    return HttpResponse.json(res);
  }),
];

const server = setupServer(...handlers);
const store = setupStore();

// Enable API mocking before tests.
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("User List Page", () => {
  it("renders loading message when loading", async () => {
    renderWithProviders(<UsersList />);

    // Simulate waiting for API response
    await screen.findByText("Loading...");

    // Verify loading message is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders users list after loading", async () => {
    // Add a request handler for fetching users
    await store.dispatch(fetchUsers());

    renderWithProviders(<UsersList />, { store });

    // Simulate waiting for API response
    screen.findByText("Leanne Graham");

    // Verify users list is rendered
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  });
});
