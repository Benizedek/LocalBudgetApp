HOW TO USE THESE FILES
=======================

1. Copy the "public" folder into your project root
   (D:\Coding Main Archives\LocalBudgetApp\public)
   - If you don't have a "public" folder yet, just drop this whole folder in.

2. Copy the "assets" folder into your project root the same way
   (D:\Coding Main Archives\LocalBudgetApp\assets)

3. Replace your existing app.json with the app.json in this zip
   (it just adds the "icon" and "android.adaptiveIcon" fields to
   your existing config -- nothing else was changed)

4. Rebuild and redeploy:
     npx expo export -p web
     vercel --prod

5. On your Pixel, open the site in Chrome and look for "Install app"
   in the ⋮ menu.
