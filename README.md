# Pulso

Protótipo acadêmico interativo de aplicativo para lembretes e acompanhamento de medicamentos voltado para idosos, com suporte opcional para cuidadores/familiares e acompanhamento médico.

> **Aviso Acadêmico:** Este projeto é um protótipo conceitual e navegável desenvolvido para fins de apresentação acadêmica. Não possui backend, banco de dados persistente, autenticação real ou integrações externas.

---

## 📱 Perfis da Aplicação

1. **Dona Maria (Idoso)**
   - Interface com alto contraste, botões grandes e legibilidade aprimorada.
   - Linha do tempo de doses diárias com confirmação de horário real.
   - Card de próximo remédio com mascote 3D flutuante e ação rápida ("Já tomei" / "Lembrar em 10 min").
   - Alarme visual com halo concêntrico e tela de celebração.
   - Aba **Família**: gerenciamento de responsáveis (ciclagem de tempo de atraso de aviso: 15, 30 e 60 min), relatório de adesão semanal com 7 marcadores em forma de gota, e fluxo de consentimento LGPD com bottom sheet animado para envio de relatório ao médico.

2. **Ana (Responsável / Cuidador)**
   - Painel de acompanhamento em tempo real sincronizado.
   - Alerta visual imediato de atraso de medicação e botão de ligação rápida.
   - Histórico semanal de adesão.
   - Aba **Rede de apoio** com toggle do próprio aviso e aviso quando as notificações forem pausadas pela paciente.

3. **Dra. Helena (Médico)**
   - Painel clínico de acompanhamento de pacientes autorizados (Dona Maria e Seu José).
   - Estatísticas calculadas dinamicamente de adesão semanal por medicamento.
   - Lista de relatórios clínicos recebidos com selo em tempo real **"NOVO"**.
   - Exportação simulada de prontuário em PDF.

---

## 🛠️ Tecnologias Utilizadas

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide React** (ícones vetoriais padronizados)
- **Design Tokens** centralizados para escala de ícones e mascote

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js instalado (v18+)
- npm ou yarn

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/55jotinha/pulso.git
cd pulso
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

---

## 🖥️ Demonstração em Desktop
No ambiente desktop, a aplicação é renderizada dentro de uma moldura de smartphone centralizada (393x852) com barra superior de controle (*SwitcherBar*) para alternar rapidamente entre os perfis e reiniciar os dados da demonstração.

