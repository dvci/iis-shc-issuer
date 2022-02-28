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

The search for a patient will always require a first name, last name, and date of birth. If those fields lead to an exact match with a patient in the IIS, a [SMART Health Card](https://smarthealth.cards) will be returned. If there are multiple patients who match the initial credentials, additional information will be required to help correctly retrieve the exact patient. 

Displayed fields and required fields can be toggled using the `formConfig` object in `client/src/components/Form/formConfig.js`. `firstName`, `lastName`, and `selectedDate` must be displayed and requuired for the a patient to be returned by the IIS.

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
