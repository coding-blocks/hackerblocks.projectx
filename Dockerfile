FROM node:10.16.3

USER root

EXPOSE 4200 7020 7357

# install ember-cli
RUN \
    npm install -g ember-cli@3.13.0

# install curl for healthcheck
RUN \
    apt-get install curl

# Install watchman build dependencies
RUN \
	apt-get update -y &&\
	apt-get install -y python-dev

# install watchman
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v4.9.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get -qqy update \
    && apt-get -qqy install \
      google-chrome-stable \
      --no-install-recommends

RUN rm -rf /var/lib/apt/lists/* \
    /var/cache/apt/* \
    /etc/apt/sources.list.d/google-chrome.list \
    /tmp/watchman

WORKDIR /hackerblocks.projectx

COPY . .

RUN npm install

RUN ember build

CMD ["ember", "server"]


