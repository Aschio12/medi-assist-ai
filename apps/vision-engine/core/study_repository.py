from typing import List
from models.schemas import DicomStudy, BoundingBox, SegmentationContour, VisionFinding, RadiologyReport

SAMPLE_STUDIES: List[DicomStudy] = [
    DicomStudy(
        study_id="study-cxr-pneumonia-01",
        patient_id="PAT-98421",
        patient_name="Robert Chen",
        age=68,
        gender="M",
        modality="CXR (Digital Radiography)",
        body_part="CHEST PA & LATERAL",
        study_date="2026-08-28 14:22 EST",
        institution="MetroHealth Academic Medical Center",
        thumbnail_url="/images/studies/cxr_thumb.png",
        slice_count=1,
        default_window_width=1500,
        default_window_level=-600,
        findings=[
            VisionFinding(
                id="f-01",
                organ_system="Respiratory",
                observation="Dense focal alveolar consolidation in the right lower lung zone with air bronchograms.",
                pathology="Lobar Bacterial Pneumonia",
                probability=0.978,
                icd10_code="J18.9"
            ),
            VisionFinding(
                id="f-02",
                organ_system="Pleura",
                observation="Blunting of the right costophrenic angle consistent with small reactive parapneumonic effusion.",
                pathology="Pleural Effusion (Parapneumonic)",
                probability=0.912,
                icd10_code="J90"
            )
        ],
        bounding_boxes=[
            BoundingBox(
                id="box-01",
                label="RLL Consolidation (Pneumonia)",
                confidence=0.978,
                x=56.0,
                y=52.0,
                width=28.0,
                height=26.0,
                color="#ef4444",
                severity="CRITICAL",
                clinical_note="Dense alveolar opacification with visible air bronchograms. Infiltrate density: +45 HU."
            ),
            BoundingBox(
                id="box-02",
                label="Small Reactive Parapneumonic Effusion",
                confidence=0.912,
                x=72.0,
                y=76.0,
                width=16.0,
                height=14.0,
                color="#f59e0b",
                severity="MODERATE",
                clinical_note="Costophrenic sulcus blunting. Estimated volume: ~75 mL."
            )
        ],
        segmentations=[
            SegmentationContour(
                id="seg-01",
                structure_name="Right Lung Parenchyma",
                points=[[52, 25], [78, 28], [82, 60], [84, 82], [68, 80], [54, 70], [50, 45]],
                color="#22d3ee",
                opacity=0.25,
                volume_mm3=2150.0
            ),
            SegmentationContour(
                id="seg-02",
                structure_name="Infiltrate Core",
                points=[[58, 54], [76, 56], [80, 72], [66, 75], [58, 66]],
                color="#ef4444",
                opacity=0.45,
                volume_mm3=480.0
            )
        ],
        report=RadiologyReport(
            study_id="study-cxr-pneumonia-01",
            patient_id="PAT-98421",
            patient_name="Robert Chen",
            modality="CXR",
            clinical_indication="68yo male with fever (38.9°C), productive cough, and hypoxia. Evaluate for focal consolidation.",
            comparison="CXR dated 2025-11-14.",
            technique="Single view upright Posterior-Anterior (PA) digital chest radiograph.",
            findings=[
                "LUNGS: Dense alveolar consolidation with prominent air bronchograms is present in the right lower lobe.",
                "PLEURA: Small right-sided pleural effusion blunts the costophrenic angle. No pneumothorax is identified.",
                "HEART & MEDIASTINUM: Cardiothoracic ratio is normal (< 0.50). Normal mediastinal and hilar contours.",
                "BONES & SOFT TISSUES: Intact thoracic cage without acute osseous lesion."
            ],
            impression=[
                "1. Dense Right Lower Lobe Pneumonia with small reactive parapneumonic pleural effusion.",
                "2. Correlate with acute sepsis biomarkers (Procalcitonin, Blood Cultures) and initiate targeted antimicrobial coverage."
            ],
            ai_confidence=0.978,
            critical_alert=True,
            actionable_recommendation="Recommend follow-up radiograph in 48-72 hours following antibiotic initiation to verify resolution."
        )
    ),
    DicomStudy(
        study_id="study-mri-brain-02",
        patient_id="PAT-44910",
        patient_name="David Kim",
        age=54,
        gender="M",
        modality="Brain MRI (T1 Post-Contrast + FLAIR)",
        body_part="HEAD / BRAIN",
        study_date="2026-08-27 09:15 EST",
        institution="MetroHealth Neurological Institute",
        thumbnail_url="/images/studies/mri_thumb.png",
        slice_count=24,
        default_window_width=80,
        default_window_level=40,
        findings=[
            VisionFinding(
                id="f-03",
                organ_system="Central Nervous System",
                observation="Ring-enhancing necrotic lesion in the left frontoparietal lobe with marked perilesional vasogenic edema and 4mm midline shift.",
                pathology="High-Grade Glioma (Glioblastoma vs Solitary Metastasis)",
                probability=0.964,
                icd10_code="C71.9"
            )
        ],
        bounding_boxes=[
            BoundingBox(
                id="box-03",
                label="Left Frontoparietal Ring-Enhancing Mass",
                confidence=0.964,
                x=32.0,
                y=36.0,
                width=34.0,
                height=32.0,
                color="#c084fc",
                severity="CRITICAL",
                clinical_note="Thick irregular peripheral contrast enhancement surrounding central necrosis. 4.2 x 3.8 cm."
            )
        ],
        segmentations=[
            SegmentationContour(
                id="seg-03",
                structure_name="Vasogenic Edema (FLAIR hyperintensity)",
                points=[[24, 28], [58, 30], [64, 62], [42, 68], [22, 54]],
                color="#f59e0b",
                opacity=0.3,
                volume_mm3=8200.0
            ),
            SegmentationContour(
                id="seg-04",
                structure_name="Enhancing Tumor Core",
                points=[[34, 38], [52, 40], [54, 56], [38, 58]],
                color="#c084fc",
                opacity=0.5,
                volume_mm3=3100.0
            )
        ],
        report=RadiologyReport(
            study_id="study-mri-brain-02",
            patient_id="PAT-44910",
            patient_name="David Kim",
            modality="MRI",
            clinical_indication="Progressive headache, expressive dysphasia, and right-sided motor weakness.",
            comparison="None available.",
            technique="Multiplanar, multisequence MRI of the brain before and after administration of 15 mL Gadovist IV.",
            findings=[
                "BRAIN PARENCHYMA: Large 4.2 x 3.8 cm heterogeneously ring-enhancing mass in the left frontoparietal white matter.",
                "MASS EFFECT: Significant perilesional vasogenic edema with local effacement of the left lateral ventricle and 4.2 mm of rightward midline shift.",
                "VESSELS: No acute intracranial hemorrhage or major arterial territory infarction."
            ],
            impression=[
                "1. Large necrotic ring-enhancing mass in the left frontoparietal lobe highly suspicious for High-Grade Glioma (WHO Grade 4 Glioblastoma).",
                "2. Prominent mass effect with 4.2 mm subfalcine herniation."
            ],
            ai_confidence=0.964,
            critical_alert=True,
            actionable_recommendation="Stat Neurosurgical and Neuro-Oncology consultation. Initiate IV Dexamethasone 10mg with Keppra seizure prophylaxis."
        )
    )
]

def get_study_by_id(study_id: str) -> DicomStudy:
    for s in SAMPLE_STUDIES:
        if s.study_id == study_id:
            return s
    return SAMPLE_STUDIES[0]
