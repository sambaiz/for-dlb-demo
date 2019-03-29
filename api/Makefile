build:
	docker build -t fordlb .
train:
	docker run -v `pwd`/saved:/saved fordlb python train.py
serve:
	docker run -v `pwd`/saved:/saved -p 5000:5000 -e FLASK_APP='api.py' fordlb python -m flask run --host=0.0.0.0
