"use client";

import { SetStateAction, useState } from "react";
import { cn } from "~/lib/utils";
import Button from "~/ui/button";
import Input from "~/ui/input";
import Select from "~/ui/select";

const COLORS_TYPES = [
  "brand",
  "hex",
  "rgb",
  "rgba",
  "currentColor",
  "none",
  "transparent",
] as const;

type ColorTypes = typeof COLORS_TYPES[number];

type IconFormProps = {
  brands: string[];
};

function normalizeColor(
  colorType: FormDataEntryValue,
  color: FormDataEntryValue
): string {
  switch (colorType) {
    case "hex":
      return color.toString().replace("#", "");

    case "rgb":
    case "rgba":
      return `${colorType}(${color.toString()})`;

    default:
      return colorType.toString();
  }
}

const getDefaultColor = (colorType: ColorTypes) => {
  switch (colorType) {
    case "hex":
      return "000000";
    case "rgb":
      return "0,0,0";
    case "rgba":
      return "0,0,0,1";
    default:
      return "";
  }
};

const changeColorPart = (color: string, part: number, value: string) => {
  const parts = color.split(",").map((part) => part.trim());
  parts[part] = value;
  return parts.join(",");
};

function ColorInput({ colorType }: { colorType: ColorTypes }) {
  const [currentColorType, setCurrentColorType] = useState(colorType);
  const [color, setColor] = useState("");

  if (colorType !== currentColorType) {
    setColor(getDefaultColor(colorType));
    setCurrentColorType(colorType);
  }

  const handleHexHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value.replace("#", ""));
  };

  const handleRedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => changeColorPart(prevColor, 0, event.target.value));
  };

  const handleGreenHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => changeColorPart(prevColor, 1, event.target.value));
  };

  const handleBlueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => changeColorPart(prevColor, 2, event.target.value));
  };

  const handleAlphaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => changeColorPart(prevColor, 3, event.target.value));
  };

  return (
    <div
      className={cn(
        "grid gap-2 pt-2",
        { "grid-cols-1": colorType === "hex" },
        { "grid-cols-4": colorType !== "hex" }
      )}>
      <input id="color" name="color" type="hidden" value={color} />
      {colorType === "hex" && (
        <Input
          type="text"
          maxLength={6}
          onChange={handleHexHandler}
          max={6}
          defaultValue={color}
        />
      )}
      {colorType.startsWith("rgb") && (
        <>
          <Input
            id="red"
            label="Red"
            className="w-28"
            type="number"
            onChange={handleRedHandler}
            defaultValue={color.split(",")[0]}
          />
          <Input
            id="green"
            label="Green"
            className="w-28"
            type="number"
            onChange={handleGreenHandler}
            defaultValue={color.split(",")[1]}
          />
          <Input
            id="blue"
            label="Blu"
            className="w-28"
            type="number"
            onChange={handleBlueHandler}
            defaultValue={color.split(",")[2]}
          />
        </>
      )}
      {colorType === "rgba" && (
        <Input
          id="alpha"
          label="Alpha"
          className="w-28"
          type="number"
          onChange={handleAlphaHandler}
          defaultValue={color.split(",")[3]}
        />
      )}
    </div>
  );
}

export function IconForms({ brands }: IconFormProps) {
  const [colorType, setColorType] = useState<ColorTypes>(COLORS_TYPES[0]);
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);

    window.open(
      `/api/icons/${data.icon}.svg?color=${normalizeColor(
        data.colorType,
        data.color
      )}`,
      "_blank"
    );
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div className="grid grid-cols-4 gap-2 pt-2">
        <div className="col-span-3">
          <Select id="icon" name="icon">
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            id="colorType"
            name="colorType"
            onChange={(e) => setColorType(e.target.value as ColorTypes)}>
            {COLORS_TYPES.map((color) => (
              <option key={color}>{color}</option>
            ))}
          </Select>
        </div>
      </div>
      <ColorInput colorType={colorType} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
