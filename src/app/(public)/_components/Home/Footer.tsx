import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="py-8 text-center">
        <p className="text-white">
          © {new Date().getFullYear()} Going Visible. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
