---
title: "Speech-Driven Conversational Agents using Conditional Flow-VAE"
collection: publications
permalink: /publication/flow-vae
excerpt: 'This paper introduces the Flow-VAE model for speech-driven gesture generation.'
date: December 2021
venue: "CVMP '21: European Conference on Visual Media Production"
teaser: flow.JPG
paperurl: 'https://dl.acm.org/doi/10.1145/3485441.3485647'
citation: 'Taylor, S., Windle, J., Greenwood, D., & Matthews, I. (2021, December). Speech-driven conversational agents using conditional flow-vaes. In Proceedings of the 18th ACM SIGGRAPH European Conference on Visual Media Production (pp. 1-9).'
---

Automatic control of conversational agents has applications from animation, through human-computer interaction, to robotics. In interactive communication, an agent must move to express its own discourse, and also react naturally to incoming speech. In this paper we propose a Flow Variational Autoencoder (Flow-VAE) deep learning architecture for transforming conversational speech to body gesture, during both speaking and listening. The model uses a normalising flow to perform variational inference in an autoencoder framework and is a more expressive distribution than the Gaussian approximation of conventional variational autoencoders. Our model is non-deterministic, so can produce variations of plausible gestures for the same speech. Our evaluation demonstrates that our approach produces expressive body motion that is close to the ground truth using a fraction of the trainable parameters compared with previous state of the art. 
