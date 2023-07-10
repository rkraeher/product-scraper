## Web Automation Dev - Home assignment (public)

This is a private repo between me and the hiring team.
Here you can find and run code for my solution to this [assignment](https://apify.notion.site/Web-Automation-Dev-Home-assignment-public-f9be3a1c6b9543b29e5bccb9d9382a9c)

### Installation and Usage

If you want to run the program, play with different parameters, and mock data, you can clone and npm install.

Check package for scripts to

- run the program: `npm run start`
- run tests: `npm t`
- create new mock data: `npm run mock`
  NB! You can play with the mock data, especially the count if you want, but anytime you run the mock script it will overwrite the previous mockData file.

### Technologies

For mock data I used fs and faker-js packages because I wanted to have something more realistic to look at and having unique ids to use. This was helpful during testing/development and makes for a more realistic demo.

I opted to use Typescript which had a bit of config to get the program working with babel and jest. This briefly slowed me down but I think the benefits of ts for catching bugs early during development are worth the config cost.

Writing tests also made things slower in some ways but probably faster/more reliable overall as I iterated my solution. I caught multiple bugs right away because I wrote tests at every step.

### Requirements

As written, the program should receive data back from a fake api matching the specifications in the task decription. Rather than create a fake api and in order to focus on the algorithm itself, I just created some json fake data and used it to return `total`, `count`, and a list of 1000 or less `products` anytime we 'call' the fake api with a price range query parameter.

My program will execute the following tasks:

- Continually 'call' that fake api using a price range via `min` and `max` 'query parameters'
- Narrow down the price range recursively until it returns with 1000 or less products in a certain range
- Add those products within the range to a list of 'scraped products,' which will grow until we have scraped everything within whatever initial range we enter (in this case $0 - $100000)

My intuition was to recursively split each range in half until the program receives an api response with 1000 products or less. I have tracked the number of api calls directly in the module for observability purposes.

### Assumptions

- Since according to requirements we cannot pass sorting query params and we have no way of ensuring whether the products sent back in the `products` array property will always be the same, we must check for duplicates and we cannot proceed in some sequential order. Any sorting would have to be done by us during or after our scraping execution.
- We assume the api itself neither contains nor responds with duplicates and has a unique id to identify it
- We assume each product product has a consistent currency and singular price (i.e, no product will have a range of prices, only one price value)

### Problems

There are two current problems:

- One is a performance issue, which is currently degraded because (as is commented in the code) we are checking for duplicates. As written, without this check duplicates end up being added to the scrapedProducts list, so I would want to fix that, although we would realistically probably still be checking our own list for duplicates given that the api may itself contain duplicate data.
- Right now I don't have an implementation to prove that the entire list was scraped. I am checking for duplicates and that the scrapedProducts.length matches the mockData.length, which would initially get from calling out initial, widest range (0-100.000).
