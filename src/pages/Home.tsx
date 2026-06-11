"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, CheckCircle2, Circle, Loader2, Trash2 } from 'lucide-react';
import { toast } from "sonner";

interface Tarefa {
  id: number;
  titulo: string;
  concluido: boolean;
  user_id: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const fetchTarefas = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false });

      if (error) throw error;
      setTarefas(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar tarefas: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    setAdding(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from('tarefas')
        .insert([{ 
          titulo: novoTitulo, 
          user_id: user.id, 
          concluido: false 
        }]);

      if (error) throw error;

      setNovoTitulo('');
      setShowInput(false);
      toast.success("Tarefa adicionada!");
      fetchTarefas();
    } catch (error: any) {
      toast.error("Erro ao adicionar tarefa: " + error.message);
    } finally {
      setAdding(false);
    }
  };

  const toggleTarefa = async (id: number, concluido: boolean) => {
    try {
      const { error } = await supabase
        .from('tarefas')
        .update({ concluido: !concluido })
        .eq('id', id);

      if (error) throw error;
      fetchTarefas();
    } catch (error: any) {
      toast.error("Erro ao atualizar tarefa: " + error.message);
    }
  };

  const deleteTarefa = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tarefas')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Tarefa removida");
      fetchTarefas();
    } catch (error: any) {
      toast.error("Erro ao remover tarefa: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada.");
    navigate('/', { replace: true });
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
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Olá! 👋</h2>
            <p className="text-gray-500">Gerencie suas tarefas reais do banco de dados.</p>
          </div>
          <Button 
            onClick={() => setShowInput(!showInput)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        {showInput && (
          <form onSubmit={handleAddTask} className="flex gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <Input 
              placeholder="O que precisa ser feito?" 
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              autoFocus
              className="rounded-xl border-indigo-100 focus:ring-indigo-500 h-12"
            />
            <Button 
              type="submit" 
              disabled={adding}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-12"
            >
              {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar"}
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : tarefas.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400">Nenhuma tarefa encontrada. Clique em "Nova Tarefa" para começar!</p>
            </div>
          ) : (
            tarefas.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 bg-white border border-indigo-50 rounded-2xl hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center flex-1">
                  <button 
                    onClick={() => toggleTarefa(task.id, task.concluido)}
                    className="mr-4 text-indigo-600 hover:scale-110 transition-transform"
                  >
                    {task.concluido ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <span className={`text-lg transition-all ${task.concluido ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.titulo}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTarefa(task.id)}
                  className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;