"use client";
import { useRef } from "react";
import Header from "./Header";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Header reference={bodyRef}></Header>
      <div ref={bodyRef}>{children}</div>
    </>
  );
}
