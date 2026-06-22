"use client";
import { useState, useEffect } from "react";
import { UserButton, SignInButton, useAuth, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (userId) {
      fetch("/api/items").then(res => res.json()).then(setItems);
    }
  }, [userId]);

  const addItem = async () => {
    if (!name) return;
    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify({ name, data: { status: "test" } }),
    });
    setName("");
    const res = await fetch("/api/items");
    setItems(await res.json());
  };

  if (!isLoaded) return <div>Laddar...</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-10">
    <h1 className="text-3xl font-bold text-blue-600">Min SaaS-boilerplate</h1>

    {!userId ? (
      <div className="flex gap-4">
        <SignInButton mode="modal">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            Logga in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
            Registrera dig
          </button>
        </SignUpButton>
      </div>
    ) : (
      <div className="flex items-center gap-4">
        <UserButton />
        <input 
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Namn på item" 
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addItem}
        >
          Lägg till
        </button>
      </div>
    )}
  </div>
  );
}