---
title: "Pose augmentation: Mirror the right way"
collection: publications
permalink: /publication/pose-augmentation
excerpt: 'This paper investigates the effect of lateral mirroring as a means of data augmentation for 3D poses in multi-speaker, speech-to-motion modelling.'
date: September 2022
venue: "IVA '22: Proceedings of the 22nd ACM International Conference on Intelligent Virtual Agents"
paperurl: 'https://dl.acm.org/doi/abs/10.1145/3514197.3549677'
teaser: pose.png
citation: 'Windle, J., Taylor, S., Greenwood, D., & Matthews, I. (2022, September). Pose augmentation: Mirror the right way. In Proceedings of the 22nd ACM International Conference on Intelligent Virtual Agents (pp. 1-3).'
---


We demonstrate an effective method of augmenting speech animation data, and show comparable performance to double the quantity of real data. We investigate the effect of lateral mirroring as a means of data augmentation for 3D poses in multi-speaker, speech-to-motion modelling. Our approach uses a bi-directional LSTM to generate 3D joint positions from audio features extracted using problem-agnostic speech encoder (PASE+) [7]. We demonstrate that naive mirroring for augmentation has a detrimental effect on model performance. We show our method of providing a virtual speaker identity embedding improved performance over no augmentation and was competitive with a model trained on an equal number of samples of real data.
