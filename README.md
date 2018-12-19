# Control Deck Plugin for Trello

This [Control Deck](https://github.com/danielmurphy/control-deck) plugin provide a single, very specific feature Trello related feature. If there are any cards on a specific list, with a specific label, and have a specific user assigned to them, a button on your Stream Deck will change to a color of your choosing. Pushing the button will open Trello to the right board.

Feel free to open up a PR with more options :)

## Install

`npm install control-deck-trello`

## Configuration

```
{
  "button_0": {
    "plugin": "control-deck-trello",
    "options": {
      "type": "label-notification",
      "list_id": "XXXXXXXXX",
      "user_id": "XXXXXXXXX",
      "label_name": "Name of Your Label",
      "color": [255, 255, 0]
    }
  }
}
```

`color` is an array of values for R, G, and B respectively.

## Secrets

The plugin expects `TRELLO_KEY` and `TRELLO_TOKEN` to be defined in your env.

You can find your key and generate a token [here](https://trello.com/app-key).

## Contributing

Pull requests welcome!
