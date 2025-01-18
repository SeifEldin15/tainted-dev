"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  {
    label: "hostname:port:username:password",
    value: "hostname:port:username:password",
  },
  {
    label: "username:password@hostname:port",
    value: "username:password@hostname:port",
  },
  {
    label: "username:password:hostname:port",
    value: "username:password:hostname:port",
  },
];

export function FormatSelectField({
  defaultSelectText = "Select ...",
  FieldValue,
  setFieldValue,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [Currentvalue, setValue] = React.useState("");

  // Find the label for the current value
  const getCurrentLabel = () => {
    const currentFormat = data.find(item => item.value === FieldValue);
    return currentFormat?.label || defaultSelectText;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:!bg-[#ffffff] hover:!text-gray-600 text-gray-600 border-gray-200"
        >
          {getCurrentLabel()}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[360px] p-0 border-gray-200 bg-white">
        <Command className="bg-white !bg-white">
          <CommandInput placeholder="Search ..." className="h-9" />
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup className="bg-white !bg-white">
            <ScrollArea className="h-[300px] bg-white">
              {data.map(({ label, value }: any) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(newValue) => {
                    setValue(newValue);
                    setFieldValue("format", newValue);
                    setOpen(false);
                  }}
                  className="!bg-white !text-black hover:!bg-[#00D4E1] hover:!text-white data-[highlighted]:!bg-[#00D4E1] data-[highlighted]:!text-white cursor-pointer"
                >
                  <span>{label}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[#00D4E1]",
                      FieldValue === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
