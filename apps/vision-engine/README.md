# MediAssist Medical Vision AI & DICOM Radiology Workstation

The **Vision Engine** microservice powers in-browser medical imaging analysis, DICOM series streaming, automated pathology detection, and deep learning segmentation contours.

---

## 🩻 Modalities & Windowing Presets

| Window Preset | Window Width (W) | Window Level (L) | Clinical Focus |
| :--- | :--- | :--- | :--- |
| **Lung Window** | 1,500 HU | -600 HU | Alveolar consolidation, pneumothorax, pulmonary nodules |
| **Soft Tissue** | 400 HU | 40 HU | Mediastinum, pleural effusion, lymph nodes, solid organs |
| **Bone Window** | 2,000 HU | 500 HU | Rib fractures, cortical bone lesions, vertebrae |
| **Brain Window** | 80 HU | 40 HU | Gray/white matter differentiation, intracranial hemorrhage |

---

## 🔬 Computer Vision Models

1. **`CXR-Pneumonia-SAM`**:
   - Automated alveolar consolidation bounding box generation.
   - Parapneumonic effusion costophrenic angle meniscus measurement.

2. **`Brain-MRI-Glioma-Seg`**:
   - Multi-class voxel segmentation: Necrotic core vs. Active contrast-enhancing rim vs. FLAIR vasogenic edema.
   - Midline shift subfalcine herniation calculation (in mm).

---

## 🚀 API Endpoints

- `GET /api/v1/vision/studies`: List all active PACS DICOM imaging studies.
- `GET /api/v1/vision/studies/{study_id}`: Retrieve detailed study metadata and bounding boxes.
- `POST /api/v1/vision/analyze/{study_id}`: Execute full structured radiology report generation.
- `GET /api/v1/health`: Vision engine healthcheck.
