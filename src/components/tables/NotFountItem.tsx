interface Props {
  message?: string;
}
const NotFountItem = ({ message }: Props) => {
  return (
    <div className="h-44 w-full flex items-center justify-center">
      <p className="font-semibold italic text-gray-500">
        {message ?? "Item Not Found"}
      </p>
    </div>
  );
};

export default NotFountItem;
