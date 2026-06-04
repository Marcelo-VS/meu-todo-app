"use client";

import React from 'react';
import { Rocket, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              DyadApp
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Início</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Recursos</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Sobre</a>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Começar
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-indigo-50 p-4 space-y-4">
          <a href="#" className="block text-base font-medium text-gray-600">Início</a>
          <a href="#" className="block text-base font-medium text-gray-600">Recursos</a>
          <a href="#" className="block text-base font-medium text-gray-600">Sobre</a>
          <Button className="w-full bg-indigo-600 text-white rounded-xl">Começar</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;