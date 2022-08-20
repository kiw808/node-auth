.PHONY: start stop dev install rmdata

help: ## Show help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

start: ## Start database container
	docker-compose up -d

stop: ## Stop docker-compose
	docker-compose down

dev: ## Start dev server
	npm run dev

rmdata: ## Remove db data
	sudo rm -r dbdata/
