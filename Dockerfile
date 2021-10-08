# syntax=docker/dockerfile:1
FROM ruby:2.7.4

WORKDIR /usr/src/app

# Set environment for production mode build
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

# Operating system dependencies
# Add -k to disable ssl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg -o /root/yarn-pubkey.gpg && apt-key add /root/yarn-pubkey.gpg
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y --no-install-recommends nodejs yarn

# Install Ruby Dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Install JavaScript Dependencies
COPY package.json yarn.lock ./
# Uncomment this line to disable ssl
# RUN yarn config set "strict-ssl" false
RUN yarn install --check-files

# Set up working directory
COPY . .

# Compile for production build
RUN yarn build

# Configure the main process to run when running the image
EXPOSE 5000
CMD bundle exec rails s port 5000
