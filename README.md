# eCourse

A sleek and customizable website template designed for effortless self-hosting of your online course. this template provides a user-friendly foundation for educators and content creators to showcase their expertise.

![eCourse](https://github.com/Ilyas-Codes/eCourse/blob/main/client/public/ecourse.jpg)

[Demo](https://e-course.pages.dev/)

Use the following credentials for testing the demo:

**Username:** `admin`  
**Password:** `ecourseadmin`

## Tech Stack

**UI Framework** - [Svelte](https://svelte.dev/)

**Styling** - [TailwindCSS](https://tailwindcss.com/)

**Icons** - [Iconify](https://iconify.design/)

**Frontend Hosting** - [Cloudflare Pages](https://pages.cloudflare.com/)

**Backend** - [PocketBase](https://pocketbase.io/)

**Backend hosting** - [PocketHost](https://pockethost.io/)

## Getting Started

The easiest way to get started is to run this project locally, simply run the following commands in your desired directory.

```bash
# Clone this repository
git clone https://github.com/Ilyas-Codes/eCourse.git

# Start the PocketBase server
cd server
./pocketbase serve
# Open up the Admin UI and sign in with the following credentials: admin@ecourse.com & ecourseadmin

# Start the vite server
cd client
npm install && npm run dev
```

## Customization

All the landing page content (logo, hero headline etc) can be customized from the `config.json` file in the `client/src` directory.

You can also change the accent and background colors used throughout the app from the `tailwind.config.js` file in the `client` directory.

The PocketBase backend can basically be treated as a CMS for managing your course's content, the demo provided in this repo comes with 2 collections "modules" & "lessons" which include some placeholder data, you can simply change the data with your own. and you're good to go!

## Deployment

The most straightforward method to deploy eCourse is by running the command `npm run build` in the `client` directory. This command spits out a `dist` folder containing an optimized and production-ready bundle. after that, you can create a `pb_public` directory within the `server` directory and place the contents of the `dist` folder inside of there. With these steps completed, you are now ready to deploy your entire application, encompassing both the frontend and backend, on any cloud service provider. For those seeking free alternatives, consider [PocketHost](https://pockethost.io/) and [Fly.io](https://fly.io/).

## Feedback & Suggestions

Feel free to open an issue/PR if you find any bugs or want to request new features.

## License

Licensed under the MIT License, Copyright © 2023

## Need a frontend developer?

Besides contributing free stuff to the community, I'm also available to assist others in launching their apps and MVPs. If you're considering hiring a frontend dev (can do some backend too), feel free to DM me on [Reddit](https://www.reddit.com/user/IlyasCodes) or Leave me an [Email](mailto:ilyas.sahrane@icloud.com).
