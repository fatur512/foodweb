export function Card({ className = "", children }) {
  return <div className={`bg-blue-600 rounded-lg shadow-md p-6 ${className}`}>{children}</div>;
}
