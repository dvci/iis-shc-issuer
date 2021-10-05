# syntax=docker/dockerfile:1
FROM ruby:2.7.4

WORKDIR /usr/src/app

# Set environment for production mode build
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

# Operating system dependencies
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Install Ruby Dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Install JavaScript Dependencies
COPY package.json yarn.lock ./
RUN yarn install --check-files
# Compile for production build
RUN yarn build

# Set up working directory
COPY . .

# Configure the main process to run when running the image
EXPOSE 5000
CMD bundle exec rails s port 5000
