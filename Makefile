lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

build-frontend:
	make -C frontend run build

start-backend:
	npx start-server

start:
	make start-backend & make build-frontend