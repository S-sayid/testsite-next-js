
"use client";

import { FormEvent, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to load users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      setName("");
      setEmail("");

      await loadUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main>
      <h1>TestSite</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit">Add User</button>
      </form>

      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}

