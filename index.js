const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const { WebClient } = require('@slack/web-api');

const github = new GitHub(process.env.GITHUB_TOKEN);

async function getSha() {
    if (context.eventName === 'pull_request') {
        const prCommit = await github.git.getCommit({
            owner: context.repo.owner,
            repo: context.repo.repo,
            commit_sha: context.sha
        });

        return prCommit.data.parents[1].sha;
    }

    return context.sha;
}

async function getCheckSuite(sha) {
    console.log(`Getting check-suite for commit ${sha}`);

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
    const web = new WebClient(process.env.SLACK_TOKEN);

    return await web.chat.postMessage({
        channel: channel,
        attachments: [
            {
                text: `${context.workflow} for <${checkSuite.url}|${context.repo.repo}> by user ${context.actor} failed`,
                color: '#cc0000'
            }
        ]
    });
}

async function run() {
    try {
        const slackChannel = core.getInput('slack-channel');

        const checkSuite = await getCheckSuite(await getSha());
        return await sendSlackMessage(slackChannel, checkSuite);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();