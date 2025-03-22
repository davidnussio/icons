"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";
import Button from "~/ui/button";
import Input from "~/ui/input";
import Select from "~/ui/select";

const COLORS_TYPES = ["brand", "hex", "rgb", "rgba"] as const;
const FILE_TYPES = [".svg", ".png"] as const;
const IMAGE_WIDTHS = [
  "24",
  "32",
  "48",
  "64",
  "96",
  "128",
  "256",
  "500",
  "1024",
  "2064",
] as const;

type ColorTypes = (typeof COLORS_TYPES)[number];
type FileTypes = (typeof FILE_TYPES)[number];
type ImageWidthTypes = (typeof IMAGE_WIDTHS)[number];

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
    <div className={cn("flex justify-between grow", "w-")}>
      <input id="color" name="color" type="hidden" value={color} />
      {colorType === "hex" && (
        <Input
          fullWidth
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
            className="w-20 md:w-28"
            type="number"
            onChange={handleRedHandler}
            defaultValue={color.split(",")[0]}
          />
          <Input
            id="green"
            label="Green"
            className="w-20 md:w-28"
            type="number"
            onChange={handleGreenHandler}
            defaultValue={color.split(",")[1]}
          />
          <Input
            id="blue"
            label="Blu"
            className="w-20 md:w-28"
            type="number"
            onChange={handleBlueHandler}
            defaultValue={color.split(",")[2]}
          />
          <div
            className={cn("w-20 md:w-28", { hidden: colorType === "rgba" })}
          />
        </>
      )}
      {colorType === "rgba" && (
        <Input
          id="alpha"
          label="Alpha"
          className="w-20 md:w-28"
          type="number"
          step="0.01"
          min="0"
          max="1"
          onChange={handleAlphaHandler}
          defaultValue={color.split(",")[3]}
        />
      )}
    </div>
  );
}

export function IconForms({ brands }: IconFormProps) {
  const [colorType, setColorType] = useState<ColorTypes>(COLORS_TYPES[0]);
  const [fileType, setFileType] = useState<FileTypes>(FILE_TYPES[0]);
  const [imageWidth, setImageWidth] = useState<ImageWidthTypes>(
    IMAGE_WIDTHS[6]
  );

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    window.open(
      `/api/icons/${data.icon}${fileType}?color=${normalizeColor(
        data.colorType,
        data.color
      )}`,
      "_blank"
    );
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div className="flex flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2">
        <div className="grow">
          <Select id="icon" name="icon">
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            id="fileType"
            name="fileType"
            onChange={(e: Seleceve) =>
              setFileType(e.target.value as FileTypes)
            }>
            {FILE_TYPES.map((fileType) => (
              <option key={fileType}>{fileType}</option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            id="width"
            name="width"
            disabled={fileType === ".svg"}
            defaultValue={imageWidth}
            onChange={(e) => setImageWidth(e.target.value as ImageWidthTypes)}>
            {IMAGE_WIDTHS.map((width) => (
              <option key={width}>{width}</option>
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
      <div className="mt-2">
        <ColorInput colorType={colorType} />
      </div>

      <div className="mt-4 text-right">
        <Button type="submit" className="w-full">
          Open icon
        </Button>
      </div>
    </form>
  );
}
