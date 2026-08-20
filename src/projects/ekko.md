---
title: Ekko
description: An open-source framework for deploying realtime infrastructure with in-transit message processing.
date: 2021-06-01
link: https://ekko-realtime.com/
linkLabel: Case study
repo: https://github.com/ekko-realtime
video: https://www.youtube-nocookie.com/embed/c9YtUud3u0o
pinned: true
---

<img src="/projects/ekko-logo.png" alt="Ekko logo" width="88" />

Ekko is an open-source framework that provides realtime infrastructure and
in-transit message processing for web applications. It lets developers deploy
scalable realtime infrastructure to AWS with a CLI tool, and process messages
*as they move through the system* using modular serverless functions.

<video autoplay loop muted playsinline src="/projects/ekko-infrastructure.mp4" aria-label="Animated diagram of Ekko's realtime infrastructure"></video>

## What it does

- Many-to-many publish/subscribe over WebSockets
- Ekko Functions: serverless, reusable message transformations applied in transit
- Message routing based on channel-function associations
- Automatic horizontal scaling, with the cloud infrastructure complexity
  abstracted away behind automated deployment

Deploying the whole thing takes a single command from the Ekko CLI:

<video controls muted playsinline preload="metadata" poster="/projects/ekko-deploy-poster.jpg" src="/projects/ekko-deploy-teal.mp4" style="border-radius: 12px;" aria-label="Terminal recording of deploying Ekko from the CLI"></video>

## Learn more

I gave a talk about Ekko at JS Monthly:

<iframe class="video-embed" loading="lazy" src="https://www.youtube-nocookie.com/embed/c9YtUud3u0o" title="Ekko talk at JS Monthly" allowfullscreen></iframe>

If you want the full engineering story, problem space, architecture, and
trade-offs, check out the [case study](https://ekko-realtime.com/). The
source is on [GitHub](https://github.com/ekko-realtime). Built with Alex
Strick van Linschoten, Dorey Miller, and Drew Holbrook.
