import { List } from "@raycast/api";

export function DateDropdown(props: { data: string[]; onDateChange: (newValue: string) => void }) {
  const { data, onDateChange } = props;
  return (
    <List.Dropdown tooltip="Select a date" storeValue={true} onChange={(value) => onDateChange(value)}>
      <List.Dropdown.Item title="Show All" value=""/>
      {data.map((textDate, idx) => (
        <List.Dropdown.Item key={idx + textDate} title={textDate} value={textDate} />
      ))}
    </List.Dropdown>
  );
}
