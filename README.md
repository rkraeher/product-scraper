## Web Automation Dev - Home assignment solution

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

### Assumptions

- Since according to requirements we cannot pass sorting query params and we have no way of ensuring whether the products sent back in the `products` array property will always be the same, we must check for duplicates and we cannot proceed in some sequential order. Any sorting would have to be done by us during or after our scraping execution.
- We assume the api itself does not send duplicates and so each product has a unique id to identify it
- We assume each product has a consistent currency and singular price (i.e, no product will have a range of prices, only one price value)

### Conclusions

Notice that we have 28 api calls, whereas the minimum possible for 9999 products should be 10 (1000 products a call)
We exceed the minimum in my solution because some extra, recursive calls must be made initially, in order to get
a small enough price range that returns 1000 or less products. This is obviously not ideal, but on the other hand we should expect more than the absolute minimum, since we have no way of knowing in advance how many products are within certain ranges, and indeed some price ranges may contain more than 1000 products (there are probably many products in the 0-500 range, and fewer in the 75000-100000, etc.).

A slightly different approach can be seen in the example provided on Apify docs for scraping websites with limited pagination: https://docs.apify.com/academy/advanced-web-scraping/scraping-paginated-sites#using-filter-ranges

I could modify my solution to select some initial reasonable pivot ranges like in the example and thereby avoid several api calls that have very large initial ranges (0-100000).

Nevertheless, notice that my recursive solution is in principle quite similar to the documented example.
