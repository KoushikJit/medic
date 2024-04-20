import { Rabbit, Bird, Turtle } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import SocialMediaLinks from "./social-links";

type Props = {
  onReportConfirmation: (data: string) => void;
};

const SideComponent = ({ onReportConfirmation }: Props) => {
  const [reportData, setreportData] = useState("");
  return (
    <div className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Report</legend>
        <div className="grid gap-3">
          <Input type="file" />
          <Button>1. Upload File</Button>
        </div>
        <div className="grid gap-3">
          <Label>Detected Data</Label>
          <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Textarea
              value={reportData}
              onChange={(e) => {
                setreportData(e.target.value);
              }}
              placeholder="Data from the report will appear here..."
              className="min-h-40 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button
            variant={"destructive"}
            onClick={() => {
              onReportConfirmation(reportData);
            }}
          >
            2. Looks Good
          </Button>
        </div>
      </fieldset>
      <div className="flex flex-row items-center justify-center gap-2 p-4 w-full h-full">
        <Label>Share your thoughts </Label>
        <SocialMediaLinks />
      </div>
    </div>
  );
};

export default SideComponent;
