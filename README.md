# IIS SMART Health Card Issuer
This is a sample SMART Health Card issuer for an IIS.

## Setup
```
bundle install
yarn install
```

## Run

#### Development Mode
```
bundle exec rails s
```
#### Docker
Clones submodules needed for dependant services. Creates Docker images for Issuer and services and starts them in containers.
```
git submodule update --init --recursive
docker-compose up -d
```

Then visit [http://localhost:5000](http://localhost:5000)

## Configuration

The search for a patient will require the first name, last name, and date of birth as the required fields. If there is a match between the initial patient and those fields, a SMART card will be returned. If there is are multiple patients with matching initial credentials, additional information will be required to help correctly retrieve the right patient. 

Some sample data that can be used - FirstName: VallisAIRA, lastName: RogersAIRA, and DoB: 07/15/2016. Additional information can be filled out as well.

## License

Copyright 2020 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
```
http://www.apache.org/licenses/LICENSE-2.0
```
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Code of Conduct

Everyone interacting in the HealthCards project's codebases, issue trackers,
chat rooms and mailing lists is expected to follow the [code of
conduct](https://github.com/dvci/iis-shc-issuer/blob/main/CODE_OF_CONDUCT.md).
