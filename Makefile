DATA_DIR	= data

DATA_DIRS	= \
	$(DATA_DIR)/postgres \
	$(DATA_DIR)/redis \
	$(DATA_DIR)/minio \
	$(DATA_DIR)/nginx/cache \
	$(DATA_DIR)/nginx/logs \
	$(DATA_DIR)/uploads

.PHONY: all setup up down restart logs clean fclean re

all: setup up

setup:
	@echo "Creating GeoScanAI data directories..."
	@mkdir -p $(DATA_DIRS)
	@echo "Data directories ready."

up: setup
	docker compose up -d

down:
	docker compose down

restart:
	docker compose down
	docker compose up -d

logs:
	docker compose logs -f

clean:
	docker compose down

fclean:
	docker compose down -v
	@echo "Removing local GeoScanAI data..."
	@rm -rf $(DATA_DIR)

re: fclean all