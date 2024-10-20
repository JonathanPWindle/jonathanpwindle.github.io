---
title: "LLAniMAtion: LLAMA Driven Gesture Animation"
collection: publications
permalink: /publication/llanimation
excerpt: 'This paper experiments with using Large-Language Model (LLM) features for gesture generation that are extracted from text using Llama2.'
date: October 2024
venue: "Computer Graphics Forum"
teaser: llanimation.png
paperurl: 'https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.15167'
citation: 'J. Windle, I. Matthews, and S. Taylor, “Llanimation: Llama driven gesture animation,” Computer Graphics Forum, vol. n/a,
no. n/a, e15167, DOI: https://doi.org/10.1111/cgf.15167. eprint: https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.15167.'
---

Co-speech gesturing is an important modality in conversation, providing context and social cues. In character animation, appropriate and synchronised gestures add realism, and can make interactive agents more engaging. Historically, methods for automatically generating gestures were predominantly audio-driven, exploiting the prosodic and speech-related content that is encoded in the audio signal. In this paper we instead experiment with using Large-Language Model (LLM) features for gesture generation that are extracted from text using Llama2. We compare against audio features, and explore combining the two modalities in both objective tests and a user study. Surprisingly, our results show that Llama2 features on their own perform significantly better than audio features and that including both modalities yields no significant difference to using Llama2 features in isolation. We demonstrate that the Llama2 based model can generate both beat and semantic gestures without any audio input, suggesting LLMs can provide rich encodings that are well suited for gesture generation.