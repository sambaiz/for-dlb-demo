build:
	docker build -t fordlb .
train:
	docker run -v `pwd`/saved:/saved fordlb python train.py
serve:
	docker run -v `pwd`/saved:/saved -e FLASK_APP='api.py' fordlb python -m flask run