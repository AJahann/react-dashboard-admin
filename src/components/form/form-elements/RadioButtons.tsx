import { useState } from "react";

import ComponentCard from "../../common/ComponentCard";
import Radio from "../input/Radio";

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <ComponentCard title="Radio Buttons">
      <div className="flex flex-wrap items-center gap-8">
        <Radio
          checked={selectedValue === "option1"}
          id="radio1"
          label="Default"
          name="group1"
          value="option1"
          onChange={handleRadioChange}
        />
        <Radio
          checked={selectedValue === "option2"}
          id="radio2"
          label="Selected"
          name="group1"
          value="option2"
          onChange={handleRadioChange}
        />
        <Radio
          disabled
          checked={selectedValue === "option3"}
          id="radio3"
          label="Disabled"
          name="group1"
          value="option3"
          onChange={handleRadioChange}
        />
      </div>
    </ComponentCard>
  );
}
