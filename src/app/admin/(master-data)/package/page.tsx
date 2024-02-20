"use client";
import Modal from "@/components/Modal";
import PackageList from "@/components/PackageList";
import React from "react";

export default function page() {
  return (
    <Modal>
      <PackageList />
    </Modal>
  );
}
