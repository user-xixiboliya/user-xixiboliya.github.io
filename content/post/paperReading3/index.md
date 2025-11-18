---
title: Paper Reading 3 - VLN Section
draft: false
categories:
  - Emboieded AI
  - Paper Reading
math: true
description: 快速的从一些VLN的论文中扫过，您真的要dive into 它们吗？
resources:
  - src: "**.{png,jpg}"
    title: "Image #:counter"
    params:
      byline: ""
date: 2025-11-10T15:00:00-07:10
lastmod: 2025-11-10T16:00:00-07:20
---
# Dream to Recall: Imagination-Guided Experience Retrieval for Memory-Persistent Vision-and-Language Navigation
![](output_image/cbdfb083c1d6dd33fbd6a26dcf3b66ea.png)
- 世界模型(RSSM)的任务是：基于语言条件，想象未来导航状态：即预测 $z_{t+1},z_{t+2},…,z_{t+d}$（潜在状态）作为“如果继续导航，会发生什么/我会到哪里”。
- 同时，这些想象状态既用于“编码当前经验以存入记忆”，也用于“生成检索查询”以便后续从记忆中调取相关经验。
# Disentangling Foreground and Background for vision-Language Navigation via Online Augmentation
![](output_image/05c4c5c89e582998286b5ad121b3d33a.png)

# NaVid: Video-based VLM Plans the Next Step for Vision-and-Language Navigation
![](output_image/c71bc8acb28a77115888a8a98b77ca2b.png)

# JanusVLN：通过双重隐式记忆解耦视觉语言导航中的语义与空间性
![](output_image/066bf8884ef0d62d0e0af43bc2fa3e4b.png)
使用RGB达到导航的效果。对于图片输入，3D空间信息由VGGT得到，2D视觉编码则由Qwen VL得到。
# LaViRA: Language-Vision-Robot Actions Translation for Zero-Shot Vision Language Navigation in Continuous Environments
![](output_image/ee32e6e3a4ac58a357416c2022493489.png)