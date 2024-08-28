"use client";

import { signOut } from "@/auth.config";
import Logout from "@/components/logout/Logout";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";

export const SideBarRightMenu = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <Logout />
      </Sidebar>
      <Button onClick={() => setVisible(true)}>
        <Avatar icon="pi pi-user" size="normal" shape="circle" />
      </Button>
    </div>
  );
};
