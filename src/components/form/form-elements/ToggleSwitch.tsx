import ComponentCard from "../../common/ComponentCard";
import Switch from "../switch/Switch";

export default function ToggleSwitch() {
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };
  return (
    <ComponentCard title="Toggle switch input">
      <div className="flex gap-4">
        <Switch defaultChecked label="Default" onChange={handleSwitchChange} />
        <Switch defaultChecked label="Checked" onChange={handleSwitchChange} />
        <Switch disabled label="Disabled" />
      </div>{" "}
      <div className="flex gap-4">
        <Switch
          defaultChecked
          label="Default"
          color="gray"
          onChange={handleSwitchChange}
        />
        <Switch
          defaultChecked
          label="Checked"
          color="gray"
          onChange={handleSwitchChange}
        />
        <Switch disabled label="Disabled" color="gray" />
      </div>
    </ComponentCard>
  );
}
