import React, { useState } from 'react';
import { TeamMember } from '../types';
import Card from '../components/Card';
import { PlusIcon } from '../components/icons/PlusIcon';
import { UploadIcon } from '../components/icons/UploadIcon';
import Modal from '../components/Modal';

interface HunterSettingsScreenProps {
    salespeople: TeamMember[];
    onBack: () => void;
}

const mockGoals = {
    'vendedor1': { type: 'monthly', value: 30 },
    'vendedor2': { type: 'weekly', value: 10 },
};

const HunterSettingsScreen: React.FC<HunterSettingsScreenProps> = ({ salespeople, onBack }) => {
    const [activeTab, setActiveTab] = useState<'access' | 'goals'>('access');
    const [hunterAccess, setHunterAccess] = useState<Record<string, boolean>>({ 'vendedor1': true });
    const [isRequestModalOpen, setRequestModalOpen] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);

    const toggleAccess = (salespersonId: string) => {
        setHunterAccess(prev => ({ ...prev, [salespersonId]: !prev[salespersonId] }));
    };

    const handleRequestLeads = () => {
        alert('(Simulação) Pedido de leads enviado aos administradores da Triad3.');
        setRequestModalOpen(false);
    };
    
    const handleUploadLeads = () => {
        alert('(Simulação) Leads da sua base de dados foram carregados com sucesso.');
        setUploadModalOpen(false);
    };

    return (
        <div className="animate-fade-in">
            <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <div>
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-dark-secondary hover:text-dark-text mb-2">
                        &larr; Voltar para Configurações
                    </button>
                    <h1 className="text-3xl sm:text-4xl font-bold text-dark-text">Modo de Prospecção Ativa (Hunter)</h1>
                </div>
            </header>

            <div className="border-b border-dark-border mb-6">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('access')} className={`py-2 px-4 text-sm font-semibold border-b-2 ${activeTab === 'access' ? 'text-dark-primary border-dark-primary' : 'text-dark-secondary border-transparent hover:border-dark-border'}`}>
                        Acesso e Distribuição
                    </button>
                    <button onClick={() => setActiveTab('goals')} className={`py-2 px-4 text-sm font-semibold border-b-2 ${activeTab === 'goals' ? 'text-dark-primary border-dark-primary' : 'text-dark-secondary border-transparent hover:border-dark-border'}`}>
                        Metas de Prospecção
                    </button>
                </nav>
            </div>

            {activeTab === 'access' && (
                <div className="space-y-8">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-dark-text mb-2">Abastecimento de Leads</h3>
                        <p className="text-sm text-dark-secondary mb-4">Solicite leads qualificados da nossa base ou suba sua própria lista para distribuição.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button onClick={() => setRequestModalOpen(true)} className="p-4 bg-dark-background border border-dark-border rounded-lg text-left hover:border-dark-primary">
                                <PlusIcon className="w-6 h-6 text-dark-primary mb-2" />
                                <h4 className="font-bold">Solicitar Leads Triad3</h4>
                                <p className="text-xs text-dark-secondary">Peça uma nova lista de leads para nossa equipe.</p>
                            </button>
                            <button onClick={() => setUploadModalOpen(true)} className="p-4 bg-dark-background border border-dark-border rounded-lg text-left hover:border-dark-primary">
                                <UploadIcon className="w-6 h-6 text-dark-primary mb-2" />
                                <h4 className="font-bold">Subir Base de Dados</h4>
                                <p className="text-xs text-dark-secondary">Faça o upload de um arquivo .csv com seus leads.</p>
                            </button>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-dark-text mb-2">Acesso dos Vendedores</h3>
                        <p className="text-sm text-dark-secondary mb-4">Habilite ou desabilite o modo Hunter para cada vendedor da sua equipe.</p>
                        <div className="space-y-3">
                            {salespeople.map(sp => (
                                <div key={sp.id} className="flex items-center justify-between p-3 bg-dark-background rounded-lg border border-dark-border">
                                    <div className="flex items-center gap-3">
                                        <img src={sp.avatarUrl} alt={sp.name} className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold">{sp.name}</span>
                                    </div>
                                    <label htmlFor={`toggle-hunter-${sp.id}`} className="cursor-pointer">
                                        <div className="relative">
                                            <input type="checkbox" id={`toggle-hunter-${sp.id}`} className="sr-only peer" checked={hunterAccess[sp.id] || false} onChange={() => toggleAccess(sp.id)} />
                                            <div className="w-11 h-6 bg-dark-border rounded-full peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dark-primary"></div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
            
            {activeTab === 'goals' && (
                <Card className="p-6">
                    <h3 className="text-xl font-bold text-dark-text mb-2">Metas de Prospecção</h3>
                    <p className="text-sm text-dark-secondary mb-4">Defina metas diárias, semanais ou mensais. Metas mensais serão automaticamente divididas por semana para o vendedor.</p>
                    <div className="space-y-4">
                        {salespeople.map(sp => (
                            <div key={sp.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-3 bg-dark-background rounded-lg border border-dark-border">
                                <div className="flex items-center gap-3">
                                    <img src={sp.avatarUrl} alt={sp.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-semibold">{sp.name}</span>
                                </div>
                                <select className="input-style">
                                    <option value="monthly">Meta Mensal</option>
                                    <option value="weekly">Meta Semanal</option>
                                    <option value="daily">Meta Diária</option>
                                </select>
                                <input type="number" placeholder="Nº de prospecções" className="input-style" />
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <Modal isOpen={isRequestModalOpen} onClose={() => setRequestModalOpen(false)}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-center mb-4">Solicitar Leads</h2>
                    <p className="text-center text-dark-secondary mb-6">Quantos leads você gostaria de solicitar para a sua equipe Hunter?</p>
                    <input type="number" placeholder="Ex: 50" className="w-full input-style text-center text-lg" />
                    <div className="flex justify-end gap-3 pt-6">
                        <button onClick={() => setRequestModalOpen(false)} className="px-4 py-2 rounded-md bg-dark-border/50 hover:bg-dark-border">Cancelar</button>
                        <button onClick={handleRequestLeads} className="px-4 py-2 rounded-md bg-dark-primary text-dark-background font-bold">Enviar Pedido</button>
                    </div>
                </div>
            </Modal>
             <Modal isOpen={isUploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-center mb-4">Subir Base de Dados</h2>
                    <p className="text-center text-dark-secondary mb-6">Faça o upload de um arquivo .csv com as colunas: `name`, `phone`.</p>
                    <div className="w-full h-32 flex items-center justify-center bg-dark-background border-2 border-dashed border-dark-border rounded-md">
                        <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-2 text-dark-secondary">
                           <UploadIcon className="w-8 h-8"/>
                           <span>Clique para selecionar o arquivo</span>
                        </label>
                        <input id="csv-upload" type="file" className="sr-only" accept=".csv" />
                    </div>
                    <div className="flex justify-end gap-3 pt-6">
                        <button onClick={() => setUploadModalOpen(false)} className="px-4 py-2 rounded-md bg-dark-border/50 hover:bg-dark-border">Cancelar</button>
                        <button onClick={handleUploadLeads} className="px-4 py-2 rounded-md bg-dark-primary text-dark-background font-bold">Carregar Leads</button>
                    </div>
                </div>
            </Modal>
            
            <style>{`.input-style { width: 100%; padding: 0.5rem 0.75rem; background-color: #0A0F1E; border: 1px solid #243049; border-radius: 0.375rem; color: #E0E0E0; }`}</style>
        </div>
    );
};

export default HunterSettingsScreen;
