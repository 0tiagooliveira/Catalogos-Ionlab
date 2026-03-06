# Portal de Catálogos da IONLAB 🔬

Fala pessoal! Aqui é o Tiago, e esse é o repositório do novo portal de catálogos que desenvolvi pra **IONLAB**. 

Eu precisava criar uma forma fácil e super rápida para os clientes (e também pra equipe de vendas) encontrarem nossos equipamentos, manuais e catálogos. A ideia principal era sair de listas manuais e ter algo dinâmico, rápido e que rodasse bem até na internet móvel num celular.

## O que eu coloquei de legal aqui dentro:

- **A busca aguenta erros:** Sabe quando você digita correndo e falta um acento? Então. Eu fiz a busca ignorar os acentos. Se a pessoa por "agita" ou "centrifuga", ela vai achar os "Agitadores" e as "Centrífugas" sem problemas no resultado.
- **Tudo organizado por categorias:** Tem um menuzinho ali em cima que agrupa todos os equipamentos automaticamente pra facilitar a navegação.
- **Aviso de Descontinuados:** Criei uma tagzinha vermelha em negrito bem chamativa pra colocar nos produtos que já saíram de linha (mas que o pessoal ainda procura catálogo).
- **A gente sabe o que o cliente quer:** Liguei a barra de pesquisa direto com o Google Analytics 4. O marketing agora consegue saber exatamente quais palavras a galera mais digita no site pra gente prever demanda de equipamentos!
- **Zero trabalho pro Deploy:** Fiz um arquivo `.bat` maroto. Dar o famoso `npm run build` e mandar isso pro Firebase era muito chato de fazer todo dia. Agora a gente só dá dois cliques no `deploy.bat` e ele já envia as alterações pro GitHub, compila e sobe o site no ar sozinho, tudo com um clique.
- **Design:** Tem umas transições suaves quando se recarrega a página. Não é só funcional, eu queria que ficasse bonito, no nível da IONLAB.

## Stack que eu usei:
- **React.js com Vite** (muito mais rápido do que rodar CRA)
- **TypeScript** (pra não rolar bugs surpresas de variáveis)
- **Tailwind CSS** (o visual todo foi feito assim)
- **Framer Motion** (quem entrega as animações da página)
- **Firebase** (hospedagem que não cai nunca)

## Quer rodar o projeto na sua máquina?
Baixa o projeto, abre o terminal nele e manda um:
`npm install`
Depois pra ligar:
`npm run dev`

Se quiser atualizar, já sabe né? Vai na pasta e dá dois cliques no `deploy`. 🔥

---
*Feito por Tiago - IONLAB.*
