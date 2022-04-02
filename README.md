[LIVE DEMO](https://github-graphql-api-test.vercel.app/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What you will find here

You will be able to register and login with a valid github user

Once you logged in, you'll see your repositories and starred repositories, also there's a tab "Favorite Repositories" this is not form GitHub but there you can just add repos as favorites and will be stored in a postgres DB, it's just to add, the functionality to remove isn't working yet.

You also can search for valid GitHub usernames and see kind of a simple profile with some info of the user.

## Note

There kind of a problem with the pagination from the GitHub GraphQL API, I don't know yet how to solve it. You can click "next" to fetch more repositories and paginate, but once you click "prev" if goes back to page one, I was testing this in the GraphiQL explorer from github and is the same thing.
