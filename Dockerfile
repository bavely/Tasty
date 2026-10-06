# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# CRA inlines REACT_APP_* at build time. CapRover passes app env vars as build args.
ARG REACT_APP_APP_ID=${REACT_APP_APP_ID}
ENV REACT_APP_APP_ID=${REACT_APP_APP_ID}
ARG REACT_APP_APP_KEY=${REACT_APP_APP_KEY}
ENV REACT_APP_APP_KEY=${REACT_APP_APP_KEY}

RUN npm run build

# ---- serve ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
