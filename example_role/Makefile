VENV := venv

all: help

help:
	@echo "try: help, venv, install, test, run, clean"

$(VENV)/bin/activate:
	python3 -m venv $(VENV)

install: requirements.txt venv
	. $(VENV)/bin/activate; \
	./$(VENV)/bin/pip install -r requirements.txt

venv: $(VENV)/bin/activate

test: venv
	. $(VENV)/bin/activate; \
	python -m unittest

deploy: venv
	. $(VENV)/bin/activate; \
	npx cdk --profile $(AWS_PROFILE) deploy

bootstrap:
	npx cdk --profile $(AWS_PROFILE) bootstrap

clean:
	rm -rf $(VENV)
	find . -type f -name '*.pyc' -delete

.PHONY: all help install test deploy bootstrap clean
