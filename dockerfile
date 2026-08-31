# Node image for building the HTML/JS
FROM node:latest AS client-build
WORKDIR /workdir/client
COPY ./client .

# install/build
RUN npm install .
RUN npm run build

# python image to setup/serve the api
FROM python:3.12 AS api-build
WORKDIR /workdir

# copy in source and all assets
COPY ./api ./api
COPY ./projects ./projects
COPY --from=client-build /workdir/client ./client

# install prereqs
WORKDIR /workdir/api
RUN pip install .

WORKDIR /workdir
EXPOSE 80

# reset entrypoint to be a bash shell
ENTRYPOINT []
CMD ["fastapi", "run", "--port", "80", "./api/src/Portfolio/main.py"]

