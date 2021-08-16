# syntax=docker/dockerfile:1
FROM ruby:2.7.4

RUN mkdir /code
WORKDIR /code
COPY . /code

RUN bundle install

# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Run yarn install to install JavaScript dependencies.
RUN yarn install --check-files

EXPOSE 4000

# Configure the main process to run when running the image
CMD bundle exec rails s
