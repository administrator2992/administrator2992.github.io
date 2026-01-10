<!-- # AScanAI - Spatiotemporal Rule-Based Expert System for Continuous Learning of Object Detection in Retail

**Date:** 11 August 2025 -->

**Source Code**: [GitHub](https://github.com/administrator2992/AScanAI)

---

## 1. Introduction

Retail object detection presents a significant challenge due to the high visual similarity between products—items with nearly identical packaging, colors, or shapes often confuse standard AI models. Traditional deep learning approaches struggle with this problem, requiring frequent retraining and lacking the contextual reasoning needed for accurate identification.

Our work introduces **AScanAI**, an AI system that solves this problem by combining *Deep Learning* (YOLOv11) with a *Rule-Based Expert System*. This hybrid approach leverages the pattern recognition strengths of neural networks while applying symbolic logic to validate and correct predictions in real-time.

Key contributions of our work include:

1. **Hybrid Intelligence:** We combine neural detection with symbolic logic to achieve higher accuracy than either approach alone.
2. **Continuous Learning:** Our system updates its *Feature Bank* independently without heavy *retraining*, enabling rapid adaptation to new products.
3. **Spatiotemporal Logic:** We employ spatial memory to maintain object ID consistency across frames, eliminating flickering and misidentification.

---

## 2. Literature Review

### 2.1 Object Detection in Retail

Object detection in retail environments has emerged as a critical area of computer vision research, driven by the need for automated inventory management and customer behavior analysis. **Wei et al. (2020)** provide a comprehensive survey of deep learning techniques for retail product recognition, identifying key challenges such as fine-grained classification, occlusion handling, and the need for large-scale training datasets [1]. Their work highlights that traditional CNN-based approaches often struggle with visually similar products—a core problem that our system addresses.

**Cai et al. (2020)** rethink the conventional object detection paradigm for retail stores, proposing methods to handle the unique characteristics of densely packed shelf environments [2]. Similarly, **Fuchs et al. (2019)** explore CNNs for identifying packaged products, demonstrating that convolutional architectures can achieve high accuracy when sufficient training data is available [3]. However, both studies acknowledge the limitation of static models that cannot adapt to new product variations without retraining.

More recent work by **Desmarescaux et al. (2025)** reviews one-shot detection methods specifically designed for retail and warehouse products, addressing scenarios where only a single reference image is available [4]. **Zangana (2025)** extends this to behavior analytics, combining object detection with visual intelligence for comprehensive retail monitoring [5]. Meanwhile, **Bagyammal et al. (2024)** and **Pannoy et al. (2024)** demonstrate the effectiveness of single-stage detectors like YOLO in shelf image analysis, achieving real-time performance suitable for practical deployment [6, 7].

### 2.2 Rule-Based Expert Systems

Rule-based expert systems represent a classical approach to artificial intelligence, encoding domain knowledge as explicit conditional rules. **Yurin et al. (2018)** propose a model-driven development approach for designing such systems, emphasizing the importance of structured knowledge representation and maintainability [8]. Their framework demonstrates that rule-based systems can effectively complement data-driven approaches by providing interpretable decision-making logic.

In the context of our work, the expert system component serves as a validation layer that applies domain-specific rules—such as spatial constraints and temporal consistency—that are difficult to learn purely from data. This hybrid approach aligns with the broader trend of combining symbolic AI with neural networks to leverage the strengths of both paradigms.

### 2.3 Continuous Learning

Continuous learning, also known as lifelong or incremental learning, addresses the challenge of updating models with new knowledge without forgetting previously learned information. **Lomonaco and Maltoni (2017)** introduce the CORe50 dataset as a benchmark for continuous object recognition, establishing evaluation protocols that measure both accuracy and forgetting [9]. This foundational work motivates the design of systems that can learn incrementally in real-world scenarios.

In the domain of object detection, **Wang et al. (2020)** formalize the problem of lifelong object detection, proposing architectures that maintain performance across sequential learning phases [10]. **Wang et al. (2021)** extend this to online settings with their Wanderlust system, demonstrating continual learning in real-world environments where new object classes appear dynamically [11]. **Liu et al. (2023)** propose the Continual Detection Transformer (CDeT), which adapts the popular DETR architecture for incremental learning scenarios [12].

For autonomous systems, **Shieh et al. (2020)** apply experience replay strategies to maintain object detection performance in self-driving vehicles [13], while **Liu et al. (2024)** explore semi-supervised approaches for 3D detection in mobile robotics [14]. **Michieli and Özay (2023)** specifically address online continual learning for robust indoor recognition, demonstrating practical applicability in constrained environments [15]. **Brust et al. (2019)** propose active learning strategies that selectively query informative samples, reducing annotation costs while maintaining model performance [16].

The integration of re-identification (ReID) with detection has also received significant attention. **He et al. (2021)** introduce TransReID, a transformer-based approach that achieves state-of-the-art performance on person re-identification benchmarks [17]. **Liang et al. (2022)** and **Chan et al. (2024)** explore the relationship between detection and ReID in multi-object tracking, proposing fusion strategies that benefit both tasks [18, 19]. Our spatiotemporal approach draws inspiration from these works while simplifying the ReID problem through physical location anchoring.

---

## 3. System Architecture

The system is designed with a modular, layered approach that separates visual perception from logical decision-making. The figure above the article illustrates the overall architecture, showing how data flows from camera input through the neural network to the expert system layer.

<!-- ![Figure 1: AScanAI System Architecture - Data flows from the camera through the YOLO perception layer, then branches to both the Location Matcher (for spatiotemporal ReID) and Feature Bank (for continuous learning via FAISS), before being validated by the Logic Layer and output to the POS interface.](/assets/ascanai_architecture.png) -->

### 3.1 Core Algorithmic Components

To enhance the robustness of the standard detection pipeline, the system integrates two specialized algorithmic modules: the Location Matcher for spatiotemporal re-identification and the Feature Bank for continuous semantic learning.

#### 3.1.1 Location Matcher (Spatiotemporal ReID)

The Location Matcher acts as a deterministic **Spatiotemporal Re-Identification (ReID)** system. Unlike traditional trackers that rely solely on visual appearance which can fail when differentiating between identical-looking items like two separate pieces of "Lemper" this module uses physical space as a permanent anchor for identity. This approach is inspired by recent advances in detection-ReID fusion [18, 19], but simplifies the problem by leveraging fixed camera positions in retail environments.

The following describes how the Location Matcher processes each detection to maintain consistent object identity:

**Mechanism of Action:**

1. **Spatial Mapping:** The module translates volatile 2D pixel coordinates from the camera sensor into stable, physical "Location IDs" using a calibrated coordinate map.
2. **Spatiotemporal Logic:** The system assumes that an object cannot teleport. By defining valid physical slots (e.g., "Tray 1" for Lemper), the system performs ReID by checking if a current detection falls within the spatial radius of that known location.
3. **Identity Locking:** If a "Lemper" detected at time *t₁* and a "Lemper" detected at time *t₂* both map to the same physical slot, they are confirmed as the same unique object. This effectively solves the ReID problem in crowded environments without requiring heavy deep-learning feature matching for every frame.

#### 3.1.2 Feature Bank (Continuous Learning via FAISS)

The Feature Bank serves as the system's evolving long-term memory, implementing a form of online continual learning [15]. It is built using **FAISS (Facebook AI Similarity Search)**, a library optimized for efficient similarity search and clustering of dense vectors. This component enables the system to learn new variations of products like "Lapis Cake" incrementally, addressing the catastrophic forgetting problem discussed in lifelong learning literature [10, 11].

The following describes how the Feature Bank enables real-time learning without retraining:

**Mechanism of Action:**

1. **Vectorization:** Every detected object, such as a "Lapis Cake," is passed through a secondary CNN encoder to generate a high-dimensional feature vector.
2. **Similarity Search (FAISS):** The system queries the FAISS index to find the nearest neighbors in the vector space. If the primary YOLO model is uncertain (e.g., 40% confidence) but the vector matches a stored "Lapis Cake" vector with 99% similarity, the system can confidently classify it as "Lapis Cake."
3. **Continuous Learning Loop:** When the system encounters a high-confidence detection of a "Lemper" that is visually distinct from existing entries (e.g., a "Lemper" with slightly darker banana leaf wrapping), it automatically indexes this new vector into FAISS. This mirrors the experience replay strategy proposed by Shieh et al. [13], allowing the system to "learn" new product variations in real-time without offline retraining.

---

## 4. Algorithmic Methodology

This section outlines the programming logic employed to enhance detection accuracy beyond standard YOLO outputs.

### 4.1 Algorithm 1: Confidence Adjustment

The system does not fully trust raw AI results. This algorithm provides "reward" or "penalty" on confidence scores based on correction history, implementing a form of active learning feedback loop [16].

```
ALGORITHM: ConfidenceAdjustment

INPUT:  Detection d, History H, Correction_DB C
OUTPUT: Adjusted Detection d

1. Calculate Feature Hash
   f_hash ← ComputeHash(d.image_crop)

2. Check Correction Database (Exact Match)
   IF f_hash EXISTS IN Correction_DB THEN
       // Case: Object has been manually corrected before
       match ← Correction_DB.get(f_hash)
       d.label  ← match.label
       d.score  ← MIN(1.0, match.score × 1.10)  // REWARD
       d.source ← "Corrected"
   ELSE
       // Case: Pure YOLO prediction
       d.label ← yolo_prediction.label
       d.score ← yolo_prediction.conf
       
       // Penalty for frequently misclassified classes
       IF d.label IN Conflict_List THEN
           d.score ← d.score × 0.90  // PENALTY
       END IF
   END IF

3. Hysteresis Check (Prevent Flickering)
   IF d.label ≠ H.last_label_at_location THEN
       // If label changes suddenly, reduce old label score
       H.last_label_score ← H.last_label_score × 0.90
   END IF

RETURN d
```

### 4.2 Algorithm 2: Continuous Learning Mechanism

This algorithm runs in the background to enrich the knowledge base (*Feature Bank*) without constant manual intervention. It implements an online continual learning strategy similar to those proposed for autonomous systems [13, 14].

```
ALGORITHM: ContinousLearning

REQUIRE:  Unified_Object u, Feature_Bank B
PARAMETER: Learning_Threshold = 0.85
          Similarity_Threshold = 0.95

1. Quality Evaluation of Detection
   IF u.confidence > Learning_Threshold AND u.is_stable THEN
       
       // Execute asynchronously to avoid blocking main thread
       START_ASYNC_PROCESS:
           
           // Step A: Feature Extraction
           v ← ExtractFeature(u.image)
           
           // Step B: Redundancy Validation
           // Find most similar feature in database
           (nearest, similarity) ← B.Query(v)
           
           // Step C: Save if feature is sufficiently unique
           // This adds visual variation to the knowledge base
           IF similarity < Similarity_Threshold THEN
               B.Add(u.label, v)
               Log("Auto-learned new feature for " + u.label)
           END IF
       
       END_ASYNC_PROCESS
   END IF
```

---

## 5. Technical Implementation Specifications

The system is developed with a carefully selected technology stack, optimized for real-time performance in edge computing environments.

### Programming Language

We chose **Python 3.9+** as our primary development language due to its extensive ecosystem for machine learning and computer vision. Python provides seamless integration with deep learning frameworks, offers readable syntax for rapid prototyping, and has mature libraries for image processing and numerical computation. Its widespread adoption in the AI community also ensures long-term maintainability and access to community support.

### AI Acceleration

For hardware acceleration, we deploy the system on the **NanoPC-T6** board equipped with the **Rockchip RK3588 NPU** (Neural Processing Unit). This choice enables real-time inference at the edge without relying on cloud connectivity. The RK3588's dedicated NPU delivers up to 6 TOPS (Tera Operations Per Second) of AI performance while maintaining low power consumption—critical for retail environments where the system must operate continuously. We convert our YOLOv11 model to the **RKNN format** to fully utilize the NPU's capabilities.

### Process Management

The system is designed to run as a long-running process, with the primary application and background services running in separate threads. This architecture ensures that the system can handle multiple tasks simultaneously while maintaining a responsive user interface. The primary application is responsible for managing the user interface and coordinating the various components of the system, while the background services handle tasks such as feature extraction and similarity search.

To ensure smooth user experience, we implement a **multiprocessing architecture** using Python's `multiprocessing` module. This design separates the heavy inference workload (running on dedicated worker processes) from the GUI thread. By isolating compute-intensive tasks, the Point of Sale interface remains responsive even during complex detection operations. This architecture also allows us to scale inference workers independently based on hardware capabilities.

### Data Storage

Our storage strategy employs a two-tier approach optimized for different access patterns:

- **Hot Storage (Redis):** We use Redis as an in-memory database for feature hash lookups and real-time matching. Redis provides sub-millisecond response times, which is essential for the Confidence Adjustment algorithm that must validate every detection against the correction history. Its key-value structure aligns perfectly with our feature hash indexing requirements.

- **Cold Storage (JSON):** For long-term persistence and system recovery, we store configuration data and Feature Bank snapshots in JSON format. JSON offers human-readable structure for debugging, easy portability across systems, and compatibility with version control. This ensures that the learned knowledge is preserved across system restarts and can be backed up or transferred to other installations.

---

## 6. Demo Video

[![Demo Video](/assets/percobaan_12-8-25.png)](/assets/percobaan_12-8-25.mp4)

---

## 7. Conclusion

This work presents **AScanAI**, a hybrid AI system that addresses the challenge of retail object detection in environments with high visual similarity between products. By combining deep learning (YOLOv11) with a rule-based expert system, our approach achieves several key advantages over traditional methods:

1. **Improved Accuracy:** The Confidence Adjustment algorithm enhances detection reliability by learning from correction history, rewarding accurate predictions and penalizing frequently misclassified items.
2. **Continuous Adaptation:** The Feature Bank powered by FAISS enables the system to learn new product variations in real-time without requiring offline retraining, addressing the catastrophic forgetting problem common in static models.
3. **Robust Re-Identification:** The Location Matcher leverages spatiotemporal logic to maintain object identity consistency, eliminating flickering and misidentification issues that plague appearance-based trackers.
4. **Edge Deployment:** By utilizing the Rockchip RK3588 NPU, the system achieves real-time performance suitable for practical retail environments while maintaining low power consumption.

---

**References:**

[1] Y. Wei, S. N. Tran, S. Xu, B. H. Kang, and M. Springer, "Deep Learning for Retail Product Recognition: Challenges and Techniques," *Computational Intelligence and Neuroscience*, 2020.

[2] Y. Cai, W. Long, L. Zhang, D. Du, W. Wang, and P. Zhu, "Rethinking Object Detection in Retail Stores," *AAAI Conference on Artificial Intelligence*, 2020.

[3] K. Fuchs, T. Grundmann, and E. Fleisch, "Towards Identification of Packaged Products via Computer Vision," *IoT*, 2019.

[4] M. Desmarescaux, W. Kaddah, A. Alfalou, and J.-C. Deconninck, "A Review: One-Shot Object Detection Methods for Conditional Detection of Retail and Warehouse Products," *Neural Processing Letters*, 2025.

[5] H. M. Zangana, "Object Detection and Visual Intelligence in Retail Environments," *Intelligent Methods in Engineering Sciences*, 2025.

[6] T. Bagyammal et al., "Object Detection in Shelf Image of the Retail store using Single Stage Detector," *ICRAIS*, 2024.

[7] N. Pannoy, S. Nonsiri, and S. Makdee, "Object Detection for Retail Product Recognition," *ICBIR*, 2024.

[8] A. Y. Yurin, N. O. Dorodnykh, O. Nikolaychuk, and M. A. Grishenko, "Designing rule-based expert systems with the aid of the model-driven development approach," *Expert Systems*, 2018.

[9] V. Lomonaco and D. Maltoni, "CORe50: a New Dataset and Benchmark for Continuous Object Recognition," *CoRL*, 2017.

[10] Z. Wang, S. Chang, N. Sosa, H. F. Hamann, and D. Cox, "Lifelong Object Detection," *arXiv*, 2020.

[11] J. Wang, X. Wang, Y. Shang-Guan, and A. Gupta, "Wanderlust: Online Continual Object Detection in the Real World," *ICCV*, 2021.

[12] Y. Liu, B. Schiele, A. Vedaldi, and C. Rupprecht, "Continual Detection Transformer for Incremental Object Detection," *arXiv*, 2023.

[13] J.-L. Shieh et al., "Continual Learning Strategy in One-Stage Object Detection Framework Based on Experience Replay," *Sensors*, 2020.

[14] B. Liu, D. Yao, R. Yang, Z. Yan, and T. Yang, "Semi-Supervised Online Continual Learning for 3D Object Detection in Mobile Robotics," *JIRS*, 2024.

[15] U. Michieli and M. Özay, "Online Continual Learning for Robust Indoor Object Recognition," *IROS*, 2023.

[16] C.-A. Brust, C. Käding, and J. Denzler, "Active Learning for Deep Object Detection," *VISIGRAPP*, 2019.

[17] S. He, H. Luo, P. Wang, F. Wang, H. Li, and W. Jiang, "TransReID: Transformer-based Object Re-Identification," *ICCV*, 2021.

[18] C. Liang et al., "Rethinking the Competition Between Detection and ReID in Multiobject Tracking," *IEEE TIP*, 2022.

[19] S. Chan, C. Qiu, D. Wu, J. Hu, A. A. Heidari, and H. Chen, "Fusion detection and ReID embedding with hybrid attention for multi-object tracking," *Neurocomputing*, 2024.
