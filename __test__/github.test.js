const { GitHub } = require('@actions/github');

describe('Test GitHub API', () => {
    test('PR commit has two parents', async () => {
        const token = process.env.GITHUB_TOKEN; // set it manually before running the test

        const github = new GitHub(token);

        const prCommit = await github.git.getCommit({
            owner: 'olmero',
            repo: 'kafka-connect-event-transformer',
            commit_sha: '86b5a61d3a33ddd00d7de129b336ba26daeb06f9'
        });

        expect(prCommit.data.parents.length).toEqual(2);
    });
});
