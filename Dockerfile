# Usa a mesma versão do Node que você já estava usando
FROM node:22-alpine

WORKDIR /app

# Desativa a telemetria para o container rodar mais leve na EC2
ENV NEXT_TELEMETRY_DISABLED=1

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (incluindo as necessárias para rodar o modo dev)
RUN npm install

# Copia todo o código fonte direto para dentro do container
COPY . .

# Passa a variável de ambiente necessária para o Next.js ler em tempo de execução
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Expõe a porta que o seu Nginx proxy já está esperando
EXPOSE 3000

# 🚀 A MÁGICA: Em vez de buildar, inicializa o servidor de desenvolvimento direto.
# O Next.js vai subir instantaneamente e só vai compilar as páginas sob demanda no navegador.
CMD ["npm", "run", "dev"]
