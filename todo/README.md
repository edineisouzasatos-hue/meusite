# 📝 To-Do List Application

Uma aplicação de lista de tarefas moderna com sincronização automática usando **LocalStorage**. As tarefas são salvas automaticamente no navegador!

## 🎯 Funcionalidades

- ✅ **Adicionar tarefas** - Digite e pressione Enter ou clique no botão Adicionar
- ✅ **Marcar como concluída** - Clique no checkbox para completar
- ✅ **Deletar tarefas** - Remova tarefas individuais
- ✅ **Filtrar tarefas** - Veja todas, apenas ativas ou apenas concluídas
- ✅ **Limpar concluídas** - Delete todas as tarefas completadas de uma vez
- ✅ **LocalStorage** - Dados persistidos automaticamente no navegador
- ✅ **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Contador de tarefas** - Veja o total e quantas estão concluídas

## 📁 Estrutura do Projeto

```
todo/
├── index.html      # Estrutura HTML
├── style.css       # Estilos e design
├── script.js       # Lógica e LocalStorage
└── README.md       # Este arquivo
```

## 🚀 Como Usar

1. **Abra o arquivo `index.html` no navegador**

2. **Adicione uma tarefa:**
   - Digite o texto no campo de entrada
   - Pressione Enter ou clique em "Adicionar"

3. **Gerencie suas tarefas:**
   - ☑️ Marque para completar
   - 🗑️ Clique "Deletar" para remover
   - 🔍 Use os filtros para organizar

4. **As tarefas são salvas automaticamente** no LocalStorage do seu navegador

## 💾 LocalStorage

A aplicação armazena:
- **Todas as tarefas** - com ID, texto, status e data de criação
- **Filtro ativo** - lembra sua última visualização

Os dados persistem mesmo após fechar o navegador!

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo com gradientes e animações
- **JavaScript Vanilla** - Lógica pura, sem dependências
- **LocalStorage API** - Persistência de dados

## 📋 Funcionalidades Técnicas

### JavaScript
- Manipulação do DOM
- Event Listeners
- LocalStorage API
- Tratamento de XSS (escapeHtml)
- Filtros e estado da aplicação

### CSS
- Flexbox para layout
- Gradientes lineares
- Animações suaves
- Media queries responsivas
- Estados (hover, active, completed)

## 🔄 Fluxo de Dados

```
Entrada do usuário
        ↓
Validação
        ↓
Criar/Atualizar objeto
        ↓
Salvar em todos[]
        ↓
Gravar no LocalStorage
        ↓
Renderizar UI
```

## 🎯 Próximas Melhorias

- [ ] Editar tarefas
- [ ] Adicionar categorias/tags
- [ ] Data de vencimento
- [ ] Prioridades
- [ ] Sincronizar com servidor
- [ ] Modo escuro
- [ ] Exportar/Importar JSON

## ⌨️ Atalhos de Teclado

- **Enter** - Adicionar tarefa (quando input focado)
- **Tab** - Navegar entre elementos

## 🐛 Troubleshooting

**As tarefas não estão sendo salvas?**
- Verifique se o LocalStorage está habilitado no navegador
- Tente limpar o cache

**Dados desapareceram?**
- Se você limpou os dados do navegador, infelizmente serão perdidos
- Considere fazer backup exportando as tarefas

## 📝 Licença

MIT - Livre para usar e modificar

---

**Desenvolvido com ❤️ | Versão 1.0**
