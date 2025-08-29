"use client"
import * as React from "react"
import {Dispatch, SetStateAction} from "react"
import {Check, ChevronsUpDown} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Category} from "@/interfaces/articles";



interface props {
    placeholder: string,
    data: Category[]|null,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    setCategoryObject?:Dispatch<SetStateAction<Category|null>>,
}

export function ComboboxDemo({placeholder, data, value, setValue, setCategoryObject}: props) {
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState("")

    return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? data?.find((el) => el.id.toString() === value)?.name
                            : placeholder}
                        <ChevronsUpDown className="opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder={'wyszukaj'} className="h-9"/>
                        <CommandList>
                            <CommandEmpty>{`No elements found.`}</CommandEmpty>
                            <CommandGroup>
                                {data && data.map((el) => (
                                    <CommandItem
                                        key={el.id.toString()}
                                        value={el.id.toString()}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setCategoryObject && setCategoryObject(el)
                                            setOpen(false)
                                        }}
                                    >
                                        {el.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === el.id.toString() ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
    )
}