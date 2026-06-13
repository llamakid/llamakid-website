# AdMob app-ads.txt — Setup for llamakid.com

This is a handoff doc for the **llamakid.com website repo**. The goal: get AdMob to verify the iOS app **XO Fun - Tic Tac Toe** by publishing an `app-ads.txt` file on this site.

## Context

- The app is **live on the App Store**.
- AdMob's app-ads.txt verification reads the **Marketing URL** from the App Store listing, takes its root domain, and crawls `https://<domain>/app-ads.txt`.
- The App Store listing's marketing URL points at **llamakid.com**, so AdMob will crawl **`https://www.llamakid.com/app-ads.txt`**.
- app-ads.txt is an anti-fraud authorization file. It is **not required to serve ads** — it just authorizes Google as a seller of this app's inventory. So this is not launch-blocking, but it should be done.

## What needs to happen in this repo

1. Create a plain-text file named exactly **`app-ads.txt`** (no extension changes, all lowercase).
2. It must be served from the **root** of the domain — i.e. reachable at:
   ```
   https://www.llamakid.com/app-ads.txt
   ```
   **Not** under a subpath like `/privacy/app-ads.txt`. AdMob only crawls the root.
3. File contents — exactly one line (copy verbatim):
   ```
   google.com, pub-4047470119086333, DIRECT, f08c47fec0942fa0
   ```
4. It must be served as `text/plain` and return HTTP 200 at the root path. Verify after deploy:
   ```
   curl -i https://www.llamakid.com/app-ads.txt
   ```
   Confirm it returns 200 and the exact line above (no HTML wrapper, no redirect to a different domain).

### Hosting notes (depends on how llamakid.com is built)
- **Static site (Next.js / Astro / Vite / plain HTML):** drop `app-ads.txt` in the `public/` (or equivalent static root) directory so it's served at the domain root.
- **Watch for www vs apex:** AdMob uses the exact domain from the App Store listing. If the listing URL is `https://www.llamakid.com`, the file must resolve at `www.` (make sure apex→www or www→apex redirects don't 301 the `app-ads.txt` request away).

## Publisher ID — confirmed, no mismatch

The publisher ID is consistent across the app and AdMob's snippet — publish the line as-is. Verified in the iOS source:

- App ID (`project.yml`, `Info.plist`): `ca-app-pub-4047470119086333~4156796069`
- Ad Unit ID (`AdBannerView.swift`): `ca-app-pub-4047470119086333/9340684452`
- AdMob app-ads.txt snippet: `pub-4047470119086333`

All use publisher ID **`4047470119086333`**, matching the file contents above.

## After publishing

1. Confirm `curl -i https://www.llamakid.com/app-ads.txt` returns 200 with the correct line.
2. In AdMob, go to the app's app-ads.txt verification screen and click **Check for updates**.
3. Crawling can take anywhere from a few minutes to ~24 hours to reflect.
