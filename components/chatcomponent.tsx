import React, { ChangeEvent, FormEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";
import { Badge } from "./ui/badge";
import { useChat } from "ai/react";
import { ChatRequestOptions } from "ai";
import Messages from "./messages";

type Props = {
  reportData?: string;
};

const ChatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "api/chat",
    });

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 gap-4">
      <Badge variant="outline" className="absolute right-3 top-1.5">
        Output
      </Badge>
      <div className="flex-1" />
      <Messages messages={messages} isLoading={isLoading} />
      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              reportData: reportData as string,
            },
          });
        }}
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            3. Ask
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
