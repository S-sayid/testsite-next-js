
"use client";

import { FormEvent, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function loadUsers() {
    const response = await fetch("http://localhost:4000/api/users");
    const data = await response.json();
    setUsers(data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");

    await loadUsers();
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

      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.id} — {user.name} — {user.email}
          </p>
        </div>
      ))}
    </main>
  );
}

