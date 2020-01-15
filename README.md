# check-failure-slack-notification

GitHub action to report a check failure to Slack.


## Usage

```
- name: Publish Build Status to Slack
  if: failed()
  uses: olmero/check-failure-slack-notification@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} 
    SLACK_TOKEN: ${{ secrets.OLMERO_SLACK_BOT_TOKEN }} 
  with:
    slack-channel: 'CSFC2LPT2'
```
