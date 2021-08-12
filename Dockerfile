# syntax=docker/dockerfile:1
FROM ruby:2.7.4
# RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
WORKDIR /code
COPY . /code



# COPY Gemfile ./
# COPY Gemfile.lock ./
RUN bundle install
# COPY package.json ./
# COPY yarn.lock ./

# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Run yarn install to install JavaScript dependencies.
RUN yarn install --check-files


# Add a script to be executed every time the container starts.
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
EXPOSE 8080

# Configure the main process to run when running the image
CMD bundle exec rails s