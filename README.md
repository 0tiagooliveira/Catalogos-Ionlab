# Catálogos IONLAB

Bem-vindo ao repositório oficial do sistema de **Catálogos da IONLAB**, desenvolvido por **Tiago**! 🚀

Este projeto é uma plataforma ágil e moderna de busca e visualização de catálogos de equipamentos laboratoriais.

## ✨ Funcionalidades (Features)

- **Busca Inteligente:** Motor de pesquisa tolerante a erros de acentuação (Ex: "centrifuga" / "centrífuga" retornam o mesmo resultado).
- **Categorização Dinâmica:** Listagem elegante em Dropdown com contadores automáticos de produtos.
- **Tag de Descontinuação:** Sinalizador visual moderno e vermelho para equipamentos que não são mais fabricados.
- **Rastreamento GA4:** Medição de todos os termos de pesquisa pelo Google Analytics (o que os clientes mais procuram!).
- **Animações Fluidas:** Transições otimizadas com Framer Motion (Fade in up inteligente).
- **One-Click Deploy:** Tudo (GitHub, Construção do App e Hosting na Nuvem da Google) através de um único clique num script Batch personalizado!

## 🛠️ Tecnologias Utilizadas

- **React.js 19** + **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Firebase Hosting**

## 🚀 Como executar o projeto localmente

1. Instalar as dependências do projeto:
   ```bash
   npm install
   ```
2. Inicializar o servidor (Vite):
   ```bash
   npm run dev
   ```

## 🌍 Como realizar o Deploy (Atualizar o site)

Basta dar dois cliques no script:
```
deploy.bat
```
Ele vai automaticamente salvar no GitHub, fazer a `build` das pastas do React e dar `deploy` através da API para o Firebase.

---
*Desenvolvido com 💙 por Tiago para a IONLAB.*
