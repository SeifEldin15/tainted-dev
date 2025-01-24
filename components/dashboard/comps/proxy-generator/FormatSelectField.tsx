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
          className="w-full justify-between !bg-white dark:!bg-gray-700 !text-gray-600 dark:!text-white hover:!text-gray-600 dark:hover:!text-white border-[#e5e7eb] dark:border-transparent"
        >
          {getCurrentLabel()}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[360px] p-0 border-[#e5e7eb] dark:border-transparent !bg-white dark:!bg-gray-700">
        <Command className="!bg-white dark:!bg-gray-700">
          <CommandInput placeholder="Search ..." className="h-9 !bg-white dark:!bg-gray-700 !text-black dark:!text-white" />
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup className="!bg-white dark:!bg-gray-700">
            <ScrollArea className="h-[300px] !bg-white dark:!bg-gray-700">
              {data.map(({ label, value }: any) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(newValue) => {
                    setValue(newValue);
                    setFieldValue("format", newValue);
                    setOpen(false);
                  }}
                  className="!text-black dark:!text-white hover:!bg-brand hover:!text-white !bg-white dark:!bg-gray-700 cursor-pointer data-[highlighted]:!bg-brand data-[highlighted]:!text-white"
                >
                  <span>{label}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-brand",
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
