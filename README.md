
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

Based upon the fact skill template (Node JS). It parses https://news.ycombinator.com/ to present you a random top tech story.

Initially used https://github.com/HackerNews/API to fetch top stories but it was too slow.
So used request and cheerio packages to get html and parse text respectively.Also used deasync package to turn async function into sync.
