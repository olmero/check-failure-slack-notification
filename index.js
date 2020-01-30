const core = require('@actions/core');
const { GitHub, context } = require('@actions/github')
const { WebClient } = require('@slack/web-api');

function getSha() {
    // if (context.eventName === 'pull_request') {
    //     return context.event.name;
    // }

    return context.sha;
}

async function getCheckSuite(sha) {
    const github = new GitHub(process.env.GITHUB_TOKEN)

    const response = await github.checks.listSuitesForRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: sha,
        app_id: 15368
    });

    const checkSuiteId = response.data.check_suites[0].id;

    return {
        id: checkSuiteId,
        url: `https://github.com/${context.repo.owner}/${context.repo.repo}/commit/${sha}/checks?check_suite_id=${checkSuiteId}`
    }
}

async function sendSlackMessage(channel, checkSuite) {
    const slack = new Slack(process.env.SLACK_TOKEN);

    return await web.chat.postMessage({
        channel: channel,
        text: `Check for <${checkSuite.url}|${context.repo.repo}> failed`,
        color: '#cc0000'
    });
}

async function run() {
    try {
        const slackChannel = core.getInput('slack-channel');

        const checkSuite = await getCheckSuite(getSha());
        return await sendSlackMessage(slackChannel, checkSuite);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();