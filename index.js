const path = require('path');
const Trello = require('node-trello');
const { exec } = require('child_process');

class ControlDeckTrello {
  constructor(streamdeck, buttonId, options) {
    this.streamdeck = streamdeck;
    this.options = options;
    this.buttonId = buttonId;
    this.trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

    this.updateButton(false);

    this.getTrelloStatus();
    setInterval(() => {
      this.getTrelloStatus();
    }, 5000);

    this.trello.get('/1/lists/' + options.list_id, (err, data) => {
      this.trello.get('/1/boards/' + data.idBoard, (err, data) => {
        this.boardUrl = data.url;
      });
    });

    streamdeck.on('down', keyIndex => {
      if (keyIndex === buttonId) {
        exec('open ' + this.boardUrl);
      }
    });
  }

  getTrelloStatus() {
    this.trello.get(
      `/1/lists/${this.options.list_id}/cards?fields=id,name,labels,idMembers`,
      (err, data) => {
        let matchingCards = data.filter(card => {
          let isMember = card.idMembers.includes(this.options.user_id);

          let hasLabel = !!card.labels.filter(label => {
            return label.name === this.options.label_name;
          }).length;

          return isMember && hasLabel;
        });
        this.updateButton(matchingCards.length);
      }
    );
  }

  updateButton(value) {
    let color = this.options.color ? this.options.color : [0, 255, 0];
    value
      ? this.streamdeck.fillColor(this.buttonId, ...color)
      : this.streamdeck.fillImageFromFile(
        this.buttonId,
        path.resolve(__dirname, 'trello-mark-blue.png')
      );
  }
}

module.exports = ControlDeckTrello;
