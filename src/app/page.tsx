"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { LogIn } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      const response = await createUser({ name: username });
      if (response) {
        localStorage.setItem("user_id", response);
        localStorage.setItem("user_name", username);
        router.push("/chatroom");
      }
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Welcome to Chat App
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
