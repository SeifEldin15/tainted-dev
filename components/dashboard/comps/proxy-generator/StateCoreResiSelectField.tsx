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

export function StateSelectField({
  defaultSelectText = "Select ...",
  fieldData,
  FieldValue,
  setFieldValue,
  setCities,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [Currentvalue, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:!bg-[#ffffff] hover:!text-gray-600 text-gray-600 border-gray-200"
        >
          {FieldValue || defaultSelectText}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[360px] p-0 border-gray-200 bg-white">
        <Command className="bg-white !bg-white">
          <CommandInput placeholder="Search ..." className="h-9" />
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup className="bg-white !bg-white">
            <ScrollArea className="h-[300px] bg-white">
              {filterData(fieldData).map(({ label, value }: any) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(newValue) => {
                    setValue(newValue);
                    value == "random"
                      ? setFieldValue("state", "")
                      : setFieldValue("state", value);
                    const cities =
                      fieldData?.options?.find(
                        (city: { code: string }) => city.code === newValue
                      )?.cities || [];
                    setCities(cities);
                    setOpen(false);
                  }}
                  className="!bg-white !text-black hover:!bg-[#00D4E1] hover:!text-white data-[highlighted]:!bg-[#00D4E1] data-[highlighted]:!text-white cursor-pointer"
                >
                  <span>{label}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      Currentvalue == value ? "opacity-100" : "opacity-0"
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

function filterData(data: any) {
  let array: any = [{ label: "Random", value: "random" }];

  data?.options?.map((item: { code: string; name: string }) => {
    array.push({ label: item.name, value: item.code });
  });

  return array;
}
