---
permalink: /
title: "👋🏼 Hello there, I’m Jonathan"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

👨🏻‍💻 I’m **Dr Jonathan Windle**, a **Research Scientist** at [Epic Games](https://www.epicgames.com/site/en-US/home), based in London.

🔬 I work on **speech-driven animation using AI**. My work on [EpicADA](/publication/epicada) (SIGGRAPH 2025) ships in Unreal Engine as MetaHuman audio-driven animation.

🎓 PhD from the [University of East Anglia](https://www.uea.ac.uk/), on automatic character animation for digital humans.

News/Updates
===
{% assign offs = site.news.size | minus: 3 %}
{% for post in site.news reversed limit: 3 offset: offs %}
  {% include archive-news.html %}
{% endfor %}
<a class="btn btn-primary" data-toggle="collapse" href="{{ base_path }}/news" role="button" aria-expanded="false" aria-controls="collapseExample">
  See More
</a>