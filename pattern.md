# Patterns

## Commit Message Guidelines

- Use os seguintes prefixos padronizados para mensagens de commit para manter clareza e consistência ao longo do projeto:
🚀 feat: Adicionar novos arquivos, funcionalidades ou recursos.
🐛 fix: Corrigir bugs ou reverter alterações.
♻️ refactor: Melhorar o código sem adicionar funcionalidades ou corrigir bugs, como renomear variáveis ou ajustar a formatação e indentação.
⚡ perf: Melhorar o desempenho e otimizar o código.
📚 docs: Alterar ou adicionar documentação, incluindo arquivos README ou comentários no código.
🧪 test: Adicionar ou modificar arquivos de teste.
📦 build: Alterar dependências ou modificações relacionadas ao processo de build.
🔧 chore: Atualizar arquivos de configuração, scripts ou tarefas de manutenção que não impactam a funcionalidade da aplicação.
🗑️ remove: Remover arquivos do repositório.
📝 todo: Adicionar comentários ou listas de ideias para novas funcionalidades ou correções a serem implementadas posteriormente.

## Prisma Model Field Order

- Siga esta abordagem estruturada para organizar os campos nas models Prisma, garantindo consistência e legibilidade:
🔑 Campos Únicos: Campos que identificam exclusivamente um registro, como *id* ou *email*.
🏷️ Campos de Status: Campos que representam o status ou o papel de um registro, como *status* ou *role*.
👤 Campos Pessoais: Campos que armazenam informações pessoais, como *name*, *address* ou *phone_number*.
📦 Campos Gerais: Campos que não se enquadram nas categorias anteriores, mas que são relevantes para o modelo.
🕒 Campos de Auditoria: Campos utilizados para rastrear alterações, como *createdAt* e *updatedAt*.

## Init Docker DB

- docker compose up -d
- npx prisma migrate dev --name description_of_changes
