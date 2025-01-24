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

export function CountryCoreResiSelectField({
  defaultSelectText = "Select framework...",
  fieldData,
  FieldValue,
  setFieldValue,
  setStates,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [Currentvalue, setValue] = React.useState("");

  const currentCountry = fieldData?.find(
    (country: { code: string }) => country.code === FieldValue
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between !bg-white dark:!bg-gray-700 !text-gray-600 dark:!text-white hover:!text-gray-600 dark:hover:!text-white border-[#e5e7eb] dark:border-transparent"
        >
          {currentCountry?.name || "Worldwide" || defaultSelectText}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[360px] p-0 !bg-white dark:!bg-gray-700 border-[#e5e7eb] dark:border-transparent">
        <Command className="!bg-white dark:!bg-gray-700">
          <CommandInput placeholder="Search ..." className="h-9 !bg-white dark:!bg-gray-700 !text-black dark:!text-white" />
          <CommandEmpty>No Results</CommandEmpty>
          <CommandGroup className="!bg-white dark:!bg-gray-700">
            <ScrollArea className="h-[300px] !bg-white dark:!bg-gray-700">
              {filterData(fieldData).map(({ label, value, code }: any) => (
                <CommandItem
                  key={value}
                  value={label}
                  className="!text-black dark:!text-white hover:!bg-brand hover:!text-white !bg-white dark:!bg-gray-700 cursor-pointer"
                  onSelect={(newValue) => {
                    setValue(value);
                    if (newValue == "random") {
                      setFieldValue("country", "");
                      setFieldValue("state", "");
                      setFieldValue("city", "");
                    } else {
                      setFieldValue("country", value);
                      setFieldValue("state", "");
                      setFieldValue("city", "");
                    }
                    const currentCountryStates =
                      fieldData?.find(
                        (country: { code: string }) => country.code === value
                      )?.states || [];

                    setStates(currentCountryStates);
                    setOpen(false);
                  }}
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
  let entries = data;
  let array: any = [{ label: "WorldWide", value: "random", code: "WORLD" }];

  entries.forEach((country: { code: string; name: string }) => {
    array.push({
      label: country.name,
      value: country.code,
      code: country.code,
    });
  });

  return array;
}
