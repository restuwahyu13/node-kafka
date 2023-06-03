###############################
# KAFKA DOCKER NON CLUSTER
###############################

upb:
	docker-compose up -d --remove-orphans --build

up:
	docker-compose up -d --remove-orphans

down:
	docker-compose down

###############################
# KAFKA DOCKER CLUSTER
###############################

cupb:
	docker-compose -f docker-compose.cluster.yml up -d --remove-orphans --build

cup:
	docker-compose -f docker-compose.cluster.yml up -d --remove-orphans

cdown:
	docker-compose -f docker-compose.cluster.yml down

###############################
# KAFKA APPLIATION
###############################

pub:
	npm run pub

sub:
	npm run sub

csub:
	npm run csub