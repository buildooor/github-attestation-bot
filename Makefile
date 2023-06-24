docker-build:
	docker build -t github-attestation-bot .

docker-start:
	docker run --env-file=.env -p 8000:8000 github-attestation-bot
