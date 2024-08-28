"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { login, registerUser } from "@/actions";
import { useSearchParams } from "next/navigation";

type FormInputs = {
  workspace: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const params = useSearchParams();
  const subdomain = params.get("subdomain");
  console.log(subdomain);
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Server action
    const { email, password } = data;
    const resp = await registerUser(email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    console.log({ resp });
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* {errors.name?.type === "required" && (
        <span className="text-red-500">* El nombre es obligatorio</span>
      )} */}
      <label htmlFor="workspace">Nombre del Espacio de Trabajo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.workspace,
        })}
        type="text"
        value={subdomain!}
        {...register("workspace", { required: true })}
      />
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        autoFocus
        value={""}
        autoComplete="off"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        autoComplete="off"
        value={""}
        {...register("password", { required: true, minLength: 8 })}
      />

      <span className="text-red-500">{errorMessage}</span>
      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

export default RegisterForm;
