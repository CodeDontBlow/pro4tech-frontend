export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-300"></span>
      </div>
      <p className="text-gray-500 text-lg">Carregando...</p>
    </div>
  );
}
