# check-failure-slack-notification
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Folmero%2Fcheck-failure-slack-notification.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Folmero%2Fcheck-failure-slack-notification?ref=badge_shield)


GitHub action to report a check failure to Slack.


## Usage

```yaml
- name: Publish Build Status to Slack
  if: failed()
  uses: olmero/check-failure-slack-notification@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
    SLACK_TOKEN: ${{ secrets.OLMERO_SLACK_BOT_TOKEN }} 
  with:
    slack-channel: 'CSFC2LPT2'
```


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Folmero%2Fcheck-failure-slack-notification.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Folmero%2Fcheck-failure-slack-notification?ref=badge_large)