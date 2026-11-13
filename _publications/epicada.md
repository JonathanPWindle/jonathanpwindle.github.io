---
title: "EpicADA: Controllable and Expressive Audio-Driven Animation"
collection: publications
permalink: /publication/epicada
excerpt: 'EpicADA generates expressive, realistic full face, tongue and head animation from speech audio, animating MetaHuman rig controls directly. It ships in Unreal Engine as MetaHuman audio-driven animation.'
date: August 2025
venue: "SIGGRAPH Conference Papers '25"
paperurl: 'https://dl.acm.org/doi/full/10.1145/3721238.3730711'
citation: 'S. Taylor, S. Medina, J. Windle, E. Saez, and I. Matthews, “EpicADA: Controllable and Expressive Audio-Driven Animation,” in SIGGRAPH Conference Papers ’25, ACM, 2025. DOI: https://doi.org/10.1145/3721238.3730711.'
---

EpicADA is a model that generates expressive, realistic animation of the full face, tongue and head from speech audio. Audio features are extracted with a pre-trained Whisper encoder and decoded into animation by recurrent networks, driving MetaHuman rig controls directly. The model is conditioned on emotion, which can either be detected automatically from the voice or set by the user. In a user study, its output was often mistaken for ground-truth performance capture.

The model has shipped in Unreal Engine as MetaHuman audio-driven animation, and continues to be updated.
