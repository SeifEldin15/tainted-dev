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

export function CountrySelectField({
  defaultSelectText = "Select framework...",
  fieldData,
  FieldValue,
  setFieldValue,
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
          className="w-full justify-between !bg-white !text-gray-600 hover:!text-gray-600 border-[#e5e7eb]"
        >
          {FieldValue.includes("_country") ? Currentvalue : defaultSelectText}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[360px] p-0 !bg-white border-[#e5e7eb]">
        <Command className="!bg-white">
          <CommandInput placeholder="Search ..." className="h-9 !bg-white !text-black" />
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[300px]">
              {filterData(fieldData).map(({ label, value, code }: any) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(newValue) => {
                    const splitValue = newValue.split(" - ")[0];
                    setValue(value);
                    value == "random"
                      ? setFieldValue("geoTarget", "")
                      : setFieldValue("geoTarget", `_country-${splitValue.toUpperCase()}`);
                    setOpen(false);
                  }}
                  className="!text-black hover:!bg-brand hover:!text-white !bg-white cursor-pointer"
                >
                  <img
                    className="w-[18px] "
                    src={
                      code != "WORLD"
                        ? `https://cdn.sellix.io/static/flags/${code.toLowerCase()}.svg`
                        : "/logo/worldwide.svg"
                    }
                  />
                  <span className="ml-2">{label}</span>
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
  let entries = Object.entries(data);
  let array: any = [{ label: "WorldWide", value: "random", code: "WORLD" }];

  entries.forEach(([key, value]) => {
    array.push({ label: value, value: key + " - " + value, code: key });
  });

  return array;
}
