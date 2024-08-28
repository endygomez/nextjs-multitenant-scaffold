"use client";

import React, { useState, FormEvent } from "react";

interface ErrorData {
  error: string;
}

interface TenantResponse {
  name: string;
  subdomain: string;
}

export default function Home() {
  const [name, setName] = useState<string>("");
  const [subdomain, setSubdomain] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/create-tenant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, subdomain }),
      });

      if (response.ok) {
        const data: TenantResponse = await response.json();
        setMessage(
          `Tenant created successfully: ${data.name} (${data.subdomain})`
        );

        setName("");
        setSubdomain("");
      } else {
        const errorData: ErrorData = await response.json();
        setError(errorData.error || "Failed to create tenant");
      }
    } catch {
      setError("An error occurred while creating the tenant");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a VENDISY 👋🏼</h1>
      <p className="text-md mb-8">Vender nunca fue tan fácil</p>
      <p className="text-xl mb-8">Crea tu cuenta para iniciar.</p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tenant Name"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="Subdomain"
            required
          />
        </div>
        <button type="submit" className="w-full">
          Crear Tenant
        </button>
        <a type="button" className="w-full" href="/">
          Iniciar Sesión
        </a>
      </form>

      {message && (
        <div className="mt-4">
          <h2>Success</h2>
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
