# syntax=docker/dockerfile:1
FROM ruby:2.7.4

# Set up working directory
RUN mkdir /code
WORKDIR /code
COPY . /code

# Set up for production mode build
ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

# Install gem dependencies
RUN bundle install
# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn
# Run yarn install to install JavaScript dependencies.
RUN yarn install --check-files

# Compile for production build
RUN yarn build

# Configure the main process to run when running the image
EXPOSE 5000
CMD bundle exec rails s port 5000
