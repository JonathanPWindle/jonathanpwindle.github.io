---
title: "The UEA Digital Humans entry to the GENEA Challenge 2023"
collection: publications
permalink: /publication/genea23
excerpt: "This paper adapts the Transformer-XL architecture for dyadic gesture generation by adding a cross-attention module that integrates the interlocutor’s speech with that of the main-agent."
date: October 2023
venue: 'International Conference on Multimodal Interaction'
paperurl: 'https://dl.acm.org/doi/abs/10.1145/3577190.3616116'
teaser: "genea23.png"
citation: 'Windle, J., Matthews, I., Milner, B., & Taylor, S. (2023, October). The UEA Digital Humans entry to the GENEA Challenge 2023. In Proceedings of the 25th International Conference on Multimodal Interaction (pp. 802-810).'
---

This paper describes our entry to the GENEA (Generation and Evaluation of Non-verbal Behaviour for Embodied Agents) Challenge 2023. This year’s challenge focuses on generating gestures in a dyadic setting – predicting a main-agent’s motion from the speech of both the main-agent and an interlocutor. We adapt a Transformer-XL architecture for this task by adding a cross-attention module that integrates the interlocutor’s speech with that of the main-agent. Our model is conditioned on speech audio (encoded using PASE+), text (encoded using FastText) and a speaker identity label, and is able to generate smooth and speech appropriate gestures for a given identity. We consider the GENEA Challenge user study results and present a discussion of our model strengths and where improvements can be made.
