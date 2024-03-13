---
permalink: /
title: "👋🏼 Hello there, I’m Jonathan"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

👨🏻‍💻 I’m a final year PhD student at the [University of East Anglia](https://www.uea.ac.uk/)

🔬 My research interests are in **Multimodal Generative AI**, particularly using audio and text for speech-to-gesture!

📚 I’m currently finishing my PhD Thesis titled Digital Humans: Automatic Character Animation, aiming to submit in April.

👔 Prior to the PhD, I was a **Research Associate** at the [University of East Anglia](https://www.uea.ac.uk/) focusing on the use of AI for user identification using keystroke dynamics. In 2017-2018 I was a Software Developer Intern at Boeing Defence UK where I gained experienced in industry leading Research and Development business area.

News
===
{% for post in site.news reversed %}
  {% include archive-news.html %}
{% endfor %}
