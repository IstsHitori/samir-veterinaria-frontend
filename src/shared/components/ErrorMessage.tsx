type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-2 w-[200px] text-xs text-center text-white bg-red-500 rounded-lg uppercase">
      {message}
    </div>
  );
}
