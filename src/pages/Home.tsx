"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { LogOut, Plus, CheckCircle2, Circle } from 'lucide-react';
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada.");
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-indigo-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">Minhas Tarefas</h1>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Olá! 👋</h2>
            <p className="text-gray-500">Aqui estão suas tarefas para hoje.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        <div className="space-y-4">
          {[
            { id: 1, title: "Configurar Supabase", completed: true },
            { id: 2, title: "Criar rotas protegidas", completed: true },
            { id: 3, title: "Implementar CRUD de tarefas", completed: false },
          ].map((task) => (
            <div 
              key={task.id}
              className="flex items-center p-4 bg-white border border-indigo-50 rounded-2xl hover:shadow-md transition-shadow group"
            >
              <button className="mr-4 text-indigo-600">
                {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>
              <span className={`text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;