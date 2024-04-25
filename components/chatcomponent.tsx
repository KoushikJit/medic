import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2, TextSearch } from "lucide-react";
import { Badge } from "./ui/badge";
import { useChat } from "ai/react";
import { ChatRequestOptions, JSONValue } from "ai";
import Messages from "./messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Markdown from "./markdown";

type Props = {
  reportData?: string;
};

const ChatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: "api/chat",
    });

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 gap-4">
      <Badge
        variant="outline"
        className={`absolute right-3 top-1.5 transition-all ${
          reportData && "bg-[#00B612]"
        }`}
      >
        {reportData ? "✓ Report Added" : "No Report Added"}
      </Badge>
      {/* <div className="whitespace-pre-wrap"></div> */}
      {/* {data && <div>{JSON.stringify((data as JSONValue[])[0])}</div>} */}
      <div className="flex-1" />
      <Messages messages={messages} isLoading={isLoading} />
      {(data?.length !== undefined && data.length > 0) && (
        <Accordion type="single" className="text-sm" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger dir="">
              <span className="flex flex-row items-center gap-2"><TextSearch /> Excerpts</span>
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap">
              {data?.length && data.length > 0
                ? <Markdown text={(data[data.length - 1] as any).finalPrompt as string}/>
                : ""}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
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
        {!reportData && (
          <div
            id="loader"
            className="absolute z-10 h-full w-full rounded-lg bg-card/90 flex flex-row items-center justify-center"
          >
            Please add report data
          </div>
        )}
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            disabled={isLoading}
            type="submit"
            size="sm"
            className="ml-auto gap-1.5"
          >
            3. Ask
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <CornerDownLeft className="size-3.5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
