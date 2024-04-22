"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "sonner";
import {
  Bot,
  CircleAlert,
  CircleAlertIcon,
  DoorClosedIcon,
  FileCheck2,
  LucideCircleAlert,
  OctagonAlert,
  Settings,
  TriangleAlert,
} from "lucide-react";
import SideComponent from "@/components/sidecomponent";
import { ModeToggle } from "@/components/modetoggle";
import ChatComponent from "@/components/chatcomponent";
import { useState } from "react";
import { useChat } from "ai/react";

const Home = () => {
  const [reportData, setreportData] = useState("");
  function onReportConfirmation(data: string): void {
    setreportData(data);
    toast('Updated!');
  }

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold text-destructive dark:text-destructive-foreground">
            Medic
          </h1>
          <div className="relative w-full flex flex-row justify-end">
            <ModeToggle />
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <SideComponent onReportConfirmation={onReportConfirmation} />
            </DrawerContent>
          </Drawer>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <SideComponent onReportConfirmation={onReportConfirmation} />
          </div>
          <ChatComponent reportData={reportData} />
        </main>
      </div>
    </div>
  );
};

export default Home;
