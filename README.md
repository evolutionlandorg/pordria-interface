# Pordria
Pordria is an airdrop aggregator supporting ERC - 20, ERC - 721, ERC - 1155 assets to be airdropped on Ethereum, Polygon, Heco, and Crab.

## How it works

This is a permissionless airdrop protocol, which can be used by both projects and individuals to send users airdrops of various assets simply and quickly. It uses the Merkle tree to ensure that airdrops are accurately and safely claimed by users, and saves gas for projects.

## Guide

### As a cooperator

#### JSON Schema
The JSON schema ID is https://pordria.evolution.land/event-list-schema.json

**Before submit your project details, please check [event list json schema](https://pordria.evolution.land/event-list-schema.json) to follow the JSON specification.**

As long as the JSON specification is followed properly, please submit an issue via [this link](https://github.com/evolutionlandorg/pordria-interface/issues/new?assignees=&labels=add-project-request&template=add-project-request.md&title=Request%3A+add+%7BProject+name%7D).

### As a user
#### Find the project of event or airdrop

If the event or the airdrop is **from our cooperators**, please check it on [Pordria Homepage](https://pordria.evolution.land).

If you **cannot** find the event or airdrop on our website, please check the bottom of the website, then input a url which returns a result following the structure below
```json
{
 "[url]": {
    "name": "",
    "homepage": ""
  },
  ...
}
```

|  params  |  description  |
| :------: | :----: |
|  [url]   | the url of a json file and the json file should follow this [json schema](https://pordria.evolution.land/event-list-schema.json) |
|   name   |  project name  |
| homepage |  the official website url of the project manager   |

For example,
```json
{
 "https://example.com/project1.json": {
    "name": "project1 name",
    "homepage": "https://example.com"
  },
  "https://example.com/project2.json": {
    "name": "project2 name",
    "homepage": "https://example2.com"
  },
  ...
}
```
and press the button 'add a list' to import your project.

#### Claim airdrops

After you find the airdrop contract, click into the project and paste the address of the claimer into the top box. Be aware that you can also claim airdrops for others; make sure that the address you wish to claim for is valid before you do so.

The event list will be refreshed once you press 'enter' or click the 'confirm' button. If the address you input is eligible to claim an airdrop, the 'claim' button on the right side will be activated.
