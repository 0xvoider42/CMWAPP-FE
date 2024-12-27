export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        Campaign Management System © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
