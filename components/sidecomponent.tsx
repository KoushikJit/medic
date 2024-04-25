import { Rabbit, Bird, Turtle } from "lucide-react";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";

type Props = {
  onReportConfirmation: (data: string) => void;
};

const SideComponent = ({ onReportConfirmation }: Props) => {
  const [reportData, setreportData] = useState("");
  const [imageBase64, setImageBase64] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  async function extractDetails(): Promise<void> {
    if (!imageBase64) {
      toast("No file selected!");
      return;
    }
    setIsLoading(true);
    const response = await axios.post("api/report", {
      base64: imageBase64,
    });
    if ((response.statusText = "OK")) {
      setreportData(response.data.choices[0].message.content);
      // console.log(response.data)
      // const json = JSON.parse(response.data)
      // setreportData(json.summary);
    }
    setIsLoading(false);
  }

  async function handleImageSelection(
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="grid w-full items-start gap-6">
      <fieldset className="relative grid gap-6 rounded-lg border p-4">
        {isLoading && (
          <div
            id="loader"
            className="absolute z-10 h-full w-full rounded-lg bg-card/90 flex flex-row items-center justify-center"
          >
            extracting...
          </div>
        )}
        <legend className="-ml-1 px-1 text-sm font-medium">Report</legend>
        <div className="grid gap-3">
          <Input type="file" accept="image/*" onChange={handleImageSelection} />
          <Button onClick={extractDetails}>1. Upload File</Button>
        </div>
        <div className="grid gap-3">
          <Label>Report Summary</Label>
          <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Textarea
              value={reportData}
              onChange={(e) => {
                setreportData(e.target.value);
              }}
              placeholder="Extracted data from the report will appear here. Get better recommendations by providing additional patient history and symptoms..."
              className="min-h-72 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button
            variant={"destructive"}
            className="bg-[#D90013]"
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
