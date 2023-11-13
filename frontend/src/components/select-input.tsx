interface SelectProps {
  onClick: React.MouseEventHandler<HTMLInputElement>;
  value: boolean;
}

const SelectInput = ({ onClick, value }: SelectProps) => {
  return (
    <input
      type="checkbox"
      defaultChecked={value}
      className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 rounded-lg"
      onClick={onClick}
    />
  );
};

export default SelectInput;
