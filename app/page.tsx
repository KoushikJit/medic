"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Bot, DoorClosedIcon, Settings } from "lucide-react";
import SideComponent from "@/components/sidecomponent";
import { ModeToggle } from "@/components/modetoggle";
import ChatComponent from "@/components/chatcomponent";
import { useState } from "react";
import { useChat } from "ai/react";

export function Home() {
  const [reportData, setreportData] = useState("");
  function onReportConfirmation(data: string): void {
    setreportData(data);
  }

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Bot className="size-5 fill-slate-300" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <ModeToggle></ModeToggle>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold text-destructive dark:text-destructive-foreground">
            Medic
          </h1>
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
}

export default Home;
