"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>Nova arquitetura disponível</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
          Construa o futuro com <br />
          <span className="text-indigo-600">Simplicidade e Elegância</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Uma base sólida e moderna para o seu próximo grande projeto. 
          Seguindo as melhores práticas de design e desenvolvimento.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg group">
            Explorar Projeto
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-indigo-200 text-indigo-700 hover:bg-indigo-50">
            Ver Documentação
          </Button>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
          <div className="bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl p-8 md:p-12 border border-indigo-50 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "Performance", desc: "Otimizado para velocidade máxima e SEO." },
                { title: "Design System", desc: "Componentes consistentes e acessíveis." },
                { title: "Escalabilidade", desc: "Pronto para crescer com o seu negócio." }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-xl font-bold text-indigo-900">{item.title}</h3>
                  <p className="text-indigo-700/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;